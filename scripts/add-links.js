#!/usr/bin/env node

/**
 * Add external links to entities using OpenAI's gpt-4.1-mini
 *
 * Usage:
 *   node scripts/add-links.js              # Process all entities
 *   node scripts/add-links.js --dry-run    # Preview without saving
 *   node scripts/add-links.js --filter="batman*.json"  # Process subset
 *   node scripts/add-links.js --batch-size=5           # Custom batch size
 *   node scripts/add-links.js --force      # Process even if links exist
 */

const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');

const ENTITIES_DIR = path.join(__dirname, '..', 'entities');

// Parse command line args
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FORCE = args.includes('--force');
const BATCH_SIZE = parseInt(args.find(a => a.startsWith('--batch-size='))?.split('=')[1] || '10');
const FILTER = args.find(a => a.startsWith('--filter='))?.split('=')[1];

// Stats tracking
const stats = {
  processed: 0,
  skipped: 0,
  updated: 0,
  errors: 0,
  totalTokens: 0
};

function matchGlob(filename, pattern) {
  // Simple glob matching for * wildcards
  const regex = new RegExp('^' + pattern.replace(/\*/g, '.*') + '$');
  return regex.test(filename);
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function callOpenAI(client, entities) {
  const prompt = `For each entity below, provide 1-2 relevant external reference links.

Link types to include (in order of preference):
1. "official" - Official website or social media
2. "wiki" - Wikipedia article
3. "fan-wiki" - Fandom wikis like Wookieepedia (Star Wars), Memory Alpha (Star Trek), DC Wiki, Marvel Database, etc.
4. "database" - Reference databases like IMDb, Goodreads, MusicBrainz, etc.

Return ONLY real, verified URLs that are likely to exist. Do not make up URLs.
For fictional characters/items/locations, prefer fan wikis over Wikipedia.
For real people/companies, prefer Wikipedia and official sites.

Entities (keyed by ID):
${JSON.stringify(entities, null, 2)}

Return JSON with entity IDs as keys:
{
  "links": {
    "entity-id-1": [
      {"url": "https://...", "title": "Page Title", "type": "wiki"}
    ],
    "entity-id-2": [
      {"url": "https://...", "title": "Page Title", "type": "official"},
      {"url": "https://...", "title": "Page Title", "type": "fan-wiki"}
    ]
  }
}`;

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
        console.log(`Rate limited. Retrying in ${Math.round(delay / 1000)}s...`);
        await sleep(delay);
        retries++;
      } else {
        throw err;
      }
    }
  }

  // Track token usage
  if (response.usage) {
    stats.totalTokens += response.usage.total_tokens;
  }

  const content = response.choices[0].message.content;
  return JSON.parse(content);
}

async function main() {
  console.log('Add Links to Entities');
  console.log('='.repeat(50));
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN (no changes will be saved)' : 'LIVE'}`);
  console.log(`Batch size: ${BATCH_SIZE}`);
  if (FILTER) console.log(`Filter: ${FILTER}`);
  if (FORCE) console.log('Force mode: will process entities with existing links');
  console.log('');

  // Initialize OpenAI client
  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY_CONTENTGEN,
    baseURL: process.env.OPENAI_API_BASE_URL,
    organization: process.env.OPENAI_API_ORG
  });

  // Load all entity files
  console.log('Loading entities...');
  let files = fs.readdirSync(ENTITIES_DIR).filter(f => f.endsWith('.json'));

  // Apply filter if specified
  if (FILTER) {
    files = files.filter(f => matchGlob(f, FILTER));
    console.log(`Filtered to ${files.length} files matching "${FILTER}"`);
  }

  // Load entities and filter those needing links
  const entitiesToProcess = [];
  const entityFileMap = {}; // Map entity ID to file path and entity

  for (const file of files) {
    const filePath = path.join(ENTITIES_DIR, file);
    const entity = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    // Skip if already has links (unless --force)
    if (!FORCE && entity.links && entity.links.length > 0) {
      stats.skipped++;
      continue;
    }

    entitiesToProcess.push({
      id: entity.id,
      name: entity.name,
      type: entity.type,
      description: entity.description || '',
      aliases: entity.aliases || []
    });
    entityFileMap[entity.id] = { filePath, entity };
  }

  console.log(`Found ${entitiesToProcess.length} entities to process (${stats.skipped} skipped with existing links)`);
  console.log('');

  if (entitiesToProcess.length === 0) {
    console.log('No entities to process.');
    return;
  }

  // Process in batches
  const batches = [];
  for (let i = 0; i < entitiesToProcess.length; i += BATCH_SIZE) {
    batches.push(entitiesToProcess.slice(i, i + BATCH_SIZE));
  }

  console.log(`Processing ${batches.length} batches...`);
  console.log('');

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    console.log(`Batch ${i + 1}/${batches.length} (${batch.length} entities)...`);

    try {
      const result = await callOpenAI(client, batch);
      stats.processed += batch.length;

      // Process results
      for (const entityData of batch) {
        const links = result.links?.[entityData.id];

        if (!links || links.length === 0) {
          console.log(`  - ${entityData.name}: no links returned`);
          continue;
        }

        const { filePath, entity } = entityFileMap[entityData.id];

        // Validate link structure
        const validLinks = links.filter(link =>
          link.url && link.title && link.type &&
          ['official', 'wiki', 'fan-wiki', 'database'].includes(link.type)
        );

        if (validLinks.length === 0) {
          console.log(`  - ${entityData.name}: no valid links`);
          continue;
        }

        console.log(`  - ${entityData.name}: ${validLinks.length} link(s)`);
        for (const link of validLinks) {
          console.log(`      ${link.type}: ${link.url}`);
        }

        if (!DRY_RUN) {
          entity.links = validLinks;
          fs.writeFileSync(filePath, JSON.stringify(entity, null, 2));
          stats.updated++;
        } else {
          stats.updated++;
        }
      }

      // Small delay between batches to be nice to the API
      if (i < batches.length - 1) {
        await sleep(500);
      }
    } catch (err) {
      console.error(`  Error processing batch: ${err.message}`);
      stats.errors++;
    }

    console.log('');
  }

  // Print summary
  console.log('='.repeat(50));
  console.log('Summary');
  console.log('='.repeat(50));
  console.log(`Entities processed: ${stats.processed}`);
  console.log(`Entities updated: ${stats.updated}`);
  console.log(`Entities skipped: ${stats.skipped}`);
  console.log(`Errors: ${stats.errors}`);
  console.log(`Total tokens used: ${stats.totalTokens}`);
  if (DRY_RUN) {
    console.log('\n(DRY RUN - no files were modified)');
  }
}

main().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});
