#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const SCHEMAS_DIR = path.join(__dirname, '..', 'schemas');
const ENTITIES_DIR = path.join(__dirname, '..', 'entities');

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function loadExistingEntities() {
  const entities = [];
  const files = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'));
  for (const file of files) {
    const entity = JSON.parse(fs.readFileSync(path.join(ENTITIES_DIR, file), 'utf-8'));
    // Strip content to reduce tokens
    const { content, ...stripped } = entity;
    stripped._sourceFile = file;
    entities.push(stripped);
  }
  return entities;
}

async function generateBatch(source, entitySpecs) {
  // Load schema
  const schema = fs.readFileSync(path.join(SCHEMAS_DIR, 'entity.schema.json'), 'utf-8');

  // Load existing entities (without content)
  const existingEntities = loadExistingEntities();

  // Check for existing UUIDs to preserve
  const existingBySlug = {};
  existingEntities.forEach(e => {
    existingBySlug[slugify(e.name)] = e.id;
  });

  // Build the entity specs string
  const specsText = entitySpecs.map(s => `- ${s.type}: "${s.name}"`).join('\n');

  const prompt = `Generate detailed entities for "${source}".

Create the following entities:
${specsText}

For each entity, include:
- id: a new UUID (uuid v4 format)
- type: the entity type specified
- name: the name specified
- description: a concise but informative description (1-2 sentences)
- content: array of 4-6 {title, body} sections with DETAILED information. Each body should be a substantial paragraph (50-150 words). Include sections like:
  - For characters: Background, Personality, Story Role, Relationships, Abilities/Skills
  - For locations: Overview, Appearance, History, Story Significance
  - For items: Overview, Appearance, Function, History, Story Significance
  - For organizations: Overview, Structure, History, Goals, Key Members
  - For books/movies: Overview, Plot Summary, Themes, Reception
  - For people: Biography, Career, Notable Works, Style/Influence
- aliases: alternative names, nicknames, titles (be thorough)
- relationships: connections to other entities (use UUIDs from existing entities list, or reference other entities you're creating in this batch by their name - I'll resolve them later)
- properties: relevant attributes (3-5 properties per entity)
- tags: categorization tags (5-8 relevant tags)

QUALITY REQUIREMENTS:
- Each entity should be comprehensive and detailed
- Content sections should have substantial, informative paragraphs
- Do not produce shallow or abbreviated entries
- Aim for encyclopedia-quality depth

IMPORTANT:
- For relationships to existing entities, use their exact UUIDs from the list below
- For relationships between entities in THIS batch, use the format "@@EntityName@@" and I'll resolve it
- Do not fabricate UUIDs for entities that don't exist

## Entity Schema
\`\`\`json
${schema}
\`\`\`

## Existing Entities (for relationships)
\`\`\`json
${JSON.stringify(existingEntities.map(e => ({ id: e.id, type: e.type, name: e.name })), null, 2)}
\`\`\`

Return a JSON object with an "entities" array containing all the generated entities.
Output ONLY valid JSON, no explanation or markdown code blocks.`;

  // Call OpenAI API with retry logic
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY_CONTENTGEN,
    baseURL: process.env.OPENAI_API_BASE_URL,
    organization: process.env.OPENAI_API_ORG
  });

  let response;
  let retries = 0;
  const maxRetries = 5;

  console.log(`Generating ${entitySpecs.length} entities for "${source}"...`);

  while (retries < maxRetries) {
    try {
      response = await client.chat.completions.create({
        model: 'gpt-4.1-mini',
        response_format: { type: 'json_object' },
        max_tokens: 16000,
        messages: [
          { role: 'user', content: prompt }
        ]
      });
      break;
    } catch (err) {
      if (err.status === 429 && retries < maxRetries - 1) {
        const delay = Math.pow(2, retries) * 1000 + Math.random() * 1000;
        console.log(`Rate limited. Retrying in ${Math.round(delay / 1000)}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        retries++;
      } else {
        throw err;
      }
    }
  }

  // Log token usage
  if (response.usage) {
    console.log(`Tokens - Input: ${response.usage.prompt_tokens}, Output: ${response.usage.completion_tokens}`);
  }

  const content = response.choices[0].message.content;

  // Parse response
  let result;
  try {
    result = JSON.parse(content);
  } catch (err) {
    console.error('Failed to parse response as JSON:');
    console.error(content);
    process.exit(1);
  }

  const entities = result.entities || [];

  // Build a map of new entity names to their IDs for resolving references
  const newEntityIds = {};
  entities.forEach(e => {
    newEntityIds[e.name] = e.id;
    newEntityIds[e.name.toLowerCase()] = e.id;
  });

  // Resolve @@EntityName@@ references and preserve existing UUIDs
  for (const entity of entities) {
    // Preserve existing UUID if regenerating
    const slug = slugify(entity.name);
    if (existingBySlug[slug]) {
      console.log(`Preserving existing UUID for "${entity.name}": ${existingBySlug[slug]}`);
      entity.id = existingBySlug[slug];
    }

    // Resolve cross-references within batch
    if (entity.relationships) {
      for (const rel of entity.relationships) {
        if (typeof rel.target === 'string' && rel.target.startsWith('@@')) {
          const refName = rel.target.replace(/^@@|@@$/g, '');
          if (newEntityIds[refName] || newEntityIds[refName.toLowerCase()]) {
            rel.target = newEntityIds[refName] || newEntityIds[refName.toLowerCase()];
          } else {
            console.warn(`Warning: Could not resolve reference "${refName}" in ${entity.name}`);
          }
        }
      }
    }
  }

  return entities;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log('Usage: generate-batch.js <config.json> [--chunk-size=N]');
    console.log('');
    console.log('Config file format:');
    console.log('{');
    console.log('  "source": "Casino Royale",');
    console.log('  "entities": [');
    console.log('    { "type": "character", "name": "James Bond" },');
    console.log('    { "type": "location", "name": "Casino Royale" }');
    console.log('  ]');
    console.log('}');
    console.log('');
    console.log('Options:');
    console.log('  --chunk-size=N  Process entities in chunks of N (default: all at once)');
    process.exit(1);
  }

  // Parse arguments
  const configPath = args[0];
  let chunkSize = null;
  for (const arg of args.slice(1)) {
    if (arg.startsWith('--chunk-size=')) {
      chunkSize = parseInt(arg.split('=')[1], 10);
    }
  }

  // Load config
  const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

  let allEntities = [];

  if (chunkSize && chunkSize < config.entities.length) {
    // Process in chunks
    const chunks = [];
    for (let i = 0; i < config.entities.length; i += chunkSize) {
      chunks.push(config.entities.slice(i, i + chunkSize));
    }

    console.log(`Processing ${config.entities.length} entities in ${chunks.length} chunks of ${chunkSize}...\n`);

    for (let i = 0; i < chunks.length; i++) {
      console.log(`\n--- Chunk ${i + 1}/${chunks.length} ---`);
      const entities = await generateBatch(config.source, chunks[i]);
      allEntities = allEntities.concat(entities);
    }
  } else {
    // Process all at once
    allEntities = await generateBatch(config.source, config.entities);
  }

  console.log(`\nGenerated ${allEntities.length} entities:`);

  // Save each entity
  for (const entity of allEntities) {
    const filename = `${slugify(entity.name)}.json`;
    const filepath = path.join(ENTITIES_DIR, filename);
    fs.writeFileSync(filepath, JSON.stringify(entity, null, 2));
    console.log(`  - ${filename} (${entity.type}: ${entity.name})`);
  }

  console.log('\nDone!');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
