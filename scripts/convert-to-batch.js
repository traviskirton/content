#!/usr/bin/env node

// Converts shell generation scripts to batch config JSON files

const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const BATCHES_DIR = path.join(ROOT, 'batches');

// Ensure batches directory exists
if (!fs.existsSync(BATCHES_DIR)) {
  fs.mkdirSync(BATCHES_DIR, { recursive: true });
}

// Parse a shell script and extract entity specs
function parseShellScript(scriptPath) {
  const content = fs.readFileSync(scriptPath, 'utf-8');
  const lines = content.split('\n');

  const entities = [];
  let source = null;

  // Try to extract source from first comment or echo
  const sourceMatch = content.match(/Generating (.+?) entities/);
  if (sourceMatch) {
    source = sourceMatch[1];
  }

  for (const line of lines) {
    // Match: npm run generate -- type "name" ["source"]
    const match = line.match(/npm run generate -- (\w+) "([^"]+)"(?: "([^"]+)")?/);
    if (match) {
      const [, type, name, entitySource] = match;

      // Map types
      let mappedType = type;
      if (type === 'author') mappedType = 'person';
      if (type === 'filming-location') mappedType = 'filming_location';

      entities.push({ type: mappedType, name });

      // Use entity source as the source name if available
      if (entitySource && !source) {
        source = entitySource;
      }
    }
  }

  return { source, entities };
}

// Get all shell scripts
const scripts = fs.readdirSync(ROOT)
  .filter(f => f.startsWith('generate-') && f.endsWith('.sh') && f !== 'generate-all.sh');

console.log(`Found ${scripts.length} generation scripts\n`);

for (const script of scripts) {
  const scriptPath = path.join(ROOT, script);
  const { source, entities } = parseShellScript(scriptPath);

  if (entities.length === 0) {
    console.log(`Skipping ${script} (no entities found)`);
    continue;
  }

  // Generate batch config filename
  const batchName = script.replace('generate-', '').replace('.sh', '') + '.json';
  const batchPath = path.join(BATCHES_DIR, batchName);

  const config = {
    source: source || batchName.replace('.json', ''),
    entities
  };

  fs.writeFileSync(batchPath, JSON.stringify(config, null, 2));
  console.log(`Created ${batchName} (${entities.length} entities)`);
}

console.log('\nDone!');
