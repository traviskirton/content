#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "entities");

// Load all entities
const byName = new Map();
const byId = new Map();
const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));

for (const f of files) {
  const filepath = path.join(dir, f);
  const e = JSON.parse(fs.readFileSync(filepath));
  if (e.id) {
    const obj = {...e, _file: f, _filepath: filepath};
    byName.set(e.name, obj);
    byId.set(e.id, obj);
  }
}

// Book-author mappings
const BOOK_AUTHORS = {
  // Sherlock Holmes
  "A Study in Scarlet": "Arthur Conan Doyle",
  "The Adventure of the Speckled Band": "Arthur Conan Doyle",
  "The Hound of the Baskervilles": "Arthur Conan Doyle",

  // James Bond
  "Casino Royale (Novel)": "Ian Fleming",
  "From Russia with Love": "Ian Fleming",
  "Goldfinger (Novel)": "Ian Fleming",

  // William Gibson
  "Neuromancer": "William Gibson",
  "Mona Lisa Overdrive": "William Gibson",

  // Isaac Asimov
  "Foundation": "Isaac Asimov",
  "Foundation and Empire": "Isaac Asimov",

  // J.R.R. Tolkien
  "The Hobbit": "J.R.R. Tolkien",
  "The Two Towers": "J.R.R. Tolkien",
  "The Return of the King": "J.R.R. Tolkien",

  // Terry Pratchett
  "The Last Continent": "Terry Pratchett",
  "The Light Fantastic": "Terry Pratchett",

  // Scott Lynch
  "The Lies of Locke Lamora": "Scott Lynch",

  // John le Carré
  "Smiley's People": "John le Carré",

  // Ken Kocienda
  "Creative Selection": "Ken Kocienda",
};

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
  const { _file, _filepath, ...clean } = entity;
  fs.writeFileSync(_filepath, JSON.stringify(clean, null, 2));
}

let booksUpdated = 0;
let authorsUpdated = 0;

for (const [bookName, authorName] of Object.entries(BOOK_AUTHORS)) {
  const book = byName.get(bookName);
  const author = byName.get(authorName);

  if (!book) {
    console.log("BOOK NOT FOUND: " + bookName);
    continue;
  }
  if (!author) {
    console.log("AUTHOR NOT FOUND: " + authorName);
    continue;
  }

  let bookModified = false;
  let authorModified = false;

  // Add written_by to book
  if (!hasRelationship(book, "written_by", author.id)) {
    addRelationship(book, "written_by", author.id);
    console.log("+ " + bookName + " → written_by → " + authorName);
    bookModified = true;
  }

  // Add wrote to author
  if (!hasRelationship(author, "wrote", book.id)) {
    addRelationship(author, "wrote", book.id);
    console.log("+ " + authorName + " → wrote → " + bookName);
    authorModified = true;
  }

  if (bookModified) {
    saveEntity(book);
    booksUpdated++;
  }
  if (authorModified) {
    saveEntity(author);
    authorsUpdated++;
  }
}

console.log("\n========================================");
console.log("Books updated: " + booksUpdated);
console.log("Authors updated: " + authorsUpdated);
