# Development Report: Pipeline & Project Cleanup

**Commit:** d5c8acd
**Phase:** Infrastructure
**Breakthrough:** no

## Objective

Replace the ad-hoc per-title shell scripts and batch artifacts with a proper scripted pipeline, add project documentation, and introduce missing-entity detection.

## Summary

Two commits consolidated ~50 individual shell scripts, ~45 batch JSON files, and comparison experiment data into a centralized pipeline with extract, generate, validate, and find-missing steps. A README and canonical title registry were added.

## Changes Made

### Cleanup (47961b8)

**Removed (~176 files, -11,596 lines):**
- All per-title shell scripts (`generate-batman-1989.sh`, `generate-bttf.sh`, etc.)
- All `batches/` JSON files
- All `comparison/` experiment directories (`chunk-5/`, `enhanced-batch/`, `gpt-4.1-mini/`, `gpt-4o/`, `single-call/`)
- Stale working docs: `ENTITY_GENERATION_PROMPT.md`, `RELATIONSHIP_AUDIT.md`, `TAGGING-IMPROVEMENT-*.md`, `TAG_ANALYSIS.md`
- `content-audit-report.json`, `relationship-fixes.json`, `generate-all.sh`, `generate-remaining.sh`

**Added:**
- `README.md` — project documentation (105 lines)
- `titles.json` — canonical title registry (224 lines)
- `scripts/pipeline.js` — orchestration: extract → generate → validate (202 lines)
- `scripts/extract-entities.js` — entity extraction from titles (142 lines)
- `scripts/validate.js` — entity validation (183 lines)
- `scripts/list-titles.js` — utility to list available titles (26 lines)
- `prompts/extract-entities.prompt` — centralized extraction prompt
- `package.json` updated with `extract`, `pipeline`, `validate` npm scripts

### Pipeline Tightening (dfe264c)

- `scripts/find-missing.js` — scans all relationship targets, identifies UUIDs that don't resolve to existing entity files, outputs human-readable or `--json` format
- `scripts/pipeline.js` — extended with Step 4: automatically runs find-missing after validation, reports count, saves to `missing-entities.json`
- `package.json` — added `find-missing` npm script

## Issues Resolved

1. Per-title scripts were unsustainable at scale — replaced with parameterized pipeline
2. Batch and comparison artifacts cluttered the repo — removed
3. No way to detect dangling relationship references — added find-missing step
4. No project documentation existed — added README

## Next Steps

- Extend pipeline with link population step
- Add entity generation step to pipeline
- Consider CI integration for validation
