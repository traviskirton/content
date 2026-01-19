#!/usr/bin/env node

/**
 * End-to-end content generation pipeline
 *
 * Run: node scripts/pipeline.js <titles.json>
 *
 * Input file format:
 * {
 *   "titles": [
 *     { "type": "movie", "name": "Back to the Future" },
 *     { "type": "book", "name": "The Hobbit" }
 *   ]
 * }
 *
 * Pipeline steps:
 * 1. Extract entities from each title
 * 2. Generate all entities using generate-batch
 * 3. Run validation
 */

const fs = require('fs');
const path = require('path');
const { execSync, spawn } = require('child_process');

const BATCHES_DIR = path.join(__dirname, '..', 'batches');
const SCRIPTS_DIR = __dirname;

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function runCommand(cmd, args, options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`\n> ${cmd} ${args.join(' ')}`);

    const proc = spawn(cmd, args, {
      stdio: 'inherit',
      ...options
    });

    proc.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    proc.on('error', reject);
  });
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log('Usage: pipeline.js <titles.json> [options]');
    console.log('');
    console.log('Input file format:');
    console.log('{');
    console.log('  "titles": [');
    console.log('    { "type": "movie", "name": "Back to the Future" },');
    console.log('    { "type": "book", "name": "The Hobbit" }');
    console.log('  ]');
    console.log('}');
    console.log('');
    console.log('Options:');
    console.log('  --extract-only    Only extract entities, do not generate');
    console.log('  --skip-extract    Skip extraction, use existing batch files');
    console.log('  --skip-validate   Skip validation step');
    console.log('  --chunk-size=N    Process generation in chunks of N entities');
    process.exit(1);
  }

  const inputPath = args[0];
  const extractOnly = args.includes('--extract-only');
  const skipExtract = args.includes('--skip-extract');
  const skipValidate = args.includes('--skip-validate');

  let chunkSize = null;
  for (const arg of args) {
    if (arg.startsWith('--chunk-size=')) {
      chunkSize = parseInt(arg.split('=')[1], 10);
    }
  }

  // Load input
  const input = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
  const titles = input.titles || [];

  if (titles.length === 0) {
    console.error('No titles found in input file.');
    process.exit(1);
  }

  console.log('='.repeat(60));
  console.log('CONTENT GENERATION PIPELINE');
  console.log('='.repeat(60));
  console.log(`\nProcessing ${titles.length} titles...`);

  // Ensure batches directory exists
  if (!fs.existsSync(BATCHES_DIR)) {
    fs.mkdirSync(BATCHES_DIR, { recursive: true });
  }

  const batchFiles = [];

  // Step 1: Extract entities
  if (!skipExtract) {
    console.log('\n' + '-'.repeat(60));
    console.log('STEP 1: Extracting entities');
    console.log('-'.repeat(60));

    for (const title of titles) {
      console.log(`\nExtracting: ${title.name} (${title.type})`);

      try {
        await runCommand('node', [
          path.join(SCRIPTS_DIR, 'extract-entities.js'),
          title.type,
          title.name,
          '--save'
        ]);

        const batchFile = path.join(BATCHES_DIR, `${slugify(title.name)}.json`);
        if (fs.existsSync(batchFile)) {
          batchFiles.push(batchFile);
        }
      } catch (err) {
        console.error(`Failed to extract entities for "${title.name}": ${err.message}`);
      }
    }

    console.log(`\nExtracted ${batchFiles.length} batch files.`);
  } else {
    // Use existing batch files
    for (const title of titles) {
      const batchFile = path.join(BATCHES_DIR, `${slugify(title.name)}.json`);
      if (fs.existsSync(batchFile)) {
        batchFiles.push(batchFile);
      } else {
        console.warn(`Warning: No batch file for "${title.name}"`);
      }
    }
  }

  if (extractOnly) {
    console.log('\n--extract-only specified, stopping here.');
    console.log(`Batch files saved to: ${BATCHES_DIR}`);
    process.exit(0);
  }

  // Step 2: Generate entities
  console.log('\n' + '-'.repeat(60));
  console.log('STEP 2: Generating entities');
  console.log('-'.repeat(60));

  for (const batchFile of batchFiles) {
    console.log(`\nGenerating from: ${path.basename(batchFile)}`);

    try {
      const genArgs = [
        path.join(SCRIPTS_DIR, 'generate-batch.js'),
        batchFile
      ];

      if (chunkSize) {
        genArgs.push(`--chunk-size=${chunkSize}`);
      }

      await runCommand('node', genArgs);
    } catch (err) {
      console.error(`Failed to generate entities from "${batchFile}": ${err.message}`);
    }
  }

  // Step 3: Validate
  if (!skipValidate) {
    console.log('\n' + '-'.repeat(60));
    console.log('STEP 3: Validating entities');
    console.log('-'.repeat(60));

    try {
      await runCommand('node', [path.join(SCRIPTS_DIR, 'validate.js')]);
    } catch (err) {
      console.log('\nValidation found issues. Review output above.');
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('PIPELINE COMPLETE');
  console.log('='.repeat(60));
}

main().catch(err => {
  console.error('Pipeline error:', err.message);
  process.exit(1);
});
