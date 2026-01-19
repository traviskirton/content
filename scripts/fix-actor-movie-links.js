#!/usr/bin/env node

/**
 * Fix Actor-Movie Relationship Gaps
 *
 * Adds starred_in/stars relationships for known actor-movie pairings.
 */

const fs = require('fs');
const path = require('path');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');

// Known actor-movie pairings: actorName -> [movieNames]
const ACTOR_MOVIES = {
  // Godfather trilogy
  'Al Pacino': ['The Godfather (Film)', 'The Godfather Part II', 'The Godfather Part III'],
  'Marlon Brando': ['The Godfather (Film)'],
  'James Caan': ['The Godfather (Film)'],
  'Robert Duvall': ['The Godfather (Film)', 'The Godfather Part II'],
  'Diane Keaton': ['The Godfather (Film)', 'The Godfather Part II', 'The Godfather Part III'],
  'Talia Shire': ['The Godfather (Film)', 'The Godfather Part II', 'The Godfather Part III'],
  'John Cazale': ['The Godfather (Film)', 'The Godfather Part II'],
  'Richard Castellano': ['The Godfather (Film)'],
  'Andy Garcia': ['The Godfather Part III'],
  'Joe Mantegna': ['The Godfather Part III'],
  'Eli Wallach': ['The Godfather Part III'],
  'Bridget Fonda': ['The Godfather Part III'],
  'George Hamilton': ['The Godfather Part III'],
  'Raf Vallone': ['The Godfather Part III'],

  // Dark Knight trilogy
  'Morgan Freeman': ['Batman Begins', 'The Dark Knight', 'The Dark Knight Rises'],
  'Katie Holmes': ['Batman Begins'],
  'Tom Wilkinson': ['Batman Begins'],
  'Eric Roberts': ['The Dark Knight'],

  // The Batman (2022)
  'Zoë Kravitz': ['The Batman'],

  // Interstellar
  'Mackenzie Foy': ['Interstellar'],
  'Casey Affleck': ['Interstellar'],

  // Oppenheimer
  'Josh Hartnett': ['Oppenheimer'],
  'David Krumholtz': ['Oppenheimer'],

  // The Prestige
  'Rebecca Hall': ['The Prestige'],
  'Piper Perabo': ['The Prestige'],

  // Batman (1989)
  'Jack Palance': ['Batman'],
};

function loadEntities() {
  const byId = new Map();
  const byName = new Map();
  const files = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'));

  for (const file of files) {
    try {
      const filePath = path.join(ENTITIES_DIR, file);
      const content = fs.readFileSync(filePath, 'utf8');
      const entity = JSON.parse(content);
      if (entity.id) {
        const obj = { ...entity, _filename: file, _filepath: filePath };
        byId.set(entity.id, obj);
        byName.set(entity.name, obj);
      }
    } catch (err) {
      console.error(`Error loading ${file}: ${err.message}`);
    }
  }

  return { byId, byName };
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
}

function saveEntity(entity) {
  const { _filename, _filepath, ...cleanEntity } = entity;
  fs.writeFileSync(_filepath, JSON.stringify(cleanEntity, null, 2));
}

function fixActorMovieLinks(entities) {
  const { byName } = entities;
  let actorUpdates = 0;
  let movieUpdates = 0;
  const modifiedActors = new Set();
  const modifiedMovies = new Set();

  for (const [actorName, movieNames] of Object.entries(ACTOR_MOVIES)) {
    const actor = byName.get(actorName);
    if (!actor) {
      console.log(`ACTOR NOT FOUND: ${actorName}`);
      continue;
    }

    for (const movieName of movieNames) {
      const movie = byName.get(movieName);
      if (!movie) {
        console.log(`MOVIE NOT FOUND: ${movieName}`);
        continue;
      }

      // Add starred_in from actor to movie
      if (!hasRelationship(actor, 'starred_in', movie.id)) {
        addRelationship(actor, 'starred_in', movie.id);
        console.log(`+ ${actorName} → starred_in → ${movieName}`);
        modifiedActors.add(actorName);
        actorUpdates++;
      }

      // Add stars from movie to actor
      if (!hasRelationship(movie, 'stars', actor.id)) {
        addRelationship(movie, 'stars', actor.id);
        console.log(`+ ${movieName} → stars → ${actorName}`);
        modifiedMovies.add(movieName);
        movieUpdates++;
      }
    }
  }

  // Save modified entities
  for (const name of modifiedActors) {
    saveEntity(byName.get(name));
  }
  for (const name of modifiedMovies) {
    saveEntity(byName.get(name));
  }

  return { actorUpdates, movieUpdates, actorFiles: modifiedActors.size, movieFiles: modifiedMovies.size };
}

// Main
console.log('Loading entities...');
const entities = loadEntities();
console.log(`Loaded ${entities.byId.size} entities\n`);

console.log('Adding actor-movie relationships...\n');
const results = fixActorMovieLinks(entities);

console.log('\n' + '='.repeat(40));
console.log('SUMMARY');
console.log('='.repeat(40));
console.log(`Actor files modified: ${results.actorFiles}`);
console.log(`Movie files modified: ${results.movieFiles}`);
console.log(`starred_in relationships added: ${results.actorUpdates}`);
console.log(`stars relationships added: ${results.movieUpdates}`);
