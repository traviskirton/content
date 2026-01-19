#!/usr/bin/env node

/**
 * Bidirectional Relationship Fixer
 *
 * Adds missing reverse relationships to ensure all relationships are bidirectional.
 *
 * Usage:
 *   node scripts/fix-bidirectional.js --dry-run    # Preview changes
 *   node scripts/fix-bidirectional.js --apply      # Apply changes
 */

const fs = require('fs');
const path = require('path');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');

// Canonical relationship mappings (forward → reverse)
const RELATIONSHIP_PAIRS = {
  // Acting
  'stars': 'starred_in',
  'starred_in': 'stars',
  // Directing
  'directed_by': 'directed',
  'directed': 'directed_by',
  // Writing
  'written_by': 'wrote',
  'wrote': 'written_by',
  // Composing
  'composed_by': 'composed',
  'composed': 'composed_by',
  // Producing
  'produced_by': 'produced',
  'produced': 'produced_by',
  // Characters
  'features_character': 'appears_in',
  'appears_in': 'features_character',
  'portrayed_by': 'portrays',
  'portrays': 'portrayed_by',
  // Locations
  'features_location': 'featured_in',
  'featured_in': 'features_location',
  'located_in': 'contains',
  'contains': 'located_in',
  'filmed_in': 'filming_location_for',
  'filming_location_for': 'filmed_in',
  // Companies
  'produced_by_company': 'produced_film',
  'produced_film': 'produced_by_company',
  'distributed_by': 'distributed',
  'distributed': 'distributed_by',
  // Books/Authors
  'authored_by': 'authored',
  'authored': 'authored_by',
  // Adaptations
  'based_on': 'adapted_as',
  'adapted_as': 'based_on',
  // Franchise/Series
  'part_of_series': 'includes',
  'includes': 'part_of_series',
};

// Types to normalize before processing
const TYPE_NORMALIZATIONS = {
  'features_actor': 'stars',
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
        entities.set(entity.id, {
          ...entity,
          _filename: file,
          _filepath: filePath,
          _modified: false,
        });
      }
    } catch (err) {
      console.error(`Error loading ${file}: ${err.message}`);
    }
  }

  return entities;
}

function hasRelationship(entity, type, targetId) {
  if (!entity.relationships) return false;
  return entity.relationships.some(r => r.type === type && r.target === targetId);
}

function addRelationship(entity, type, targetId) {
  if (!entity.relationships) {
    entity.relationships = [];
  }
  entity.relationships.push({ type, target: targetId });
  entity._modified = true;
}

function processEntities(entities, dryRun) {
  const fixes = [];
  const typeNormalizations = [];

  // First pass: normalize types
  for (const [id, entity] of entities) {
    if (!entity.relationships) continue;

    for (const rel of entity.relationships) {
      if (TYPE_NORMALIZATIONS[rel.type]) {
        typeNormalizations.push({
          entityName: entity.name,
          entityFile: entity._filename,
          oldType: rel.type,
          newType: TYPE_NORMALIZATIONS[rel.type],
        });
        if (!dryRun) {
          rel.type = TYPE_NORMALIZATIONS[rel.type];
          entity._modified = true;
        }
      }
    }
  }

  // Second pass: add missing reverse relationships
  for (const [id, entity] of entities) {
    if (!entity.relationships) continue;

    for (const rel of entity.relationships) {
      const reverseType = RELATIONSHIP_PAIRS[rel.type];
      if (!reverseType) continue;

      const targetEntity = entities.get(rel.target);
      if (!targetEntity) continue;

      // Check if target already has reverse relationship
      if (!hasRelationship(targetEntity, reverseType, id)) {
        fixes.push({
          sourceId: id,
          sourceName: entity.name,
          sourceFile: entity._filename,
          relType: rel.type,
          targetId: rel.target,
          targetName: targetEntity.name,
          targetFile: targetEntity._filename,
          addType: reverseType,
        });

        if (!dryRun) {
          addRelationship(targetEntity, reverseType, id);
        }
      }
    }
  }

  return { fixes, typeNormalizations };
}

function saveEntities(entities) {
  let savedCount = 0;

  for (const [id, entity] of entities) {
    if (!entity._modified) continue;

    // Remove internal fields before saving
    const { _filename, _filepath, _modified, ...cleanEntity } = entity;

    // Sort relationships for consistency
    if (cleanEntity.relationships) {
      cleanEntity.relationships.sort((a, b) => {
        if (a.type !== b.type) return a.type.localeCompare(b.type);
        return a.target.localeCompare(b.target);
      });
    }

    const content = JSON.stringify(cleanEntity, null, 2);
    fs.writeFileSync(_filepath, content);
    savedCount++;
  }

  return savedCount;
}

function printSummary(fixes, typeNormalizations, dryRun) {
  console.log('\n' + '='.repeat(60));
  console.log(dryRun ? 'DRY RUN SUMMARY' : 'APPLIED CHANGES SUMMARY');
  console.log('='.repeat(60));

  if (typeNormalizations.length > 0) {
    console.log(`\nType normalizations: ${typeNormalizations.length}`);
    const byType = {};
    for (const n of typeNormalizations) {
      const key = `${n.oldType} → ${n.newType}`;
      byType[key] = (byType[key] || 0) + 1;
    }
    for (const [change, count] of Object.entries(byType)) {
      console.log(`  ${change}: ${count}`);
    }
  }

  console.log(`\nReverse relationships to add: ${fixes.length}`);

  // Group by relationship type
  const byType = {};
  for (const fix of fixes) {
    const key = `${fix.relType} ← ${fix.addType}`;
    if (!byType[key]) byType[key] = [];
    byType[key].push(fix);
  }

  const sortedTypes = Object.entries(byType).sort((a, b) => b[1].length - a[1].length);

  for (const [typePair, items] of sortedTypes) {
    console.log(`\n  ${typePair}: ${items.length}`);
    // Show first 5 examples
    for (const item of items.slice(0, 5)) {
      console.log(`    + ${item.targetName} ← ${item.addType} ← ${item.sourceName}`);
    }
    if (items.length > 5) {
      console.log(`    ... and ${items.length - 5} more`);
    }
  }

  console.log('\n' + '='.repeat(60));
}

// Main
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const apply = args.includes('--apply');

if (!dryRun && !apply) {
  console.log('Usage:');
  console.log('  node scripts/fix-bidirectional.js --dry-run    # Preview changes');
  console.log('  node scripts/fix-bidirectional.js --apply      # Apply changes');
  process.exit(1);
}

console.log('Loading entities...');
const entities = loadEntities();
console.log(`Loaded ${entities.size} entities`);

console.log('\nAnalyzing relationships...');
const { fixes, typeNormalizations } = processEntities(entities, dryRun);

printSummary(fixes, typeNormalizations, dryRun);

if (apply) {
  console.log('\nSaving modified entities...');
  const savedCount = saveEntities(entities);
  console.log(`Saved ${savedCount} modified files`);
} else {
  console.log('\nThis was a dry run. Use --apply to make changes.');
}
