#!/usr/bin/env node

/**
 * Find entities referenced in relationships that don't exist
 * Outputs in a format suitable for generate-batch.js
 *
 * Run: node scripts/find-missing.js [--json]
 */

const fs = require('fs');
const path = require('path');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');
const jsonOutput = process.argv.includes('--json');

// Load all entities
const files = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'));
const entities = {};
const missingTargets = new Map(); // target UUID -> { referencedBy, types }

for (const file of files) {
  const filePath = path.join(ENTITIES_DIR, file);
  const entity = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  entities[entity.id] = entity;
}

// Find missing targets
for (const [id, entity] of Object.entries(entities)) {
  for (const rel of (entity.relationships || [])) {
    if (!entities[rel.target]) {
      if (!missingTargets.has(rel.target)) {
        missingTargets.set(rel.target, {
          referencedBy: [],
          relationshipTypes: new Set()
        });
      }
      const info = missingTargets.get(rel.target);
      info.referencedBy.push({ name: entity.name, type: entity.type, file: path.basename(entity._sourceFile || '') });
      info.relationshipTypes.add(rel.type);
    }
  }
}

if (missingTargets.size === 0) {
  if (!jsonOutput) {
    console.log('No missing entities found.');
  } else {
    console.log(JSON.stringify({ missing: [] }, null, 2));
  }
  process.exit(0);
}

if (jsonOutput) {
  // Output as JSON for further processing
  const missing = [];
  for (const [uuid, info] of missingTargets) {
    missing.push({
      uuid,
      referencedBy: info.referencedBy,
      relationshipTypes: Array.from(info.relationshipTypes)
    });
  }
  console.log(JSON.stringify({ missing }, null, 2));
} else {
  // Human-readable output
  console.log(`Found ${missingTargets.size} missing entities:\n`);

  for (const [uuid, info] of missingTargets) {
    console.log(`UUID: ${uuid}`);
    console.log(`  Relationship types: ${Array.from(info.relationshipTypes).join(', ')}`);
    console.log(`  Referenced by:`);
    for (const ref of info.referencedBy.slice(0, 5)) {
      console.log(`    - ${ref.name} (${ref.type})`);
    }
    if (info.referencedBy.length > 5) {
      console.log(`    ... and ${info.referencedBy.length - 5} more`);
    }
    console.log('');
  }

  // Suggest likely entity types based on relationship types
  console.log('---');
  console.log('To fix, either:');
  console.log('1. Create the missing entities');
  console.log('2. Remove the dangling relationships');
  console.log('3. Run: node scripts/find-missing.js --json > missing.json');
}
