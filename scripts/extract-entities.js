#!/usr/bin/env node

/**
 * Extract entities from a movie or book title using LLM
 * Run: node scripts/extract-entities.js <type> <title>
 *
 * Example:
 *   node scripts/extract-entities.js movie "Back to the Future"
 *   node scripts/extract-entities.js book "The Hobbit"
 *
 * Outputs a JSON config suitable for generate-batch.js
 */

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const PROMPTS_DIR = path.join(__dirname, '..', 'prompts');
const BATCHES_DIR = path.join(__dirname, '..', 'batches');

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

async function extractEntities(type, title) {
  // Load prompt template
  const promptPath = path.join(PROMPTS_DIR, 'extract-entities.prompt');
  let prompt = fs.readFileSync(promptPath, 'utf-8');

  // Replace variables
  prompt = prompt.replace(/\[TITLE\]/g, title);
  prompt = prompt.replace(/\[TYPE\]/g, type);

  // Call OpenAI API
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
        model: 'gpt-4.1-mini',
        response_format: { type: 'json_object' },
        messages: [
          { role: 'user', content: prompt }
        ]
      });
      break;
    } catch (err) {
      if (err.status === 429 && retries < maxRetries - 1) {
        const delay = Math.pow(2, retries) * 1000 + Math.random() * 1000;
        console.error(`Rate limited. Retrying in ${Math.round(delay / 1000)}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        retries++;
      } else {
        throw err;
      }
    }
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

  return result;
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.log('Usage: extract-entities.js <type> <title> [--save]');
    console.log('');
    console.log('Types: movie, book');
    console.log('');
    console.log('Examples:');
    console.log('  extract-entities.js movie "Back to the Future"');
    console.log('  extract-entities.js book "The Hobbit" --save');
    console.log('');
    console.log('Options:');
    console.log('  --save    Save to batches/ directory instead of stdout');
    process.exit(1);
  }

  const type = args[0];
  const title = args[1];
  const shouldSave = args.includes('--save');

  if (!['movie', 'book'].includes(type)) {
    console.error(`Invalid type: ${type}. Must be "movie" or "book".`);
    process.exit(1);
  }

  console.error(`Extracting entities from ${type}: "${title}"...`);

  const result = await extractEntities(type, title);

  // Add the source work itself to the entity list (at the beginning)
  const sourceEntity = {
    type: type,
    name: title
  };
  result.entities = [sourceEntity, ...result.entities];

  if (shouldSave) {
    // Ensure batches directory exists
    if (!fs.existsSync(BATCHES_DIR)) {
      fs.mkdirSync(BATCHES_DIR, { recursive: true });
    }

    const filename = `${slugify(title)}.json`;
    const filepath = path.join(BATCHES_DIR, filename);
    fs.writeFileSync(filepath, JSON.stringify(result, null, 2));
    console.error(`Saved to: ${filepath}`);
    console.error(`Entities: ${result.entities.length}`);
  } else {
    // Output to stdout for piping
    console.log(JSON.stringify(result, null, 2));
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
