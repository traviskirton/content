#!/usr/bin/env node

/**
 * Comprehensive validation script for entity knowledge base
 * Run: node scripts/validate.js [--fix]
 */

const fs = require('fs');
const path = require('path');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');
const FIX_MODE = process.argv.includes('--fix');

// Relationship types that indicate likely errors (too generic or wrong format)
const SUSPICIOUS_TYPES = new Set([
  'related', 'link', 'connection', 'ref', 'see', 'other'
]);

// Invalid relationship types per entity type
const INVALID_RELATIONSHIPS = {
  person: ['stars', 'contains', 'includes', 'features_character', 'features_location'],
  character: ['stars', 'starred_in', 'contains', 'includes', 'directed', 'wrote'],
  location: ['stars', 'starred_in', 'appears_in', 'directed', 'wrote'],
  item: ['stars', 'starred_in', 'directed', 'wrote', 'contains'],
  organization: ['stars', 'starred_in', 'directed'],
  company: ['stars', 'starred_in', 'appears_in']
};

// Results tracking
const issues = {
  missingTargets: [],
  selfReferential: [],
  nonCanonical: [],
  semanticErrors: [],
  orphanedEntities: [],
  missingDescription: [],
  emptyContent: [],
  duplicateRelationships: [],
  hyphenatedTypes: []
};

// Load all entities
console.log('Loading entities...\n');
const files = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'));
const entities = {};
const referencedIds = new Set();

for (const file of files) {
  const filePath = path.join(ENTITIES_DIR, file);
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    entities[content.id] = { file, ...content };

    // Track referenced IDs
    for (const rel of (content.relationships || [])) {
      referencedIds.add(rel.target);
    }
  } catch (e) {
    console.error(`Error parsing ${file}: ${e.message}`);
  }
}

console.log(`Loaded ${Object.keys(entities).length} entities\n`);
console.log('Running validation checks...\n');

// Check each entity
for (const [id, entity] of Object.entries(entities)) {
  const { file, type, relationships = [], description, content } = entity;

  // 1. Missing description
  if (!description || description.trim() === '') {
    issues.missingDescription.push({ file, name: entity.name });
  }

  // 2. Empty content array
  if (!content || content.length === 0) {
    issues.emptyContent.push({ file, name: entity.name });
  }

  // 3. Check relationships
  const seenRelationships = new Set();

  for (const rel of relationships) {
    const relKey = `${rel.type}:${rel.target}`;

    // 3a. Missing target
    if (!entities[rel.target]) {
      issues.missingTargets.push({ file, type: rel.type, target: rel.target });
    }

    // 3b. Self-referential
    if (rel.target === id) {
      issues.selfReferential.push({ file, type: rel.type });
    }

    // 3c. Suspicious/generic relationship type
    if (SUSPICIOUS_TYPES.has(rel.type)) {
      issues.nonCanonical.push({ file, type: rel.type });
    }

    // 3d. Hyphenated type (should use underscores)
    if (rel.type.includes('-') && !rel.type.includes('_')) {
      issues.hyphenatedTypes.push({ file, type: rel.type });
    }

    // 3e. Duplicate relationship
    if (seenRelationships.has(relKey)) {
      issues.duplicateRelationships.push({ file, type: rel.type, target: rel.target.substring(0, 8) });
    }
    seenRelationships.add(relKey);

    // 3f. Semantic error (wrong relationship type for entity type)
    const invalidTypes = INVALID_RELATIONSHIPS[type] || [];
    if (invalidTypes.includes(rel.type)) {
      issues.semanticErrors.push({ file, entityType: type, relType: rel.type });
    }
  }

  // 4. Orphaned entity (no relationships AND not referenced)
  if (relationships.length === 0 && !referencedIds.has(id)) {
    issues.orphanedEntities.push({ file, name: entity.name, type });
  }
}

// Print results
console.log('=' .repeat(60));
console.log('VALIDATION RESULTS');
console.log('='.repeat(60));

let totalIssues = 0;

function printIssues(name, items, formatter) {
  if (items.length === 0) {
    console.log(`\n✅ ${name}: 0 issues`);
  } else {
    console.log(`\n❌ ${name}: ${items.length} issues`);
    totalIssues += items.length;
    for (const item of items.slice(0, 10)) {
      console.log(`   - ${formatter(item)}`);
    }
    if (items.length > 10) {
      console.log(`   ... and ${items.length - 10} more`);
    }
  }
}

printIssues('Missing relationship targets', issues.missingTargets,
  i => `${i.file}: ${i.type} -> ${i.target.substring(0, 8)}...`);

printIssues('Self-referential relationships', issues.selfReferential,
  i => `${i.file}: ${i.type}`);

printIssues('Suspicious/generic relationship types', issues.nonCanonical,
  i => `${i.file}: "${i.type}"`);

printIssues('Hyphenated relationship types', issues.hyphenatedTypes,
  i => `${i.file}: "${i.type}" (should use underscores)`);

printIssues('Semantic errors', issues.semanticErrors,
  i => `${i.file}: ${i.entityType} cannot have "${i.relType}"`);

printIssues('Duplicate relationships', issues.duplicateRelationships,
  i => `${i.file}: duplicate ${i.type} -> ${i.target}...`);

printIssues('Orphaned entities', issues.orphanedEntities,
  i => `${i.file}: ${i.name} (${i.type})`);

printIssues('Missing description', issues.missingDescription,
  i => `${i.file}: ${i.name}`);

printIssues('Empty content array', issues.emptyContent,
  i => `${i.file}: ${i.name}`);

console.log('\n' + '='.repeat(60));
if (totalIssues === 0) {
  console.log('✅ ALL CHECKS PASSED');
} else {
  console.log(`❌ TOTAL ISSUES: ${totalIssues}`);
}
console.log('='.repeat(60));

// Exit with error code if issues found
process.exit(totalIssues > 0 ? 1 : 0);
