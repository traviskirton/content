#!/usr/bin/env node

/**
 * Fix Alias Coverage
 *
 * Adds sensible aliases to entities that lack them.
 */

const fs = require('fs');
const path = require('path');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');

// Manual alias additions for specific entities
const MANUAL_ALIASES = {
  'The Protagonist': ['Protagonist', 'The Protagonist (Tenet)'],
  'Tenet': ['TENET'],
  'Deputy Commissioner Foley': ['Foley', 'Peter Foley'],
  'Emily Blunt': ['Emily'],
  'John David Washington': ['John Washington'],
  'Maggie Gyllenhaal': ['Maggie'],
  'Rebecca Hall': ['Rebecca'],
  'Alexander Knox': ['Knox'],
  'Bella Reál': ['Bella', 'Bella Real'],
  'Ernest Lawrence': ['Lawrence', 'E.O. Lawrence'],
  'Fernand Mondego': ['Fernand', 'Count de Morcerf'],
  'Gil Colson': ['Colson', 'District Attorney Colson'],
  'Olivia Wenscombe': ['Olivia'],
  'Peter Browning': ['Browning', 'Uncle Peter'],
  'Sal Maroni': ['Maroni', 'Salvatore Maroni'],
  'SMERSH Agent (Casino Royale)': ['SMERSH Agent'],
  'Haydée': ['Haydee'],
  'Barbara': ['Barbara Gordon'],
  'Priya': ['Priya Singh'],
  'Ives': ['Commander Ives'],
};

function loadEntities() {
  const entities = new Map();
  const files = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'));

  for (const file of files) {
    try {
      const filePath = path.join(ENTITIES_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const entity = JSON.parse(content);
      if (entity.id) {
        entities.set(entity.name, { ...entity, _filename: file, _filepath: filePath });
      }
    } catch (err) {
      console.error(`Error loading ${file}: ${err.message}`);
    }
  }

  return entities;
}

function fixAliases(entities) {
  let modified = 0;

  for (const [name, newAliases] of Object.entries(MANUAL_ALIASES)) {
    const entity = entities.get(name);
    if (!entity) {
      console.log(`NOT FOUND: ${name}`);
      continue;
    }

    // Merge existing aliases with new ones
    const existingAliases = entity.aliases || [];
    const allAliases = [...new Set([...existingAliases, ...newAliases])];

    if (allAliases.length > existingAliases.length) {
      entity.aliases = allAliases;
      console.log(`UPDATED: ${name} → added aliases: ${newAliases.join(', ')}`);

      // Save the entity
      const { _filename, _filepath, ...cleanEntity } = entity;
      fs.writeFileSync(_filepath, JSON.stringify(cleanEntity, null, 2));
      modified++;
    } else {
      console.log(`SKIPPED: ${name} (aliases already present)`);
    }
  }

  return modified;
}

// Main
console.log('Loading entities...');
const entities = loadEntities();
console.log(`Loaded ${entities.size} entities\n`);

console.log('Adding aliases...\n');
const modified = fixAliases(entities);

console.log('\n' + '='.repeat(40));
console.log(`Files modified: ${modified}`);
