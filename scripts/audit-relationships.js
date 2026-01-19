#!/usr/bin/env node

/**
 * Relationship Audit Tool
 *
 * Analyzes entity relationships to find:
 * 1. Missing targets (relationships pointing to non-existent entities)
 * 2. One-way relationships (missing bidirectional links)
 * 3. Inconsistent relationship types
 * 4. Missing actor ↔ movie relationships
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

// Types that should be standardized
const TYPE_SYNONYMS = {
  'acted_in': 'starred_in',
  'acts_in': 'starred_in',
  'actor_in': 'starred_in',
  'features_actor': 'stars',
  'has_actor': 'stars',
  'cast_member': 'stars',
  'director': 'directed_by',
  'writer': 'written_by',
  'composer': 'composed_by',
  'producer': 'produced_by',
  'appears_in_film': 'appears_in',
  'in_film': 'appears_in',
  'set_in': 'features_location',
  'takes_place_in': 'features_location',
};

function loadEntities() {
  const entities = new Map();
  const files = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'));

  for (const file of files) {
    try {
      const content = fs.readFileSync(path.join(ENTITIES_DIR, file), 'utf8');
      const entity = JSON.parse(content);
      if (entity.id) {
        entities.set(entity.id, { ...entity, _filename: file });
      }
    } catch (err) {
      console.error(`Error loading ${file}: ${err.message}`);
    }
  }

  return entities;
}

function audit(entities) {
  const results = {
    missingTargets: [],        // Relationships pointing to non-existent entities
    missingReverse: [],        // One-way relationships
    nonCanonicalTypes: [],     // Types that should be standardized
    actorMovieGaps: [],        // Actors missing starred_in or movies missing stars
    stats: {
      totalEntities: entities.size,
      totalRelationships: 0,
      byType: {},
      entitiesByType: {},
    }
  };

  // First pass: collect stats and check for missing targets
  for (const [id, entity] of entities) {
    // Count entity types
    results.stats.entitiesByType[entity.type] = (results.stats.entitiesByType[entity.type] || 0) + 1;

    if (!entity.relationships) continue;

    for (const rel of entity.relationships) {
      results.stats.totalRelationships++;
      results.stats.byType[rel.type] = (results.stats.byType[rel.type] || 0) + 1;

      // Check for missing target
      if (!entities.has(rel.target)) {
        results.missingTargets.push({
          sourceId: id,
          sourceName: entity.name,
          sourceFile: entity._filename,
          relType: rel.type,
          targetId: rel.target,
        });
      }

      // Check for non-canonical types
      if (TYPE_SYNONYMS[rel.type]) {
        results.nonCanonicalTypes.push({
          sourceId: id,
          sourceName: entity.name,
          sourceFile: entity._filename,
          currentType: rel.type,
          canonicalType: TYPE_SYNONYMS[rel.type],
          targetId: rel.target,
        });
      }
    }
  }

  // Second pass: check for missing reverse relationships
  for (const [id, entity] of entities) {
    if (!entity.relationships) continue;

    for (const rel of entity.relationships) {
      const reverseType = RELATIONSHIP_PAIRS[rel.type];
      if (!reverseType) continue; // No known reverse for this type

      const targetEntity = entities.get(rel.target);
      if (!targetEntity) continue; // Already captured in missingTargets

      // Check if target has the reverse relationship back
      const hasReverse = targetEntity.relationships?.some(
        r => r.target === id && (r.type === reverseType || r.type === rel.type)
      );

      if (!hasReverse) {
        results.missingReverse.push({
          sourceId: id,
          sourceName: entity.name,
          sourceFile: entity._filename,
          relType: rel.type,
          targetId: rel.target,
          targetName: targetEntity.name,
          targetFile: targetEntity._filename,
          expectedReverseType: reverseType,
        });
      }
    }
  }

  // Third pass: find actors missing starred_in relationships
  for (const [id, entity] of entities) {
    if (entity.type !== 'person') continue;

    // Check if this person has any profession indicating they're an actor
    const professions = entity.facets?.profession || [];
    const isActor = professions.includes('actor') ||
                    entity.properties?.profession?.toLowerCase?.()?.includes('actor') ||
                    entity.tags?.some(t => t.includes('actor'));

    if (!isActor) continue;

    // Check how many starred_in relationships they have
    const starredInRels = entity.relationships?.filter(r =>
      r.type === 'starred_in' || r.type === 'acted_in' || r.type === 'acts_in'
    ) || [];

    // Find movies that have this actor in their 'stars' relationship
    const moviesStarringActor = [];
    for (const [movieId, movie] of entities) {
      if (movie.type !== 'movie') continue;
      const hasActor = movie.relationships?.some(r =>
        r.target === id && (r.type === 'stars' || r.type === 'features_actor')
      );
      if (hasActor) {
        moviesStarringActor.push({ id: movieId, name: movie.name });
      }
    }

    // If movies reference this actor but actor doesn't have starred_in back
    const actorMovieIds = new Set(starredInRels.map(r => r.target));
    const missingFromActor = moviesStarringActor.filter(m => !actorMovieIds.has(m.id));

    if (missingFromActor.length > 0) {
      results.actorMovieGaps.push({
        actorId: id,
        actorName: entity.name,
        actorFile: entity._filename,
        currentStarredIn: starredInRels.length,
        missingMovies: missingFromActor,
      });
    }
  }

  return results;
}

function generateReport(results) {
  let report = '# Relationship Audit Report\n\n';
  report += `Generated: ${new Date().toISOString()}\n\n`;

  // Stats
  report += '## Statistics\n\n';
  report += `- Total entities: ${results.stats.totalEntities}\n`;
  report += `- Total relationships: ${results.stats.totalRelationships}\n\n`;

  report += '### Entities by Type\n\n';
  for (const [type, count] of Object.entries(results.stats.entitiesByType).sort((a, b) => b[1] - a[1])) {
    report += `- ${type}: ${count}\n`;
  }
  report += '\n';

  report += '### Relationships by Type (top 30)\n\n';
  const sortedTypes = Object.entries(results.stats.byType).sort((a, b) => b[1] - a[1]).slice(0, 30);
  for (const [type, count] of sortedTypes) {
    const marker = TYPE_SYNONYMS[type] ? ' ⚠️' : '';
    report += `- \`${type}\`: ${count}${marker}\n`;
  }
  report += '\n';

  // Missing targets
  report += '## Missing Targets\n\n';
  report += `Found ${results.missingTargets.length} relationships pointing to non-existent entities.\n\n`;

  if (results.missingTargets.length > 0) {
    // Group by target ID to find most-referenced missing entities
    const byTarget = new Map();
    for (const item of results.missingTargets) {
      if (!byTarget.has(item.targetId)) {
        byTarget.set(item.targetId, []);
      }
      byTarget.get(item.targetId).push(item);
    }

    const sorted = [...byTarget.entries()].sort((a, b) => b[1].length - a[1].length);

    report += '### Most Referenced Missing Entities\n\n';
    report += '| Missing UUID | Referenced By | Count |\n';
    report += '|--------------|---------------|-------|\n';
    for (const [targetId, refs] of sorted.slice(0, 50)) {
      const names = [...new Set(refs.map(r => r.sourceName))].slice(0, 3).join(', ');
      const more = refs.length > 3 ? ` +${refs.length - 3} more` : '';
      report += `| \`${targetId.slice(0, 8)}...\` | ${names}${more} | ${refs.length} |\n`;
    }
    report += '\n';
  }

  // Non-canonical types
  report += '## Non-Canonical Relationship Types\n\n';
  report += `Found ${results.nonCanonicalTypes.length} relationships using non-standard types.\n\n`;

  if (results.nonCanonicalTypes.length > 0) {
    const byType = new Map();
    for (const item of results.nonCanonicalTypes) {
      if (!byType.has(item.currentType)) {
        byType.set(item.currentType, { canonical: item.canonicalType, count: 0 });
      }
      byType.get(item.currentType).count++;
    }

    report += '| Current Type | Should Be | Count |\n';
    report += '|--------------|-----------|-------|\n';
    for (const [type, data] of [...byType.entries()].sort((a, b) => b[1].count - a[1].count)) {
      report += `| \`${type}\` | \`${data.canonical}\` | ${data.count} |\n`;
    }
    report += '\n';
  }

  // Missing reverse relationships
  report += '## Missing Bidirectional Relationships\n\n';
  report += `Found ${results.missingReverse.length} one-way relationships that should have a reverse.\n\n`;

  if (results.missingReverse.length > 0) {
    // Group by type
    const byType = new Map();
    for (const item of results.missingReverse) {
      const key = `${item.relType} → ${item.expectedReverseType}`;
      if (!byType.has(key)) {
        byType.set(key, []);
      }
      byType.get(key).push(item);
    }

    report += '### By Relationship Type\n\n';
    for (const [typePair, items] of [...byType.entries()].sort((a, b) => b[1].length - a[1].length)) {
      report += `#### ${typePair} (${items.length})\n\n`;
      const sample = items.slice(0, 10);
      for (const item of sample) {
        report += `- ${item.sourceName} → ${item.targetName} (needs \`${item.expectedReverseType}\` back)\n`;
      }
      if (items.length > 10) {
        report += `- ... and ${items.length - 10} more\n`;
      }
      report += '\n';
    }
  }

  // Actor-movie gaps
  report += '## Actor-Movie Relationship Gaps\n\n';
  report += `Found ${results.actorMovieGaps.length} actors missing \`starred_in\` relationships for movies that reference them.\n\n`;

  if (results.actorMovieGaps.length > 0) {
    for (const gap of results.actorMovieGaps.slice(0, 30)) {
      report += `### ${gap.actorName}\n`;
      report += `File: \`${gap.actorFile}\`\n`;
      report += `Current starred_in count: ${gap.currentStarredIn}\n`;
      report += `Missing movies:\n`;
      for (const movie of gap.missingMovies) {
        report += `- ${movie.name}\n`;
      }
      report += '\n';
    }
    if (results.actorMovieGaps.length > 30) {
      report += `... and ${results.actorMovieGaps.length - 30} more actors\n\n`;
    }
  }

  return report;
}

function generateMissingEntitiesJson(results) {
  // Group missing targets with their references
  const missing = new Map();

  for (const item of results.missingTargets) {
    if (!missing.has(item.targetId)) {
      missing.set(item.targetId, {
        id: item.targetId,
        referencedBy: [],
        relationshipTypes: new Set(),
      });
    }
    const entry = missing.get(item.targetId);
    entry.referencedBy.push({
      id: item.sourceId,
      name: item.sourceName,
      file: item.sourceFile,
      relType: item.relType,
    });
    entry.relationshipTypes.add(item.relType);
  }

  // Convert to array and sort by reference count
  const sorted = [...missing.values()]
    .map(m => ({
      ...m,
      relationshipTypes: [...m.relationshipTypes],
      referenceCount: m.referencedBy.length,
    }))
    .sort((a, b) => b.referenceCount - a.referenceCount);

  return sorted;
}

function generateFixesJson(results) {
  return {
    missingReverse: results.missingReverse.map(item => ({
      targetFile: item.targetFile,
      targetId: item.targetId,
      addRelationship: {
        type: item.expectedReverseType,
        target: item.sourceId,
      },
      reason: `${item.sourceName} has ${item.relType} → ${item.targetName}`,
    })),
    typeNormalization: results.nonCanonicalTypes.map(item => ({
      sourceFile: item.sourceFile,
      sourceId: item.sourceId,
      targetId: item.targetId,
      currentType: item.currentType,
      canonicalType: item.canonicalType,
    })),
  };
}

// Main
console.log('Loading entities...');
const entities = loadEntities();
console.log(`Loaded ${entities.size} entities\n`);

console.log('Running audit...');
const results = audit(entities);

console.log('Generating reports...\n');

// Write markdown report
const reportPath = path.join(__dirname, '..', 'RELATIONSHIP_AUDIT.md');
fs.writeFileSync(reportPath, generateReport(results));
console.log(`Written: ${reportPath}`);

// Write missing entities JSON
const missingPath = path.join(__dirname, '..', 'missing-entities.json');
fs.writeFileSync(missingPath, JSON.stringify(generateMissingEntitiesJson(results), null, 2));
console.log(`Written: ${missingPath}`);

// Write fixes JSON
const fixesPath = path.join(__dirname, '..', 'relationship-fixes.json');
fs.writeFileSync(fixesPath, JSON.stringify(generateFixesJson(results), null, 2));
console.log(`Written: ${fixesPath}`);

// Summary
console.log('\n=== SUMMARY ===');
console.log(`Total entities: ${results.stats.totalEntities}`);
console.log(`Total relationships: ${results.stats.totalRelationships}`);
console.log(`Missing targets: ${results.missingTargets.length}`);
console.log(`Non-canonical types: ${results.nonCanonicalTypes.length}`);
console.log(`Missing reverse relationships: ${results.missingReverse.length}`);
console.log(`Actor-movie gaps: ${results.actorMovieGaps.length}`);
