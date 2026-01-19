#!/usr/bin/env node

/**
 * Fix Semantic Relationship Errors
 *
 * Fixes relationships that don't make sense for the entity type.
 */

const fs = require('fs');
const path = require('path');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');

// Fixes: { entityType: { badRelType: 'newRelType' | null (delete) } }
const FIXES = {
  person: {
    'stars': null,           // Delete - persons don't "star" other people
    'located_in': null,      // Delete - persons aren't "located in" places
    'contains': null,        // Delete
    'includes': null,        // Delete
  },
  location: {
    'appears_in': 'featured_in',  // Locations are "featured in", not "appear in"
    'stars': null,           // Delete - locations don't star people
  },
  character: {
    'stars': null,           // Delete - characters don't star people
    'contains': null,        // Delete - characters don't contain things
    'includes': null,        // Delete - characters don't include things
  },
  company: {
    'located_in': 'headquartered_in',  // Companies are "headquartered in"
  },
  item: {
    'stars': null,           // Delete - items don't star people
  },
  vehicle: {
    'stars': null,           // Delete - vehicles don't star people
  },
  movie: {
    'contains': 'features_location',  // Movies "feature" locations
  }
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
        entities.set(entity.id, { ...entity, _filename: file, _filepath: filePath });
      }
    } catch (err) {
      console.error(`Error loading ${file}: ${err.message}`);
    }
  }

  return entities;
}

function fixEntities(entities) {
  let totalFixed = 0;
  let totalDeleted = 0;
  let totalChanged = 0;
  const modifiedFiles = new Set();

  for (const [id, entity] of entities) {
    if (!entity.relationships) continue;

    const fixes = FIXES[entity.type];
    if (!fixes) continue;

    const originalCount = entity.relationships.length;
    const newRelationships = [];
    let modified = false;

    for (const rel of entity.relationships) {
      if (rel.type in fixes) {
        const newType = fixes[rel.type];
        if (newType === null) {
          // Delete this relationship
          const target = entities.get(rel.target);
          console.log(`DELETE: ${entity.name} (${entity.type}) → ${rel.type} → ${target?.name || rel.target}`);
          totalDeleted++;
          modified = true;
          continue;
        } else {
          // Change the type
          const target = entities.get(rel.target);
          console.log(`CHANGE: ${entity.name} (${entity.type}) → ${rel.type} → ${newType} → ${target?.name || rel.target}`);
          rel.type = newType;
          totalChanged++;
          modified = true;
        }
      }
      newRelationships.push(rel);
    }

    if (modified) {
      entity.relationships = newRelationships;
      modifiedFiles.add(entity._filename);

      // Save the entity
      const { _filename, _filepath, ...cleanEntity } = entity;
      fs.writeFileSync(_filepath, JSON.stringify(cleanEntity, null, 2));
      totalFixed++;
    }
  }

  return { totalFixed, totalDeleted, totalChanged, modifiedFiles: modifiedFiles.size };
}

// Main
console.log('Loading entities...');
const entities = loadEntities();
console.log(`Loaded ${entities.size} entities\n`);

console.log('Fixing semantic errors...\n');
const results = fixEntities(entities);

console.log('\n' + '='.repeat(40));
console.log('SUMMARY');
console.log('='.repeat(40));
console.log(`Files modified: ${results.modifiedFiles}`);
console.log(`Relationships deleted: ${results.totalDeleted}`);
console.log(`Relationships changed: ${results.totalChanged}`);
