# Development Report: Data Integrity & Entity Links

**Commit:** pending
**Phase:** Data Quality
**Breakthrough:** no

## Objective

Fix remaining data integrity issues (wrong relationships, incorrect entity types, missing facets) and add external reference links to all entities via an OpenAI-powered script.

## Summary

Three commits addressed cross-universe relationship errors, entity type misclassifications, and missing genre tags, then introduced a `links` field to the entity schema and populated it across 908 entities using gpt-4.1-mini.

## Changes Made

### Data Fixes (d493014)

**Wrong relationships removed:**
- Marty McFly → Batman franchise (cross-universe error)
- Clara Clayton → Dark Knight entities
- Michael Keaton → four Nolan Batman films he wasn't in
- Multiple actors with `starred_in` pointing to non-existent entities (ghost UUID `f7e6d5c4`)

**Entity type corrected:**
- `middle-earth.json`: type changed from `franchise` to `location`, properties rewritten

**New entity:**
- `milky-way-galaxy.json` — Foundation universe setting; fixed Foundation location entities that incorrectly pointed at the franchise entity for `located_in`

**Missing facets/tags:**
- `superhero` genre added to Batman films
- `spy-fiction` genre added to Le Carré books
- `spy` tag added to James Bond

### Links Schema & Script (0c5c736)

**Schema** (`schemas/entity.schema.json`): New optional `links` array with objects containing:
- `url` (URI format)
- `title` (string)
- `type` (enum: `official`, `wiki`, `fan-wiki`, `database`)

**Script** (`scripts/add-links.js`, 250 lines):
- Batches entities (default 10) and calls gpt-4.1-mini
- Prefers fan wikis for fictional subjects, Wikipedia/official for real people
- Validates returned links before writing
- Supports `--dry-run`, `--filter`, `--force`, `--batch-size`
- Exponential backoff for rate limiting

### Link Population (6e73f5a)

- 908 entity files received 1-2 links each (~9,600 lines added)

## Issues Resolved

1. Cross-universe relationship errors (BTTF characters linked to Batman) — removed
2. Middle-earth was typed as franchise instead of location — corrected with full property rewrite
3. Foundation locations used franchise entity as `located_in` target — created Milky Way Galaxy entity as proper parent
4. Entities had no external reference links — added schema field and populated via OpenAI

## Next Steps

- Verify link validity (dead URL detection)
- Add link population as a pipeline step
- Consider adding more link types (e.g., IMDb, Goodreads)
