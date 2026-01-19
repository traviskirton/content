const fs = require('fs');
const path = require('path');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');

// First, build an index of entity names to IDs
const nameToId = {};
const files = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'));
for (const file of files) {
  const content = JSON.parse(fs.readFileSync(path.join(ENTITIES_DIR, file), 'utf-8'));
  nameToId[content.name.toLowerCase()] = content.id;
  nameToId[file.replace('.json', '')] = content.id;
}

// Helper to get ID by name
function getId(name) {
  const key = name.toLowerCase();
  if (nameToId[key]) return nameToId[key];
  // Try file name format
  const fileName = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (nameToId[fileName]) return nameToId[fileName];
  return null;
}

// Define orphan -> work mappings
// Format: { orphanFile: { relationshipType: targetName } }
const ORPHAN_MAPPINGS = {
  // Godfather entities
  'amerigo-bonasera.json': { 'appears_in': 'the-godfather-film' },
  'apollonia-vitelli.json': { 'appears_in': 'the-godfather-film' },
  'atlantic-city-godfather.json': { 'featured_in': 'the-godfather-part-ii' },
  'johnny-fontane.json': { 'appears_in': 'the-godfather-film' },
  'moe-greene.json': { 'appears_in': 'the-godfather-film' },
  'tattaglia-crime-family.json': { 'appears_in': 'the-godfather-film' },
  'the-godfather-theme-speak-softly-love.json': { 'featured_in': 'the-godfather-trilogy' },
  'the-horse-head.json': { 'appears_in': 'the-godfather-film' },
  'the-offer.json': { 'appears_in': 'the-godfather-film' },
  'teatro-massimo.json': { 'featured_in': 'the-godfather-part-iii' },
  'alfran-productions.json': { 'produced': 'the-godfather-film' },
  'paramount-pictures.json': { 'distributed': 'the-godfather-trilogy' },

  // Lord of the Rings entities
  'cirith-ungol.json': { 'featured_in': 'the-return-of-the-king' },
  'k-li.json': { 'appears_in': 'the-hobbit' },
  'osgiliath.json': { 'featured_in': 'the-two-towers' },
  'palant-r.json': { 'appears_in': 'the-lord-of-the-rings' },
  'rohirrim.json': { 'appears_in': 'the-two-towers' },
  'shelob.json': { 'appears_in': 'the-return-of-the-king' },
  'the-ents.json': { 'appears_in': 'the-two-towers' },
  'the-grey-havens.json': { 'featured_in': 'the-return-of-the-king' },

  // Sherlock Holmes entities
  'beryl-stapleton.json': { 'appears_in': 'the-hound-of-the-baskervilles' },
  'holmes-s-chemistry-set.json': { 'used_by': 'sherlock-holmes' },
  'holmes-s-magnifying-glass.json': { 'used_by': 'sherlock-holmes' },
  'holmes-s-pipe.json': { 'used_by': 'sherlock-holmes' },
  'mrs-hudson.json': { 'associated_with': 'sherlock-holmes' },
  'salt-lake-city-study-in-scarlet.json': { 'featured_in': 'a-study-in-scarlet' },
  'scotland-yard.json': { 'associated_with': 'sherlock-holmes' },
  'sir-hugo-baskerville.json': { 'appears_in': 'the-hound-of-the-baskervilles' },
  'the-danites.json': { 'appears_in': 'a-study-in-scarlet' },
  'the-wedding-ring-study-in-scarlet.json': { 'appears_in': 'a-study-in-scarlet' },

  // Neuromancer/Gibson entities
  'cyberspace-deck.json': { 'appears_in': 'neuromancer' },
  'cyberspace-neuromancer.json': { 'featured_in': 'neuromancer' },
  'ice-intrusion-countermeasures-electronics.json': { 'appears_in': 'neuromancer' },
  'microsofts-neuromancer.json': { 'appears_in': 'neuromancer' },
  'simstim.json': { 'appears_in': 'sprawl-trilogy' },
  'tessier-ashpool-s-a.json': { 'appears_in': 'neuromancer' },
  'the-sprawl-mona-lisa.json': { 'featured_in': 'mona-lisa-overdrive' },

  // Discworld entities
  'death-s-hourglass.json': { 'used_by': 'death-discworld' },
  'death-s-scythe.json': { 'used_by': 'death-discworld' },
  'the-dungeon-dimensions.json': { 'part_of': 'discworld-world' },

  // Le Carré entities
  'bern-le-carr.json': { 'featured_in': 'smiley-s-people' },
  'hamburg-le-carr.json': { 'featured_in': 'smiley-s-people' },
  'karla.json': { 'appears_in': 'tinker-tailor-soldier-spy' },
  'paris-le-carr.json': { 'featured_in': 'tinker-tailor-soldier-spy' },
  'berlin-wall-crossing.json': { 'featured_in': 'smiley-s-people' },
  'hampstead-heath.json': { 'featured_in': 'tinker-tailor-soldier-spy' },
  'thursgood-s-school.json': { 'featured_in': 'tinker-tailor-soldier-spy' },

  // Bond entities
  'geneva-bond.json': { 'featured_in': 'goldfinger-novel' },
  'hagia-sophia-bond.json': { 'featured_in': 'from-russia-with-love' },
  'miami-beach-bond.json': { 'featured_in': 'goldfinger-novel' },
  'm-james-bond.json': { 'appears_in': 'casino-royale-novel' },
  'periscope-briefcase.json': { 'appears_in': 'from-russia-with-love' },
  'pussy-galore-s-flying-circus.json': { 'appears_in': 'goldfinger-novel' },
  'tilly-masterton.json': { 'appears_in': 'goldfinger-novel' },

  // Gentleman Bastard entities
  'mosca.json': { 'appears_in': 'the-lies-of-locke-lamora' },
  'mr-midnight.json': { 'appears_in': 'the-lies-of-locke-lamora' },
  'mr-strap.json': { 'appears_in': 'the-lies-of-locke-lamora' },
  'temple-of-perelandro.json': { 'featured_in': 'the-lies-of-locke-lamora' },
  'the-bondsmage-of-karthain.json': { 'appears_in': 'the-lies-of-locke-lamora' },
  'the-bondsmagi-of-karthain.json': { 'appears_in': 'gentleman-bastard-series' },
  'the-gray-king.json': { 'appears_in': 'the-lies-of-locke-lamora' },

  // Other
  'new-mexico.json': { 'featured_in': 'oppenheimer' },
  'smyrno.json': { 'part_of': 'foundation-series' },
};

