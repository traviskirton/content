You are a senior engineer. Build a batch tag normalization + migration tool for a personal entertainment knowledge base.

DATA
- There is a folder of JSON entity files (913 files). Each file contains an entity with optional "tags": [string,...].
- Entities represent people, movies, books, characters, locations.
- Current state: ~1,735 unique freeform tags; inconsistencies in case, spacing, hyphenation, singular/plural, and synonyms.

GOAL
Implement "Approach 2: Faceted prefixes" while staying backward-compatible:
- Canonical tag format: "prefix:value"
- Keep tags as a string array in each entity JSON (no schema change).
- Rewrite existing tags into canonical tags where possible, otherwise preserve as legacy with a prefix.

CANONICAL SPEC
Allowed prefixes: type, genre, theme, role, era, franchise, loc_type, status, occupation, legacy
Canonical value rules:
- lowercase
- kebab-case
- ASCII only
- no spaces/underscores
- remove punctuation except hyphen
- collapse multiple hyphens
- trim

FACET RULES
- type:* is required. Map from entity kind if present in the JSON (e.g., "entityType", "type", etc.). If not present, infer from folder name or filename conventions; otherwise leave as "type:unknown".
- genre/theme/role/era/franchise/loc_type/status/occupation should be created only when confident from existing tags.
- For tags that are not confidently mapped, convert to "legacy:<normalized>" (do NOT drop them).

SYNONYM / MAPPING REQUIREMENTS
Create and apply a deterministic mapping strategy:
1) Mechanical normalization (case, whitespace, punctuation, singularization heuristic).
2) Synonym mapping for common categories:
   - sci-fi, scifi, science fiction, science-fiction -> genre:sci-fi
   - fantasy -> genre:fantasy
   - thriller -> genre:thriller
   - drama -> genre:drama
   - time travel, time-travel, timetravel -> theme:time-travel
   - espionage -> theme:espionage
   - corruption -> theme:corruption
   - protagonist -> role:protagonist
   - antagonist -> role:antagonist
   - mentor -> role:mentor
   - victorian era, victorian -> era:victorian
   - cold war, cold-war -> era:cold-war
   - 1950s, 50s -> era:1950s (only if clearly intended as era)
   - actor/director/writer/composer/producer -> occupation:*
   - city/country/building/region/fictional -> loc_type:*
   - active/public/tours-available -> status:*
3) Detect likely franchise tags:
   - If an existing tag matches a known franchise list you build from data frequency (e.g., appears on many entities) OR matches a curated allowlist file, map to franchise:<slug>.
   - Do NOT treat person names as franchise.
4) Ambiguity handling:
   - If a tag could map to multiple facets, do NOT guess. Keep as legacy:* and add it to a review report.

FILES TO PRODUCE
1) tag_vocab.json (seeded) with arrays for: genre, role, era, loc_type, status, occupation
2) tag_aliases.json mapping variant -> canonical (include all synonyms you discover)
3) tag_migration_map.json mapping original_tag -> rewritten_tag(s)
4) migration_report.md including:
   - counts before/after unique tags
   - top 50 tags by frequency (before and after)
   - list of tags mapped automatically with confidence
   - list of ambiguous/unmapped tags (legacy) sorted by frequency
5) dry-run output mode: no files modified; prints summary + writes reports.
6) apply mode: rewrites JSON files in place (or to an output dir), preserving formatting as much as possible.

CLI
Provide a CLI like:
- node tools/migrate-tags.js --input ./entities --output ./entities_migrated --dry-run
- node tools/migrate-tags.js --input ./entities --apply
Options:
- --input, --output, --apply, --dry-run, --backup (writes .bak), --min-franchise-count N
- --export-only (only generates reports/maps without rewriting)
- --limit N (for testing)

IMPLEMENTATION DETAILS
- Use Node.js (preferred) or Python.
- Must be idempotent: running twice should not change output after first run.
- When rewriting tags:
  - Deduplicate
  - Sort tags by prefix order: type, genre, franchise, era, role, occupation, loc_type, status, theme, legacy
- Preserve unknown tags as legacy:*.
- Add a "migration_version" field to each JSON entity (e.g., "tag_migration_version": 1) so we can track progress (this is the only allowed schema change; if you refuse schema changes, store it as legacy:tag-migration-v1).

DELIVERABLE
Return:
1) The full source code for the tool (single file is OK, multiple files better).
2) A README explaining how to run dry-run, apply, and how to extend vocab/aliases.
3) Example output snippets for the report and a migrated entity.

ASSUME
- The entities are valid JSON.
- Paths are local on disk.
- No internet access at runtime.
Start by outlining the module structure, then provide the complete code.
