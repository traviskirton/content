const fs = require('fs');
const path = require('path');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');

const files = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'));

// Build index of all entities
const entities = {};
const referencedIds = new Set();

for (const file of files) {
  const filePath = path.join(ENTITIES_DIR, file);
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  entities[content.id] = { file, name: content.name, type: content.type, relationships: content.relationships || [] };

  // Track all referenced IDs
  for (const rel of (content.relationships || [])) {
    referencedIds.add(rel.target);
  }
}

// Find entities with no relationships that are also not referenced
const orphaned = [];
const hasNoRelationships = [];

for (const [id, entity] of Object.entries(entities)) {
  if (entity.relationships.length === 0) {
    hasNoRelationships.push(entity);
    if (!referencedIds.has(id)) {
      orphaned.push(entity);
    }
  }
}

console.log('=== ENTITIES WITH NO RELATIONSHIPS ===\n');
console.log(`Total: ${hasNoRelationships.length}\n`);

// Group by type
const byType = {};
for (const entity of hasNoRelationships) {
  if (!byType[entity.type]) byType[entity.type] = [];
  byType[entity.type].push(entity);
}

for (const [type, list] of Object.entries(byType).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`\n${type.toUpperCase()} (${list.length}):`);
  for (const e of list) {
    const referenced = referencedIds.has(entities[e.file.replace('.json', '')]?.id) ? '' : ' [TRULY ORPHANED]';
    console.log(`  - ${e.file}: ${e.name}${referenced}`);
  }
}

console.log(`\n\n=== TRULY ORPHANED (no relationships AND not referenced) ===`);
console.log(`Total: ${orphaned.length}\n`);
for (const e of orphaned) {
  console.log(`  - ${e.file}: ${e.name} (${e.type})`);
}