const dryRun = !process.argv.includes('--apply');
let updated = 0;
let skipped = [];

for (const [orphanFile, mappings] of Object.entries(ORPHAN_MAPPINGS)) {
  const filePath = path.join(ENTITIES_DIR, orphanFile);
  if (!fs.existsSync(filePath)) {
    skipped.push({ file: orphanFile, reason: 'file not found' });
    continue;
  }

  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (!content.relationships) content.relationships = [];

  let fileModified = false;

  for (const [relType, targetName] of Object.entries(mappings)) {
    const targetId = getId(targetName);
    if (!targetId) {
      skipped.push({ file: orphanFile, reason: `target "${targetName}" not found` });
      continue;
    }

    // Check if relationship already exists
    const exists = content.relationships.some(r => r.type === relType && r.target === targetId);
    if (!exists) {
      content.relationships.push({ type: relType, target: targetId });
      console.log(`${orphanFile}: Adding ${relType} -> ${targetName}`);
      fileModified = true;
    }
  }

  if (fileModified) {
    updated++;
    if (!dryRun) {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
    }
  }
}

console.log(`\n${dryRun ? '[DRY RUN] Would update' : 'Updated'} ${updated} files`);

if (skipped.length > 0) {
  console.log(`\nSkipped ${skipped.length} mappings:`);
  for (const s of skipped) {
    console.log(`  - ${s.file}: ${s.reason}`);
  }
}

if (dryRun && updated > 0) {
  console.log('\nRun with --apply to make changes');
}
