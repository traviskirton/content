const fs = require('fs');
const path = require('path');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');

// Relationship type standardizations
const TYPE_MAPPINGS = {
  'author': 'written_by',
  'part_of': 'part_of_series',
  'features-character': 'features_character',
  'features-location': 'features_location',
  'features-item': 'features_item'
};

const dryRun = !process.argv.includes('--apply');
let totalFixed = 0;
let filesModified = [];

const files = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'));

for (const file of files) {
  const filePath = path.join(ENTITIES_DIR, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (!content.relationships || content.relationships.length === 0) continue;

  let modified = false;
  const seenRelationships = new Set();
  const newRelationships = [];

  for (const rel of content.relationships) {
    // Standardize type
    const originalType = rel.type;
    if (TYPE_MAPPINGS[rel.type]) {
      rel.type = TYPE_MAPPINGS[rel.type];
      console.log(`${file}: ${originalType} -> ${rel.type}`);
      modified = true;
      totalFixed++;
    }

    // Remove duplicates
    const key = `${rel.type}:${rel.target}`;
    if (!seenRelationships.has(key)) {
      seenRelationships.add(key);
      newRelationships.push(rel);
    } else {
      console.log(`${file}: Removing duplicate ${rel.type} -> ${rel.target.substring(0, 8)}...`);
      modified = true;
      totalFixed++;
    }
  }

  if (modified) {
    content.relationships = newRelationships;
    filesModified.push(file);
    if (!dryRun) {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
    }
  }
}

console.log(`\n${dryRun ? '[DRY RUN] Would fix' : 'Fixed'} ${totalFixed} issues in ${filesModified.length} files`);
if (dryRun && totalFixed > 0) {
  console.log('\nRun with --apply to make changes');
}
