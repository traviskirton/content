#!/usr/bin/env node

/**
 * Comprehensive Content Audit
 *
 * Checks for:
 * 1. Semantic relationship errors (wrong relationship types for entity types)
 * 2. Alias coverage (entities with few/no aliases)
 * 3. Actor-movie relationship gaps
 */

const fs = require('fs');
const path = require('path');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');

// Valid relationship types by source entity type
const VALID_RELATIONSHIPS = {
  person: [
    'starred_in', 'directed', 'wrote', 'composed', 'produced', 'portrayed_by',
    'portrays', 'worked_with', 'worked_for', 'founded', 'member_of',
    'collaborated_with', 'married_to', 'related_to', 'friend_of', 'colleague_of',
    'mentored_by', 'mentored', 'influenced_by', 'influenced', 'authored',
    'created', 'born_in', 'died_in', 'lived_in', 'educated_at'
  ],
  movie: [
    'directed_by', 'written_by', 'composed_by', 'produced_by', 'stars',
    'features_character', 'features_location', 'filmed_in', 'based_on',
    'sequel_to', 'prequel_to', 'spin_off_of', 'remake_of', 'part_of_series',
    'distributed_by', 'produced_by_company', 'set_in', 'related_to'
  ],
  book: [
    'authored_by', 'written_by', 'features_character', 'features_location',
    'set_in', 'part_of_series', 'sequel_to', 'prequel_to', 'adapted_as',
    'based_on', 'published_by', 'related_to'
  ],
  character: [
    'appears_in', 'portrayed_by', 'created_by', 'ally_of', 'enemy_of',
    'friend_of', 'related_to', 'member_of', 'leader_of', 'works_for',
    'rivals_with', 'loves', 'married_to', 'parent_of', 'child_of',
    'sibling_of', 'mentor_of', 'mentored_by', 'killed_by', 'killed'
  ],
  location: [
    'located_in', 'contains', 'featured_in', 'filming_location_for',
    'bordered_by', 'part_of', 'capital_of', 'headquarters_of', 'related_to',
    'owned_by', 'managed_by'
  ],
  franchise: [
    'includes', 'created_by', 'owned_by', 'produced_by', 'distributed_by',
    'features_character', 'features_location', 'stars', 'directed_by',
    'written_by', 'spin_off_of', 'related_to', 'filmed_in'
  ],
  company: [
    'produced', 'distributed', 'produced_film', 'owns', 'owned_by',
    'founded_by', 'headquartered_in', 'subsidiary_of', 'parent_of',
    'partner_of', 'related_to', 'distributed_by'
  ],
  organization: [
    'member_of', 'led_by', 'founded_by', 'located_in', 'headquartered_in',
    'ally_of', 'enemy_of', 'part_of', 'related_to', 'appears_in', 'featured_in'
  ],
  item: [
    'used_by', 'owned_by', 'created_by', 'featured_in', 'appears_in',
    'located_at', 'part_of', 'related_to'
  ],
  vehicle: [
    'used_by', 'owned_by', 'created_by', 'featured_in', 'appears_in',
    'manufactured_by', 'part_of', 'related_to'
  ]
};

