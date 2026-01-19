#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "..", "entities");

const dumasId = "f1af5aff-89e5-443b-9440-fc66997977ab";

const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));

let totalRemoved = 0;
let filesFixed = 0;

for (const file of files) {
  const filePath = path.join(dir, file);
  const content = JSON.parse(fs.readFileSync(filePath));

  if (!content.relationships || content.relationships.length === 0) continue;

  const origCount = content.relationships.length;

  content.relationships = content.relationships.filter(rel => {
    // Remove self-referential
    if (rel.target === content.id) {
      console.log(`  ${file}: removing self-ref ${rel.type}`);
      return false;
    }
    // Remove bad Dumas refs (located_in pointing to a person)
    if (rel.target === dumasId && rel.type === "located_in") {
      console.log(`  ${file}: removing bad located_in -> Dumas`);
      return false;
    }
    return true;
  });

  const removed = origCount - content.relationships.length;
  if (removed > 0) {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
    totalRemoved += removed;
    filesFixed++;
  }
}

console.log(`\nRemoved ${totalRemoved} bad relationships from ${filesFixed} files`);
