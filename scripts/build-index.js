#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');
const BUILD_DIR = path.join(__dirname, '..', 'build');
const OUTPUT_FILE = path.join(BUILD_DIR, 'index.json');

function loadEntities() {
  const entities = [];
  const files = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const filePath = path.join(ENTITIES_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    try {
      const entity = JSON.parse(content);
      entity._sourceFile = file;
      entities.push(entity);
    } catch (err) {
      console.error(`Error parsing ${file}:`, err.message);
      process.exit(1);
    }
  }

  return entities;
}

function validateEntities(entities) {
  const ids = new Set();
  const errors = [];

  for (const entity of entities) {
    // Check required fields
    if (!entity.id) {
      errors.push(`${entity._sourceFile}: missing required field 'id'`);
    }
    if (!entity.type) {
      errors.push(`${entity._sourceFile}: missing required field 'type'`);
    }
    if (!entity.name) {
      errors.push(`${entity._sourceFile}: missing required field 'name'`);
    }

    // Check for duplicate IDs
    if (entity.id) {
      if (ids.has(entity.id)) {
        errors.push(`${entity._sourceFile}: duplicate id '${entity.id}'`);
      }
      ids.add(entity.id);
    }
  }

  // Validate relationship targets exist
  for (const entity of entities) {
    if (entity.relationships) {
      for (const rel of entity.relationships) {
        if (!ids.has(rel.target)) {
          errors.push(`${entity._sourceFile}: relationship target '${rel.target}' not found`);
        }
      }
    }
  }

  return errors;
}

function buildSearchIndex(entities) {
  // Create lookup maps
  const byId = {};
  const byType = {};
  const byTag = {};

  for (const entity of entities) {
    // Index by ID
    byId[entity.id] = {
      id: entity.id,
      type: entity.type,
      name: entity.name,
      description: entity.description || null,
      content: entity.content || [],
      aliases: entity.aliases || [],
      tags: entity.tags || [],
      relationships: entity.relationships || [],
      properties: entity.properties || {}
    };

    // Index by type
    if (!byType[entity.type]) {
      byType[entity.type] = [];
    }
    byType[entity.type].push(entity.id);

    // Index by tag
    if (entity.tags) {
      for (const tag of entity.tags) {
        if (!byTag[tag]) {
          byTag[tag] = [];
        }
        byTag[tag].push(entity.id);
      }
    }
  }

  return {
    generatedAt: new Date().toISOString(),
    stats: {
      totalEntities: entities.length,
      types: Object.keys(byType).reduce((acc, type) => {
        acc[type] = byType[type].length;
        return acc;
      }, {})
    },
    entities: byId,
    byType,
    byTag
  };
}

function main() {
  console.log('Loading entities...');
  const entities = loadEntities();
  console.log(`Found ${entities.length} entities`);

  console.log('Validating...');
  const errors = validateEntities(entities);

  if (errors.length > 0) {
    console.error('Validation errors:');
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  }
  console.log('Validation passed');

  console.log('Building index...');
  const index = buildSearchIndex(entities);

  // Ensure build directory exists
  if (!fs.existsSync(BUILD_DIR)) {
    fs.mkdirSync(BUILD_DIR, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
  console.log(`Index written to ${OUTPUT_FILE}`);
  console.log(`Stats: ${index.stats.totalEntities} entities across ${Object.keys(index.stats.types).length} types`);
}

main();
