#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "..", "entities");
const files = fs.readdirSync(dir).filter(f => f.endsWith(".json"));

// Load all entities
const entities = new Map();
for (const f of files) {
  const e = JSON.parse(fs.readFileSync(path.join(dir, f)));
  if (e.id) entities.set(e.id, {...e, _file: f});
}

// Find books
const books = [...entities.values()].filter(e => e.type === "book");
console.log("=== BOOKS (" + books.length + ") ===\n");

const booksWithoutAuthors = [];
const booksWithMissingAuthors = [];

for (const book of books) {
  const authorRels = (book.relationships || []).filter(r =>
    r.type === "authored_by" || r.type === "written_by"
  );

  const authors = [];
  for (const rel of authorRels) {
    const target = entities.get(rel.target);
    if (target) {
      authors.push(target.name + " (" + rel.type + ")");
    } else {
      authors.push(rel.target.slice(0,8) + "... (MISSING)");
      booksWithMissingAuthors.push({book: book.name, targetId: rel.target});
    }
  }

  if (authors.length === 0) {
    booksWithoutAuthors.push(book.name);
  }

  console.log(book.name);
  console.log("  Authors: " + (authors.length ? authors.join(", ") : "NONE"));
}

// Find authors (people with author/writer profession)
console.log("\n\n=== AUTHORS/WRITERS ===\n");

const authorsWithoutBooks = [];

const authorEntities = [...entities.values()].filter(e => {
  if (e.type !== "person") return false;
  const profs = e.facets?.profession || [];
  const props = e.properties?.occupation || [];
  return profs.includes("author") || profs.includes("writer") ||
         props.some?.(p => p.toLowerCase().includes("author") || p.toLowerCase().includes("writer"));
});

for (const author of authorEntities) {
  const wroteRels = (author.relationships || []).filter(r =>
    r.type === "wrote" || r.type === "authored"
  );

  const works = [];
  for (const rel of wroteRels) {
    const target = entities.get(rel.target);
    if (target) {
      works.push(target.name + " (" + target.type + ")");
    } else {
      works.push(rel.target.slice(0,8) + "... (MISSING)");
    }
  }

  // Filter to just books
  const bookWorks = wroteRels.filter(r => {
    const target = entities.get(r.target);
    return target && target.type === "book";
  });

  if (bookWorks.length === 0 && author.facets?.profession?.includes("author")) {
    authorsWithoutBooks.push(author.name);
  }

  console.log(author.name);
  console.log("  Works: " + (works.length ? works.join(", ") : "NONE"));
}

// Summary
console.log("\n\n=== SUMMARY ===\n");
console.log("Total books: " + books.length);
console.log("Books without author links: " + booksWithoutAuthors.length);
if (booksWithoutAuthors.length > 0) {
  console.log("  " + booksWithoutAuthors.join("\n  "));
}

console.log("\nBooks with missing author entities: " + booksWithMissingAuthors.length);
if (booksWithMissingAuthors.length > 0) {
  booksWithMissingAuthors.forEach(b => console.log("  " + b.book + " → " + b.targetId));
}

console.log("\nAuthors without book links: " + authorsWithoutBooks.length);
if (authorsWithoutBooks.length > 0) {
  console.log("  " + authorsWithoutBooks.join("\n  "));
}

// Check bidirectional
console.log("\n\n=== BIDIRECTIONAL CHECK ===\n");

for (const book of books) {
  const authorRels = (book.relationships || []).filter(r =>
    r.type === "authored_by" || r.type === "written_by"
  );

  for (const rel of authorRels) {
    const author = entities.get(rel.target);
    if (!author) continue;

    const hasReverse = (author.relationships || []).some(r =>
      (r.type === "wrote" || r.type === "authored") && r.target === book.id
    );

    if (!hasReverse) {
      console.log("MISSING REVERSE: " + author.name + " → wrote → " + book.name);
    }
  }
}

// Check for authors with wrote→book but book doesn't have written_by→author
for (const author of authorEntities) {
  const wroteRels = (author.relationships || []).filter(r =>
    r.type === "wrote" || r.type === "authored"
  );

  for (const rel of wroteRels) {
    const target = entities.get(rel.target);
    if (!target || target.type !== "book") continue;

    const hasReverse = (target.relationships || []).some(r =>
      (r.type === "written_by" || r.type === "authored_by") && r.target === author.id
    );

    if (!hasReverse) {
      console.log("MISSING REVERSE: " + target.name + " → written_by → " + author.name);
    }
  }
}
