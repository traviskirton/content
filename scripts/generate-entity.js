#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const PROMPTS_DIR = path.join(__dirname, '..', 'prompts');
const SCHEMAS_DIR = path.join(__dirname, '..', 'schemas');
const ENTITIES_DIR = path.join(__dirname, '..', 'entities');

async function generateEntity(type, variables) {
  // Load prompt template
  const promptPath = path.join(PROMPTS_DIR, `${type}.prompt`);
  if (!fs.existsSync(promptPath)) {
    console.error(`No prompt template found for type: ${type}`);
    console.error(`Expected: ${promptPath}`);
    process.exit(1);
  }
  let prompt = fs.readFileSync(promptPath, 'utf-8');

  // Replace variables in prompt
  for (const [key, value] of Object.entries(variables)) {
    prompt = prompt.replace(new RegExp(`\\[${key}\\]`, 'g'), value);
  }

  // Load schema
  const schema = fs.readFileSync(path.join(SCHEMAS_DIR, 'entity.schema.json'), 'utf-8');

  // Load existing entities for context (UUIDs and names for relationship linking)
  const existingEntities = [];
  const entityFiles = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'));
  for (const file of entityFiles) {
    const entity = JSON.parse(fs.readFileSync(path.join(ENTITIES_DIR, file), 'utf-8'));
    existingEntities.push({
      id: entity.id,
      type: entity.type,
      name: entity.name
    });
  }

  // Build the full prompt
  const fullPrompt = `${prompt}

## Entity Schema

\`\`\`json
${schema}
\`\`\`

## Existing Entities (for relationships)

Use these UUIDs when creating relationships to existing entities:

\`\`\`json
${JSON.stringify(existingEntities, null, 2)}
\`\`\`

Now generate the entity JSON. Output ONLY the JSON, no explanation or markdown code blocks.`;

  // Call OpenAI API with retry logic
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY_CONTENTGEN,
    baseURL: process.env.OPENAI_API_BASE_URL,
    organization: process.env.OPENAI_API_ORG
  });

  let response;
  let retries = 0;
  const maxRetries = 5;

  while (retries < maxRetries) {
    try {
      response = await client.chat.completions.create({
        model: 'gpt-4o',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'user', content: fullPrompt }
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

  const content = response.choices[0].message.content;

  // Parse and validate JSON
  let entity;
  try {
    entity = JSON.parse(content);
  } catch (err) {
    console.error('Failed to parse response as JSON:');
    console.error(content);
    process.exit(1);
  }

  // Validate required fields
  if (!entity.id || !entity.type || !entity.name) {
    console.error('Entity missing required fields (id, type, name)');
    process.exit(1);
  }

  return entity;
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: generate-entity.js <type> <NAME> [SOURCE]');
    console.log('');
    console.log('Examples:');
    console.log('  generate-entity.js location "Twin Pines Mall" "Back to the Future"');
    console.log('  generate-entity.js character "Biff Tannen" "Back to the Future"');
    process.exit(1);
  }

  const type = args[0];
  const name = args[1];
  const source = args[2] || 'Unknown';

  console.log(`Generating ${type}: "${name}" from "${source}"...`);

  // Check if entity already exists (to preserve UUID)
  const filename = `${slugify(name)}.json`;
  const filepath = path.join(ENTITIES_DIR, filename);
  let existingId = null;

  if (fs.existsSync(filepath)) {
    const existing = JSON.parse(fs.readFileSync(filepath, 'utf-8'));
    existingId = existing.id;
    console.log(`Existing entity found, preserving UUID: ${existingId}`);
  }

  const entity = await generateEntity(type, { NAME: name, SOURCE: source });

  // Preserve existing UUID if regenerating
  if (existingId) {
    entity.id = existingId;
  }

  fs.writeFileSync(filepath, JSON.stringify(entity, null, 2));
  console.log(`Created: ${filepath}`);
  console.log(`Entity ID: ${entity.id}`);
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
