#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');

// Relationship pairs for bidirectional linking
const INVERSE_RELATIONSHIPS = {
  'directed_by': 'directed',
  'produced_by': 'produced',
  'written_by': 'wrote',
  'composed_by': 'composed_for',
  'stars': 'acted_in',
  'features_character': 'appears_in',
  'features_location': 'featured_in',
  'filmed_in': 'filming_location_for',
  'filming_location_for': 'filmed_in',
  'part_of': 'includes',
  'includes': 'part_of',
  'portrayed_by': 'portrays',
  'located_in': 'contains'
};

// Relationships that should add tags (source relationship -> tag prefix)
const TAG_RELATIONSHIPS = {
  'directed_by': true,    // movie directed_by person -> add slugified person name as tag
  'part_of': true         // entity part_of franchise -> add slugified franchise name as tag
};

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function loadEntities() {
  const entities = {};
  const files = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(ENTITIES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    try {
      const entity = JSON.parse(content);
      entity._sourceFile = file;
      entities[entity.id] = entity;
    } catch (err) {
      console.error(`Error parsing ${file}:`, err.message);
      process.exit(1);
    }
  }

  return entities;
}

function saveEntity(entity) {
  const filePath = path.join(ENTITIES_DIR, entity._sourceFile);
  const toSave = { ...entity };
  delete toSave._sourceFile;
  fs.writeFileSync(filePath, JSON.stringify(toSave, null, 2));
}

function reconcile(entities, options = {}) {
  const { dryRun = false } = options;
  const stats = {
    invalidRelationshipsRemoved: 0,
    bidirectionalRelationshipsAdded: 0,
    tagsAdded: 0,
    entitiesModified: new Set()
  };

  const entityIds = new Set(Object.keys(entities));

  // Pass 1: Remove invalid relationships
  for (const entity of Object.values(entities)) {
    if (!entity.relationships) continue;

    const validRelationships = entity.relationships.filter(rel => {
      if (!entityIds.has(rel.target)) {
        console.log(`  Removing invalid relationship from ${entity.name}: ${rel.type} -> ${rel.target}`);
        stats.invalidRelationshipsRemoved++;
        stats.entitiesModified.add(entity.id);
        return false;
      }
      return true;
    });

    if (validRelationships.length !== entity.relationships.length) {
      entity.relationships = validRelationships;
    }
  }

  // Pass 2: Add bidirectional relationships
  for (const entity of Object.values(entities)) {
    if (!entity.relationships) continue;

    for (const rel of entity.relationships) {
      const inverseType = INVERSE_RELATIONSHIPS[rel.type];
      if (!inverseType) continue;

      const targetEntity = entities[rel.target];
      if (!targetEntity) continue;

      // Check if inverse relationship already exists
      if (!targetEntity.relationships) {
        targetEntity.relationships = [];
      }

      const hasInverse = targetEntity.relationships.some(
        r => r.type === inverseType && r.target === entity.id
      );

      if (!hasInverse) {
        console.log(`  Adding ${inverseType} from ${targetEntity.name} -> ${entity.name}`);
        targetEntity.relationships.push({
          type: inverseType,
          target: entity.id
        });
        stats.bidirectionalRelationshipsAdded++;
        stats.entitiesModified.add(targetEntity.id);
      }
    }
  }

  // Pass 3: Add tags based on relationships
  for (const entity of Object.values(entities)) {
    if (!entity.relationships) continue;
    if (!entity.tags) entity.tags = [];

    for (const rel of entity.relationships) {
      if (!TAG_RELATIONSHIPS[rel.type]) continue;

      const targetEntity = entities[rel.target];
      if (!targetEntity) continue;

      const tag = slugify(targetEntity.name);
      if (!entity.tags.includes(tag)) {
        console.log(`  Adding tag "${tag}" to ${entity.name}`);
        entity.tags.push(tag);
        stats.tagsAdded++;
        stats.entitiesModified.add(entity.id);
      }
    }
  }

  // Save modified entities
  if (!dryRun) {
    for (const entityId of stats.entitiesModified) {
      saveEntity(entities[entityId]);
    }
  }

  return stats;
}

function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');

  if (dryRun) {
    console.log('DRY RUN - no changes will be saved\n');
  }

  console.log('Loading entities...');
  const entities = loadEntities();
  console.log(`Found ${Object.keys(entities).length} entities\n`);

  console.log('Reconciling...');
  const stats = reconcile(entities, { dryRun });

  console.log('\nSummary:');
  console.log(`  Invalid relationships removed: ${stats.invalidRelationshipsRemoved}`);
  console.log(`  Bidirectional relationships added: ${stats.bidirectionalRelationshipsAdded}`);
  console.log(`  Tags added: ${stats.tagsAdded}`);
  console.log(`  Entities modified: ${stats.entitiesModified.size}`);

  if (dryRun) {
    console.log('\nRun without --dry-run to apply changes.');
  } else {
    console.log('\nChanges saved.');
  }
}

main();
