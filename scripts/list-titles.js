#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');
const files = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'));

const titles = [];

for (const file of files) {
  const entity = JSON.parse(fs.readFileSync(path.join(ENTITIES_DIR, file), 'utf-8'));
  if (entity.type === 'movie' || entity.type === 'book' || entity.type === 'franchise') {
    titles.push({
      type: entity.type,
      name: entity.name
    });
  }
}

titles.sort((a, b) => {
  if (a.type !== b.type) return a.type.localeCompare(b.type);
  return a.name.localeCompare(b.name);
});

console.log(JSON.stringify({ titles }, null, 2));
