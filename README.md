# Content Knowledge Base

Entity dataset for movies, books, and related content (characters, locations, items, people, organizations).

## Quick Start

```bash
npm install
npm run pipeline -- titles.json
```

This runs the full pipeline:
1. **Extract** - LLM extracts entities (characters, locations, etc.) from each title
2. **Generate** - LLM generates detailed entity JSON files
3. **Validate** - Checks for issues (missing targets, duplicates, etc.)

## Project Structure

```
entities/           # Individual entity JSON files (914 files)
prompts/            # LLM prompt templates
schemas/            # JSON schema for entities
scripts/            # Node.js scripts
batches/            # Generated batch configs (intermediate files)
titles.json         # Canonical list of all titles
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run pipeline -- <titles.json>` | Full end-to-end generation |
| `npm run extract -- <type> <title>` | Extract entities from a single title |
| `npm run generate -- <type> <name> [source]` | Generate a single entity |
| `npm run generate-batch -- <config.json>` | Generate entities from batch config |
| `npm run validate` | Validate all entities |
| `npm run build` | Build search index (see below) |
| `npm run reconcile` | Interactive relationship reconciliation |

## Pipeline Options

```bash
# Full pipeline
npm run pipeline -- titles.json

# Extract only (review before generating)
npm run pipeline -- titles.json --extract-only

# Skip extraction, use existing batch files
npm run pipeline -- titles.json --skip-extract

# Process in smaller chunks (for API rate limits)
npm run pipeline -- titles.json --chunk-size=10
```

## Adding New Content

1. Add titles to `titles.json`:
   ```json
   { "type": "movie", "name": "New Movie Title" }
   ```

2. Run the pipeline:
   ```bash
   npm run pipeline -- titles.json
   ```

Or generate individually:
```bash
npm run extract -- movie "New Movie" --save
npm run generate-batch -- batches/new-movie.json
npm run validate
```

## Search Index (Optional)

If you need a combined index file for a search interface:

```bash
npm run build
```

This creates `build/index.json` with all entities bundled together, indexed by ID, type, and tag. The build folder is gitignored.

## Entity Schema

Each entity has:
- `id` - UUID
- `type` - person, character, location, item, organization, movie, book, franchise
- `name` - canonical name
- `description` - 1-2 sentence summary
- `content` - array of {title, body} sections
- `aliases` - alternative names
- `relationships` - links to other entities
- `properties` - type-specific attributes
- `tags` - categorization tags

## Environment Variables

For entity generation, set:
```
OPENAI_API_KEY_CONTENTGEN=<api-key>
OPENAI_API_BASE_URL=<base-url>      # optional
OPENAI_API_ORG=<org-id>             # optional
```
