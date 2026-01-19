#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const PROMPTS_DIR = path.join(__dirname, '..', 'prompts');
const ENTITIES_DIR = path.join(__dirname, '..', 'entities');

function loadPrompt() {
  const promptPath = path.join(PROMPTS_DIR, 'transform-tags.prompt');
  if (!fs.existsSync(promptPath)) {
    console.error(`Prompt not found: ${promptPath}`);
    process.exit(1);
  }
  return fs.readFileSync(promptPath, 'utf-8');
}

function listEntityFiles(dir) {
  return fs.readdirSync(dir).filter(f => f.endsWith('.json'));
}

function buildPrompt(basePrompt, entity) {
  return `${basePrompt}

## Input Entity

${JSON.stringify(entity, null, 2)}

Return ONLY valid JSON, no explanation or markdown.`;
}

async function transformEntity(client, basePrompt, entity, model) {
  const fullPrompt = buildPrompt(basePrompt, entity);
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await client.chat.completions.create({
        model,
        response_format: { type: 'json_object' },
        messages: [{ role: 'user', content: fullPrompt }]
      });
      const content = response.choices[0].message.content;
      return JSON.parse(content);
    } catch (err) {
      if (err.status === 429 && retries < maxRetries - 1) {
        const delay = Math.pow(2, retries) * 1000 + Math.random() * 1000;
        console.log(`Rate limited. Retrying in ${Math.round(delay / 1000)}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        retries++;
        continue;
      }
      throw err;
    }
  }

  throw new Error('Failed to transform entity after retries.');
}

async function main() {
  const args = process.argv.slice(2);
  let inDir = ENTITIES_DIR;
  let outDir = ENTITIES_DIR;
  let model = 'gpt-4.1-mini';
  let limit = null;
  let dryRun = false;
  let batchSize = 5;
  let skipExisting = false;
  let onlyFiles = null;

  for (const arg of args) {
    if (arg.startsWith('--in-dir=')) inDir = arg.split('=')[1];
    if (arg.startsWith('--out-dir=')) outDir = arg.split('=')[1];
    if (arg.startsWith('--model=')) model = arg.split('=')[1];
    if (arg.startsWith('--limit=')) limit = parseInt(arg.split('=')[1], 10);
    if (arg.startsWith('--batch-size=')) batchSize = parseInt(arg.split('=')[1], 10);
    if (arg === '--dry-run') dryRun = true;
    if (arg === '--skip-existing') skipExisting = true;
    if (arg.startsWith('--only=')) {
      onlyFiles = arg.split('=')[1].split(',').map(s => s.trim()).filter(Boolean);
    }
  }

  if (!fs.existsSync(inDir)) {
    console.error(`Input directory not found: ${inDir}`);
    process.exit(1);
  }
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const basePrompt = loadPrompt();
  const files = listEntityFiles(inDir);
  const onlySet = onlyFiles ? new Set(onlyFiles) : null;
  const filteredFiles = onlySet ? files.filter(f => onlySet.has(f)) : files;
  const selectedFiles = limit ? filteredFiles.slice(0, limit) : filteredFiles;

  if (selectedFiles.length === 0) {
    console.log('No entity files found.');
    return;
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY_CONTENTGEN,
    baseURL: process.env.OPENAI_API_BASE_URL,
    organization: process.env.OPENAI_API_ORG
  });

  console.log(`Transforming ${selectedFiles.length} entities...`);

  const effectiveBatchSize = batchSize && batchSize > 0 ? batchSize : 1;
  for (let i = 0; i < selectedFiles.length; i += effectiveBatchSize) {
    const batch = selectedFiles.slice(i, i + effectiveBatchSize);
    const results = await Promise.all(batch.map(async file => {
      const inputPath = path.join(inDir, file);
      const entity = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
      if (skipExisting && entity.facets) {
        console.log(`- ${file} (skipped)`);
        return { file, transformed: null, skipped: true };
      }
      console.log(`- ${file}`);
      try {
        const transformed = await transformEntity(client, basePrompt, entity, model);
        return { file, transformed, skipped: false };
      } catch (err) {
        console.error(`Error transforming ${file}: ${err.message}`);
        return { file, transformed: null, skipped: false };
      }
    }));

    for (const { file, transformed, skipped } of results) {
      if (skipped) {
        continue;
      }
      if (!transformed || !transformed.id || !transformed.type || !transformed.name) {
        console.error(`Invalid transformed entity for ${file}. Skipping write.`);
        continue;
      }
      if (dryRun) {
        continue;
      }
      const outputPath = path.join(outDir, file);
      fs.writeFileSync(outputPath, JSON.stringify(transformed, null, 2));
    }
  }

  console.log('Done!');
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
