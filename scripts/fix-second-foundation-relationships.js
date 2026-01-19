const fs = require('fs');
const path = require('path');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');

// Second Foundation book ID
const SECOND_FOUNDATION_BOOK_ID = '00d6ad61-e1ae-47cd-b217-a30af0b9f508';

// Characters that appear in Second Foundation
const CHARACTERS = {
  'the-mule.json': 'b51fdbe5-3b66-4b84-9b83-298df591d245',
  'arkady-darell.json': '80bcb71e-7990-4fc9-8a24-c828c164fbc1',
  'dr-toran-darell-ii.json': '251b6703-f715-4a13-9bb5-45a716198cdf',
  'preem-palver.json': '471a8aae-0feb-4e52-bdc6-58f59da2bc2e',
  'bail-channis.json': '46d86f50-8293-4cec-b6f4-80b905af11de',
  'first-speaker.json': 'f940d164-d295-424c-a497-7cb3d63ce179',
  'homir-munn.json': 'a55f90c0-2c95-4c14-9bea-4f84b4c75891',
  'lady-callia.json': '442b3c8d-9a8b-4f39-85fa-2fbd792a1a03'
};

// Locations that appear in Second Foundation
const LOCATIONS = {
  'rossem.json': 'b9c6f6fb-c473-4375-ac4b-24ead1f4e537',
  'kalgan-second-foundation.json': 'd75919c5-7c9a-4c67-b80a-9f1a6c9d5ef2',
  'tazenda.json': 'e2b7d1f4-8f5f-4bca-8c03-4847b76a9c30',
  'trantor.json': 'c3f3e1a2-5a33-4b5d-98b5-4c165ef1b6b7',
  'terminus.json': 'a9d1b4f7-44a1-45e3-9c0c-a62d1a386796'
};

// Items that appear in Second Foundation
const ITEMS = {
  'mental-static-device.json': '1056c6d1-f0de-49b3-b84f-36a735f3e1f7',
  'prime-radiant.json': '791cb81b-6ecc-4f5e-a71b-08a731e3bc8a'
};

// Organization
const ORGANIZATIONS = {
  'second-foundation.json': '478a780d-5633-44ed-beab-55a3c19c8f03'
};

function hasRelationship(relationships, type, target) {
  return relationships.some(r => r.type === type && r.target === target);
}

function addRelationship(relationships, type, target) {
  if (!hasRelationship(relationships, type, target)) {
    relationships.push({ type, target });
    return true;
  }
  return false;
}

function updateFile(filePath, updateFn) {
  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (!content.relationships) {
    content.relationships = [];
  }
  const modified = updateFn(content);
  if (modified) {
    fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
    return true;
  }
  return false;
}

const dryRun = !process.argv.includes('--apply');
let updates = [];

// 1. Update Second Foundation book with all relationships
const bookPath = path.join(ENTITIES_DIR, 'second-foundation-book.json');
const bookContent = JSON.parse(fs.readFileSync(bookPath, 'utf-8'));
if (!bookContent.relationships) {
  bookContent.relationships = [];
}

let bookModified = false;

// Add features_character relationships
for (const [filename, id] of Object.entries(CHARACTERS)) {
  if (addRelationship(bookContent.relationships, 'features_character', id)) {
    console.log(`Book: Adding features_character -> ${filename.replace('.json', '')}`);
    bookModified = true;
  }
}

// Add features_location relationships
for (const [filename, id] of Object.entries(LOCATIONS)) {
  if (addRelationship(bookContent.relationships, 'features_location', id)) {
    console.log(`Book: Adding features_location -> ${filename.replace('.json', '')}`);
    bookModified = true;
  }
}

// Add features_item relationships
for (const [filename, id] of Object.entries(ITEMS)) {
  if (addRelationship(bookContent.relationships, 'features_item', id)) {
    console.log(`Book: Adding features_item -> ${filename.replace('.json', '')}`);
    bookModified = true;
  }
}

// Add features_organization relationships
for (const [filename, id] of Object.entries(ORGANIZATIONS)) {
  if (addRelationship(bookContent.relationships, 'features_organization', id)) {
    console.log(`Book: Adding features_organization -> ${filename.replace('.json', '')}`);
    bookModified = true;
  }
}

if (bookModified) {
  updates.push('second-foundation-book.json');
  if (!dryRun) {
    fs.writeFileSync(bookPath, JSON.stringify(bookContent, null, 2) + '\n');
  }
}

// 2. Add reverse relationships from characters to book
for (const [filename, id] of Object.entries(CHARACTERS)) {
  const filePath = path.join(ENTITIES_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`Warning: ${filename} not found`);
    continue;
  }

  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (!content.relationships) {
    content.relationships = [];
  }

  if (addRelationship(content.relationships, 'appears_in', SECOND_FOUNDATION_BOOK_ID)) {
    console.log(`${filename}: Adding appears_in -> second-foundation-book`);
    updates.push(filename);
    if (!dryRun) {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
    }
  }
}

// 3. Add reverse relationships from locations to book
for (const [filename, id] of Object.entries(LOCATIONS)) {
  const filePath = path.join(ENTITIES_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`Warning: ${filename} not found`);
    continue;
  }

  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (!content.relationships) {
    content.relationships = [];
  }

  if (addRelationship(content.relationships, 'featured_in', SECOND_FOUNDATION_BOOK_ID)) {
    console.log(`${filename}: Adding featured_in -> second-foundation-book`);
    updates.push(filename);
    if (!dryRun) {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
    }
  }
}

// 4. Add reverse relationships from items to book
for (const [filename, id] of Object.entries(ITEMS)) {
  const filePath = path.join(ENTITIES_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`Warning: ${filename} not found`);
    continue;
  }

  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (!content.relationships) {
    content.relationships = [];
  }

  if (addRelationship(content.relationships, 'appears_in', SECOND_FOUNDATION_BOOK_ID)) {
    console.log(`${filename}: Adding appears_in -> second-foundation-book`);
    updates.push(filename);
    if (!dryRun) {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
    }
  }
}

// 5. Add reverse relationships from organizations to book
for (const [filename, id] of Object.entries(ORGANIZATIONS)) {
  const filePath = path.join(ENTITIES_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.log(`Warning: ${filename} not found`);
    continue;
  }

  const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (!content.relationships) {
    content.relationships = [];
  }

  if (addRelationship(content.relationships, 'featured_in', SECOND_FOUNDATION_BOOK_ID)) {
    console.log(`${filename}: Adding featured_in -> second-foundation-book`);
    updates.push(filename);
    if (!dryRun) {
      fs.writeFileSync(filePath, JSON.stringify(content, null, 2) + '\n');
    }
  }
}

console.log(`\n${dryRun ? '[DRY RUN] Would update' : 'Updated'} ${updates.length} files`);
if (dryRun) {
  console.log('\nRun with --apply to make changes');
}