// Relationships that should NEVER appear on certain entity types
const INVALID_RELATIONSHIPS = {
  person: ['stars', 'features_character', 'features_location', 'contains', 'located_in', 'includes', 'directed_by', 'written_by', 'composed_by'],
  movie: ['starred_in', 'directed', 'wrote', 'composed', 'portrays', 'appears_in', 'located_in', 'contains'],
  book: ['starred_in', 'directed', 'wrote', 'stars', 'located_in', 'contains'],
  character: ['stars', 'directed', 'wrote', 'directed_by', 'written_by', 'contains', 'includes'],
  location: ['stars', 'starred_in', 'directed', 'wrote', 'directed_by', 'written_by', 'portrays', 'appears_in'],
  franchise: ['starred_in', 'appeared_in', 'located_in', 'portrays'],
  company: ['starred_in', 'directed', 'wrote', 'portrays', 'appears_in', 'located_in'],
  organization: ['starred_in', 'directed', 'wrote', 'stars', 'directed_by'],
  item: ['starred_in', 'directed', 'stars', 'directed_by', 'contains'],
  vehicle: ['starred_in', 'directed', 'stars', 'directed_by', 'contains']
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

function auditSemanticErrors(entities) {
  const errors = [];

  for (const [id, entity] of entities) {
    if (!entity.relationships) continue;

    const invalidRels = INVALID_RELATIONSHIPS[entity.type] || [];

    for (const rel of entity.relationships) {
      if (invalidRels.includes(rel.type)) {
        const target = entities.get(rel.target);
        errors.push({
          file: entity._filename,
          entityName: entity.name,
          entityType: entity.type,
          relType: rel.type,
          targetName: target?.name || rel.target,
          targetType: target?.type || 'unknown',
          reason: `${entity.type} entities should not have '${rel.type}' relationships`
        });
      }
    }
  }

  return errors;
}

function auditAliases(entities) {
  const issues = [];

  for (const [id, entity] of entities) {
    const aliases = entity.aliases || [];
    const name = entity.name;

    // Check for entities with no aliases
    if (aliases.length === 0) {
      // Some entities naturally don't need aliases
      const needsAliases = ['person', 'movie', 'book', 'character', 'franchise'].includes(entity.type);
      if (needsAliases) {
        issues.push({
          file: entity._filename,
          name: entity.name,
          type: entity.type,
          aliasCount: 0,
          suggestion: suggestAliases(entity)
        });
      }
    }
  }

  return issues;
}

function suggestAliases(entity) {
  const suggestions = [];
  const name = entity.name;

  if (entity.type === 'person') {
    // First name only
    const parts = name.split(' ');
    if (parts.length > 1) {
      suggestions.push(parts[parts.length - 1]); // Last name
      // Check for "Jr." or similar suffixes
      if (!['Jr.', 'Sr.', 'II', 'III', 'IV'].includes(parts[parts.length - 1])) {
        suggestions.push(parts[0] + ' ' + parts[parts.length - 1]); // First + Last
      }
    }
  } else if (entity.type === 'movie' || entity.type === 'book') {
    // Remove "The " prefix
    if (name.startsWith('The ')) {
      suggestions.push(name.substring(4));
    }
    // Acronym for multi-word titles
    const words = name.split(' ').filter(w => !['The', 'A', 'An', 'of', 'and', 'the', 'in', 'on', 'at'].includes(w));
    if (words.length >= 3) {
      const acronym = words.map(w => w[0]).join('').toUpperCase();
      if (acronym.length >= 3) {
        suggestions.push(acronym);
      }
    }
  } else if (entity.type === 'character') {
    // First name only for characters
    const parts = name.split(' ');
    if (parts.length > 1) {
      suggestions.push(parts[0]); // First name
    }
    // Remove titles
    const titles = ['Dr.', 'Mr.', 'Mrs.', 'Ms.', 'Professor', 'Captain', 'Lieutenant', 'General', 'Sir', 'Lord', 'Lady'];
    for (const title of titles) {
      if (name.startsWith(title + ' ')) {
        suggestions.push(name.substring(title.length + 1));
      }
    }
  }

  return suggestions.filter(s => s && s !== name);
}

function auditActorMovieCoverage(entities) {
  const gaps = {
    actorsMissingMovies: [],
    moviesMissingActors: []
  };

  // Find all actors
  const actors = [];
  const movies = [];

  for (const [id, entity] of entities) {
    if (entity.type === 'person') {
      const professions = entity.facets?.profession || [];
      const isActor = professions.includes('actor') ||
                      entity.properties?.occupation?.some?.(o => o.toLowerCase().includes('actor'));
      if (isActor) {
        actors.push(entity);
      }
    } else if (entity.type === 'movie') {
      movies.push(entity);
    }
  }

  // Check actors for starred_in relationships
  for (const actor of actors) {
    const starredIn = (actor.relationships || []).filter(r => r.type === 'starred_in');
    const validMovies = starredIn.filter(r => {
      const target = entities.get(r.target);
      return target && target.type === 'movie';
    });

    if (validMovies.length === 0) {
      gaps.actorsMissingMovies.push({
        file: actor._filename,
        name: actor.name,
        id: actor.id,
        totalRelationships: (actor.relationships || []).length
      });
    }
  }

  // Check movies for stars relationships
  for (const movie of movies) {
    const stars = (movie.relationships || []).filter(r => r.type === 'stars');
    const validActors = stars.filter(r => {
      const target = entities.get(r.target);
      return target && target.type === 'person';
    });

    if (validActors.length === 0) {
      gaps.moviesMissingActors.push({
        file: movie._filename,
        name: movie.name,
        id: movie.id,
        totalRelationships: (movie.relationships || []).length
      });
    }
  }

  return gaps;
}

// Main
console.log('Loading entities...');
const entities = loadEntities();
console.log(`Loaded ${entities.size} entities\n`);

console.log('='.repeat(60));
console.log('SEMANTIC RELATIONSHIP ERRORS');
console.log('='.repeat(60));
const semanticErrors = auditSemanticErrors(entities);
console.log(`Found ${semanticErrors.length} semantic errors\n`);

if (semanticErrors.length > 0) {
  // Group by error type
  const byReason = {};
  for (const err of semanticErrors) {
    const key = `${err.entityType} → ${err.relType}`;
    if (!byReason[key]) byReason[key] = [];
    byReason[key].push(err);
  }

  for (const [key, errors] of Object.entries(byReason).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n${key} (${errors.length}):`);
    for (const err of errors.slice(0, 10)) {
      console.log(`  - ${err.entityName} → ${err.relType} → ${err.targetName}`);
    }
    if (errors.length > 10) {
      console.log(`  ... and ${errors.length - 10} more`);
    }
  }
}

console.log('\n' + '='.repeat(60));
console.log('ALIAS COVERAGE');
console.log('='.repeat(60));
const aliasIssues = auditAliases(entities);
console.log(`Found ${aliasIssues.length} entities with no aliases\n`);

// Group by type
const byType = {};
for (const issue of aliasIssues) {
  if (!byType[issue.type]) byType[issue.type] = [];
  byType[issue.type].push(issue);
}

for (const [type, issues] of Object.entries(byType).sort((a, b) => b[1].length - a[1].length)) {
  console.log(`${type}: ${issues.length} without aliases`);
}

console.log('\n' + '='.repeat(60));
console.log('ACTOR-MOVIE COVERAGE');
console.log('='.repeat(60));
const actorMovieGaps = auditActorMovieCoverage(entities);
console.log(`Actors without any movie links: ${actorMovieGaps.actorsMissingMovies.length}`);
console.log(`Movies without any actor links: ${actorMovieGaps.moviesMissingActors.length}`);

if (actorMovieGaps.actorsMissingMovies.length > 0) {
  console.log('\nActors missing movies:');
  for (const actor of actorMovieGaps.actorsMissingMovies.slice(0, 20)) {
    console.log(`  - ${actor.name}`);
  }
  if (actorMovieGaps.actorsMissingMovies.length > 20) {
    console.log(`  ... and ${actorMovieGaps.actorsMissingMovies.length - 20} more`);
  }
}

if (actorMovieGaps.moviesMissingActors.length > 0) {
  console.log('\nMovies missing actors:');
  for (const movie of actorMovieGaps.moviesMissingActors) {
    console.log(`  - ${movie.name}`);
  }
}

// Write detailed reports
const report = {
  semanticErrors,
  aliasIssues,
  actorMovieGaps,
  timestamp: new Date().toISOString()
};

fs.writeFileSync(
  path.join(__dirname, '..', 'content-audit-report.json'),
  JSON.stringify(report, null, 2)
);
console.log('\n\nDetailed report written to content-audit-report.json');
