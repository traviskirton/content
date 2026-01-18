# Relationship Audit Report

This document provides a comprehensive audit of bidirectional relationship issues across all 913 entities in the content dataset. The audit was conducted to identify gaps that affect search indexing and discoverability.

## Executive Summary

| Category | Missing Relationships | Files Affected |
|----------|----------------------|----------------|
| Movies ↔ People | ~150 | ~35 person files |
| Movies ↔ Characters | ~143 | ~17 movie files |
| Movies ↔ Locations | ~143 | ~80 location + ~17 movie files |
| Locations ↔ Locations | ~21 | ~21 location files |
| Books ↔ Authors | ~24 | ~20 book + ~10 author files |
| Books ↔ Franchises | ~12 | ~12 book + ~8 franchise files |
| Companies ↔ Movies | ~20 | ~10 company files |
| **Total** | **~530** | **~200 files** |

---

## 1. Movies ↔ People

### Issue
Movies have forward relationships (`directed_by`, `stars`, `composed_by`, `written_by`) but people entities lack corresponding reverse relationships.

### Expected Relationship Pairs
| Forward (Movie→Person) | Reverse (Person→Movie) |
|------------------------|------------------------|
| `directed_by` | `directed` |
| `stars` | `starred_in` |
| `composed_by` | `composed` |
| `written_by` | `wrote` |

### Directors Missing `directed` Relationships

**Christopher Nolan** (UUID: `2c9081c5-6afb-4f06-9a6a-9876543210aa`)
- Missing `directed` → Batman Begins (`fc1e827c-35d3-4aca-aae2-b7be4817a0bf`)
- Missing `directed` → The Dark Knight (`ef425b4c-550c-44bd-8b95-9c2f812b5ac2`)
- Missing `directed` → The Dark Knight Rises (`e8a1d111-ec4d-458b-b5c8-05e022a2d8bb`)
- Missing `directed` → Inception (`d1e1e9a0-dfb4-4db9-a1b0-3e74f3b41f97`)
- Missing `directed` → Interstellar (`d2b1b5ce-fc81-4abd-8481-70a5e0c55535`)
- Missing `directed` → Oppenheimer (`278eef75-2ad5-4241-b689-e4ea9f35ac58`)
- Missing `directed` → The Prestige (`9b8c7d6e-5f2a-4f23-a820-c0f1fce13248`)
- Missing `directed` → Tenet (`bc20c469-e768-4609-8f86-70267ae45c1a`)

**Robert Zemeckis**
- Missing `directed` → Back to the Future
- Missing `directed` → Back to the Future Part II
- Missing `directed` → Back to the Future Part III

**Tim Burton**
- Missing `directed` → Batman (1989)
- Missing `directed` → Batman Returns

**Francis Ford Coppola**
- Missing `directed` → The Godfather Part III
- Missing `directed` → The Godfather Coda

**Matt Reeves**
- Missing `directed` → The Batman (2022)

### Actors Missing `starred_in` Relationships

**Christian Bale** (UUID: `4cf6d8b9-71f4-4eff-9c9e-bb3b3f7b2e8e`)
- Missing `starred_in` → Batman Begins
- Missing `starred_in` → The Dark Knight
- Missing `starred_in` → The Dark Knight Rises
- Missing `starred_in` → The Prestige

**Michael J. Fox**
- Missing `starred_in` → Back to the Future
- Missing `starred_in` → Back to the Future Part II
- Missing `starred_in` → Back to the Future Part III

**Christopher Lloyd**
- Missing `starred_in` → Back to the Future (all 3)

**Lea Thompson**
- Missing `starred_in` → Back to the Future (all 3)

**Leonardo DiCaprio** (UUID: `ac3b1234-abf5-40d2-8bef-c8b789d8e123`)
- Missing `starred_in` → Inception

**Heath Ledger** (UUID: `d5c5fcb1-02d2-4c82-9f84-efb89c8a2bd9`)
- Missing `starred_in` → The Dark Knight

**Cillian Murphy**
- Missing `starred_in` → Batman Begins
- Missing `starred_in` → Inception
- Missing `starred_in` → Oppenheimer

**Michael Caine**
- Missing `starred_in` → Batman Begins
- Missing `starred_in` → The Dark Knight Rises
- Missing `starred_in` → The Prestige

**Gary Oldman**
- Missing `starred_in` → Batman Begins
- Missing `starred_in` → The Dark Knight

**Joseph Gordon-Levitt**
- Missing `starred_in` → Inception
- Missing `starred_in` → The Dark Knight Rises

**Hugh Jackman**
- Missing `starred_in` → The Prestige

**Jack Nicholson**
- Missing `starred_in` → Batman (1989)

*(Plus ~20 additional actors with single film instances)*

### Composers Missing `composed` Relationships

**Hans Zimmer** (UUID: `a3c5de67-f1d3-42b6-a6b3-123f0d65c1a4`)
- Missing `composed` → Batman Begins
- Missing `composed` → Inception
- Missing `composed` → Interstellar
- Missing `composed` → The Dark Knight
- Missing `composed` → The Dark Knight Rises
- Missing `composed` → The Prestige

**Alan Silvestri**
- Missing `composed` → Back to the Future (all 3)

**James Newton Howard**
- Missing `composed` → Batman Begins
- Missing `composed` → The Dark Knight

**Danny Elfman**
- Missing `composed` → Batman (1989)
- Missing `composed` → Batman Returns

**Michael Giacchino**
- Missing `composed` → The Batman (2022)

### Writers Missing `wrote` Relationships

**Christopher Nolan**
- Missing `wrote` → all 8 Nolan films

**David S. Goyer**
- Missing `wrote` → Batman Begins
- Missing `wrote` → The Dark Knight
- Missing `wrote` → The Dark Knight Rises

**Bob Gale**
- Missing `wrote` → Back to the Future (all 3)

**Sam Hamm**
- Missing `wrote` → Batman (1989)
- Missing `wrote` → Batman Returns

---

## 2. Movies ↔ Characters

### Issue
Characters have `appears_in` relationships to movies, but movies are missing the reciprocal `features_character` relationships.

### Missing `features_character` by Movie

**Inception** (`d1e1e9a0-dfb4-4db9-a1b0-3e74f3b41f97`) - 10 missing
- Dom Cobb (`d479f5a6-9e23-493f-9db2-4fbeabdfd5f3`)
- Ariadne
- Arthur
- Mal Cobb
- Eames
- Yusuf
- Saito
- Robert Fischer
- Peter Browning
- Maurice Fischer

**Batman Begins** (`fc1e827c-35d3-4aca-aae2-b7be4817a0bf`) - 11 missing
- Bruce Wayne / Batman
- Alfred Pennyworth
- Ra's al Ghul
- Scarecrow / Jonathan Crane
- Carmine Falcone
- Rachel Dawes
- Jim Gordon
- Lucius Fox
- Thomas Wayne
- Martha Wayne
- Henri Ducard

**Oppenheimer** (`278eef75-2ad5-4241-b689-e4ea9f35ac58`) - 10 missing
- J. Robert Oppenheimer
- Kitty Oppenheimer
- General Leslie Groves
- Lewis Strauss
- Albert Einstein
- Niels Bohr
- Edward Teller
- Isidor Rabi
- Ernest Lawrence
- Jean Tatlock

**Interstellar** (`d2b1b5ce-fc81-4abd-8481-70a5e0c55535`) - 9 missing
- Cooper
- Murph
- Amelia Brand
- Professor Brand
- Tom Cooper
- TARS
- CASE
- Dr. Mann
- Romilly

**The Dark Knight Rises** (`e8a1d111-ec4d-458b-b5c8-05e022a2d8bb`) - 9 missing
- Bruce Wayne / Batman
- Bane
- Selina Kyle / Catwoman
- John Blake
- Miranda Tate / Talia al Ghul
- Alfred Pennyworth
- Jim Gordon
- Lucius Fox
- Scarecrow

**The Batman (2022)** - 9 missing
- Bruce Wayne / Batman
- Selina Kyle / Catwoman
- The Riddler
- Carmine Falcone
- The Penguin
- Alfred Pennyworth
- Jim Gordon
- Mayor Don Mitchell Jr.
- Bella Reál

**Back to the Future Part II** - 9 missing
- Marty McFly
- Doc Brown
- Biff Tannen
- Lorraine McFly
- George McFly
- Jennifer Parker
- Griff Tannen
- Old Biff
- Marty Jr.

**The Prestige** (`9b8c7d6e-5f2a-4f23-a820-c0f1fce13248`) - 8 missing
- Alfred Borden
- Robert Angier
- Olivia Wenscombe
- Cutter
- Julia McCullough
- Sarah Borden
- Tesla
- Fallon

**Batman (1989)** - 8 missing
- Bruce Wayne / Batman
- The Joker
- Vicki Vale
- Alfred Pennyworth
- Harvey Dent
- Commissioner Gordon
- Alexander Knox
- Carl Grissom

**Tenet** (`bc20c469-e768-4609-8f86-70267ae45c1a`) - 7 missing
- The Protagonist
- Neil
- Kat
- Andrei Sator
- Ives
- Priya
- Sir Michael Crosby

**The Dark Knight** (`ef425b4c-550c-44bd-8b95-9c2f812b5ac2`) - 6 missing
- The Joker (`82d8cba6-2bde-47da-bf1e-1897f5b8b9fa`)
- Harvey Dent / Two-Face
- Rachel Dawes
- Jim Gordon
- Lucius Fox
- Sal Maroni

**Back to the Future** - 6 missing
- Marty McFly
- Doc Brown
- Biff Tannen
- Lorraine Baines McFly
- George McFly
- Jennifer Parker

**Back to the Future Part III** - 5 missing
- Marty McFly
- Doc Brown
- Clara Clayton
- Buford "Mad Dog" Tannen
- Seamus McFly

**Batman Returns** - 4 missing
- Bruce Wayne / Batman
- The Penguin
- Catwoman
- Max Shreck

---

## 3. Characters ↔ Actors (`portrayed_by`)

### Issue
Some characters have actor names in `properties.portrayed_by` as text strings, but lack actual relationship links to actor entities.

### Characters Needing `portrayed_by` Relationships

| Character | Properties Value | Needs Relationship To |
|-----------|-----------------|----------------------|
| The Joker | `portrayed_by: "Heath Ledger"` | Heath Ledger (`d5c5fcb1-02d2-4c82-9f84-efb89c8a2bd9`) |
| Dom Cobb | Has relationship ✓ | - |

*(Need to audit all 321 character entities for this pattern)*

---

## 4. Movies ↔ Locations

### Issue
Bidirectional gaps in both directions between movies and locations.

### Locations Missing Reverse in Movies (80 instances)

Locations have `featured_in` relationships but target movies lack `features_location` back.

**Sample issues:**
- Courthouse Square → Back to the Future
- Doc Brown's Garage → Back to the Future
- Hill Valley High School → Back to the Future
- Enchantment Under the Sea Dance → Back to the Future
- Wayne Manor → Batman Begins, The Dark Knight
- Arkham Asylum → Batman Begins
- Gotham City → Batman Begins, The Dark Knight, The Dark Knight Rises
- The Limbo → Inception
- Dream Levels → Inception
- Miller's Planet → Interstellar
- Gargantua → Interstellar

**Affected Movies:**
| Movie | Missing `features_location` Count |
|-------|----------------------------------|
| Back to the Future | 8 |
| Back to the Future Part II | 6 |
| Back to the Future Part III | 5 |
| Batman Begins | 3 |
| The Dark Knight | 5 |
| The Dark Knight Rises | 6 |
| The Batman (2022) | 5 |
| Inception | 7 |
| Tenet | 5 |
| Oppenheimer | 3 |
| Interstellar | 2 |
| The Prestige | 2 |

### Movies Missing Reverse in Locations (63 instances)

Movies have `filmed_in` relationships but target locations lack `filming_location_for` back.

**Sample issues:**
- Back to the Future → Courthouse Square (Universal Backlot)
- Back to the Future → Gamble House
- Back to the Future → Los Angeles
- The Dark Knight → Chicago
- The Dark Knight → London
- Inception → Tokyo
- Inception → Paris
- Inception → Los Angeles

---

## 5. Locations ↔ Locations (Containment)

### Issue
Parent locations have `contains` but child locations lack `located_in` back.

### Missing `located_in` Relationships (21 instances)

| Parent Location | Contains | Child Missing `located_in` |
|-----------------|----------|---------------------------|
| Alternate 1985 Hill Valley | Biff Tannen's Pleasure Paradise | ✗ |
| Alternate 1985 Hill Valley | Courthouse Square | ✗ |
| Discworld (World) | Death's Domain | ✗ |
| Gotham City (Burton) | Wayne Manor | ✗ |
| Gotham City (Reeves) | Wayne Tower | ✗ |
| Hill Valley | Lou's Cafe | ✗ |
| Hill Valley 2015 | Cafe 80's | ✗ |
| Hill Valley 2015 | Courthouse Square | ✗ |
| Hill Valley Festival | Courthouse Square | ✗ |
| Hilldale | McFly Residence | ✗ |
| Los Alamos | Cooper's Farm | ✗ |
| Paris (Monte Cristo) | Château d'If | ✗ |
| Paris (Monte Cristo) | Marseille (Monte Cristo) | ✗ |
| Shreck's Department Store | Gotham Plaza | ✗ |
| Surrey (Speckled Band) | Stoke Moran Manor | ✗ |
| Tallinn | Freeport | ✗ |
| The Narrows | Arkham Asylum | ✗ |
| The Sprawl | Chiba City | ✗ |

---

## 6. Books ↔ Authors

### Issue
Many books lack author relationships entirely, or have them but authors lack reverse `wrote` relationships.

### Books with NO Author Relationship

| Book | Should Have Author |
|------|-------------------|
| Foundation and Empire | Isaac Asimov |
| From Russia with Love | Ian Fleming |
| Goldfinger (Novel) | Ian Fleming |
| Mona Lisa Overdrive | William Gibson |
| Smiley's People | John le Carré |
| The Adventure of the Speckled Band | Arthur Conan Doyle |
| The Hound of the Baskervilles | Arthur Conan Doyle |
| The Hobbit | J.R.R. Tolkien |
| The Return of the King | J.R.R. Tolkien |
| The Two Towers | J.R.R. Tolkien |

### Books with Author but Missing Reverse

| Book | Has `author`/`written_by` To | Author Missing `wrote` |
|------|-----------------------------|-----------------------|
| A Study in Scarlet | Arthur Conan Doyle | ✗ |
| Casino Royale (Novel) | Ian Fleming | ✗ |
| Creative Selection | Ken Kocienda | ✗ |
| Foundation | Isaac Asimov | ✗ |
| Neuromancer | William Gibson | ✗ |
| The Count of Monte Cristo | Alexandre Dumas | ✗ |
| The Fellowship of the Ring | J.R.R. Tolkien | ✗ |
| The Godfather | Mario Puzo | ✗ |
| The Last Continent | Terry Pratchett | ✗ |
| The Lies of Locke Lamora | Scott Lynch | ✗ |
| The Light Fantastic | Terry Pratchett | ✗ |
| Tinker, Tailor, Soldier, Spy | John le Carré | ✗ |

### Inconsistent Relationship Types

Books use inconsistent relationship types for author:
- `author` (most common)
- `written_by` (some books)
- `author_of` (incorrect - this is the reverse)

**Recommendation:** Standardize on `author` for books, `wrote` for authors.

---

## 7. Books ↔ Franchises

### Issue
Incomplete franchise membership - some books in a series have `part_of_franchise` while others don't, and franchises don't always have `includes_book` for all their books.

### Missing Book → Franchise Relationships

| Book | Should Be `part_of_franchise` |
|------|------------------------------|
| Mona Lisa Overdrive | Sprawl Trilogy |
| The Godfather | The Godfather Trilogy |
| The Hobbit | Middle-earth |
| The Return of the King | The Lord of the Rings |
| The Two Towers | The Lord of the Rings |
| Smiley's People | Karla Trilogy |
| Foundation and Empire | Foundation Series |

### Missing Franchise → Book Relationships

| Franchise | Missing `includes_book` |
|-----------|------------------------|
| The Lord of the Rings | The Two Towers, The Return of the King |
| Sprawl Trilogy | Mona Lisa Overdrive |
| Foundation Series | Foundation and Empire |
| Karla Trilogy | Smiley's People, The Honourable Schoolboy |
| The Godfather Trilogy | The Godfather (book) |

### Franchises with Empty Relationships

| Franchise | Issue |
|-----------|-------|
| The Godfather Trilogy | `relationships: []` (completely empty) |

---

## 8. Companies ↔ Movies

### Issue
Movies use `produced_by_company` and `distributed_by` but companies either have empty relationship arrays or use inconsistent reverse types.

### Companies with Empty Relationship Arrays

| Company | UUID | Expected Relationships |
|---------|------|----------------------|
| Paramount Pictures | `cfd6390e-46e1-48a5-bfdd-080d7f4a6a36` | Should have `produced` → The Godfather films |
| Alfran Productions | `3a7cb9f9-5f0f-4451-b84d-95d4f415c2b5` | Should have `produced` → The Godfather trilogy |
| Amblin Entertainment | - | Should have `produced` → Back to the Future trilogy |

### Relationship Type Mismatch

| Entity Type | Uses | Expected Reverse |
|-------------|------|-----------------|
| Movies | `produced_by_company` | → |
| Companies | `produced` | (asymmetric naming) |
| Movies | `distributed_by` | → |
| Companies | `distributed` | (asymmetric naming) |

### Movies Missing Company Reverse Relationships

| Movie | Company | Relationship | Company Has Reverse? |
|-------|---------|--------------|---------------------|
| Back to the Future | Amblin Entertainment | `produced_by_company` | NO |
| Back to the Future Part II | Amblin Entertainment | `produced_by_company` | NO |
| Back to the Future Part III | Amblin Entertainment | `produced_by_company` | NO |
| Inception | Syncopy | `produced_by_company` | Uses `produced` |
| Inception | Legendary Pictures | `produced_by_company` | Uses `produced` |
| Batman Begins | Syncopy | `produced_by_company` | Uses `produced` |
| Batman Begins | Legendary Pictures | `produced_by_company` | Uses `produced` |
| Batman Begins | Warner Bros | `produced_by_company` | Uses `produced` |
| The Dark Knight | DC Comics | `produced_by_company` | NO |
| Oppenheimer | Universal | `distributed_by` | Uses `distributed` |

---

## 9. Data Errors

### Incorrect Relationships Found

| Entity | File | Error | Fix |
|--------|------|-------|-----|
| Hans Zimmer | `hans-zimmer.json` | Has `acted_in` → The Dark Knight | Remove (he composed, didn't act) |
| Heath Ledger | `heath-ledger.json` | Has `acted_in` → Batman Begins (`fc1e827c...`) | Remove (he was in The Dark Knight, not Batman Begins) |

### Malformed UUIDs

Two entities have IDs containing invalid hexadecimal characters (g, h, i, j, k instead of only 0-9, a-f):

| Entity | File | Malformed ID | Referencing Entities |
|--------|------|--------------|---------------------|
| Alexandre Dumas | `alexandre-dumas.json` | `f1b2c3d4-e5f6-7890-abcdefghijk1` | the-count-of-monte-cristo.json, lothl-rien.json, rivendell.json, mordor.json, moria.json |
| Chicago | `chicago.json` | `2f4b5c6d-7e8f-9a0b-1c2d-3e4f5g6h7i8j` | the-dark-knight.json, batman-1989.json, the-dark-knight-rises.json, chicago-post-office.json, united-states.json, heinz-field.json |

**Note:** The LOTR locations (Lothlórien, Rivendell, Mordor, Moria) pointing to Alexandre Dumas's UUID is clearly a copy-paste error - they should point to a Middle-earth location entity.

**Note:** Heinz Field is in Pittsburgh, not Chicago - this is a data error beyond just the malformed UUID.

### Text String Instead of UUID

| Entity | File | Field | Value | Fix |
|--------|------|-------|-------|-----|
| Papal Assassination Plot | `papal-assassination-plot.json` | `properties.target` | `"Pope John Paul I"` (text) | Should be UUID reference |

---

## Canonical Relationship Types

For consistency, use these standardized relationship types:

| Entity A Type | Relationship | Entity B Type | Reverse Relationship |
|---------------|--------------|---------------|---------------------|
| movie | `directed_by` | person | `directed` |
| movie | `written_by` | person | `wrote` |
| movie | `stars` | person | `starred_in` |
| movie | `composed_by` | person | `composed` |
| movie | `features_character` | character | `appears_in` |
| movie | `features_location` | location | `featured_in` |
| movie | `filmed_in` | location | `filming_location_for` |
| movie | `produced_by_company` | company | `produced` |
| movie | `distributed_by` | company | `distributed` |
| movie | `part_of` | franchise | `includes` |
| character | `portrayed_by` | person | `portrays` |
| character | `appears_in` | movie | `features_character` |
| location | `located_in` | location | `contains` |
| location | `featured_in` | movie | `features_location` |
| book | `author` | person | `wrote` |
| book | `part_of_franchise` | franchise | `includes_book` |
| franchise | `created_by` | person | `created` |
| franchise | `includes_book` | book | `part_of_franchise` |
| company | `produced` | movie | `produced_by_company` |
| organization | `led_by` | person | `leads` |
| organization | `employs` | person | `works_for` |

---

## 10. Alias Improvements

Per indexer feedback, aliases should include short forms, abbreviations, and alternate titles to improve search matching.

### Movies Needing Alias Additions

| Movie | Current Aliases | Suggested Additions |
|-------|-----------------|---------------------|
| Interstellar | *(none)* | "Interstellar: The IMAX Experience" |
| Batman Begins | "The Dark Knight: Batman Begins" | "BB" |
| The Dark Knight | "TDK", "Batman: The Dark Knight" | *(good)* |
| The Dark Knight Rises | *(check)* | "TDKR" |
| Back to the Future | *(check)* | "BTTF", "Back to the Future: The IMAX Experience" |
| Back to the Future Part II | *(check)* | "BTTF2", "BTTF II" |
| Back to the Future Part III | *(check)* | "BTTF3", "BTTF III" |

### People Needing Alias Additions

| Person | Current Aliases | Suggested Additions |
|--------|-----------------|---------------------|
| Christopher Nolan | "Chris Nolan" | "Nolan" |
| Leonardo DiCaprio | "Leo DiCaprio", "Leonardo Wilhelm DiCaprio" | "Leo", "DiCaprio" |
| Matthew McConaughey | "Matthew David McConaughey" | "McConaughey" |
| Christian Bale | "Christian Charles Philip Bale" | "Bale" |

### Characters Needing Alias Additions

| Character | Current Aliases | Suggested Additions |
|-----------|-----------------|---------------------|
| The Joker | "Clown Prince of Crime", "Harlequin of Hate", "Jester of Genocide" | "Joker" |
| Dom Cobb | "Mr. Cobb" | "Cobb", "The Extractor" |

---

## Priority Order for Fixes

Based on indexer feedback, prioritize fixes in this order:

### Priority 1: Data Errors (Critical)
- Fix malformed UUIDs (Alexandre Dumas, Chicago)
- Fix incorrect LOTR location references (should point to Middle-earth, not Alexandre Dumas)
- Remove incorrect relationships (Hans Zimmer `acted_in`, Heath Ledger Batman Begins)
- Fix Heinz Field location (Pittsburgh, not Chicago)

### Priority 2: Missing Bidirectional Relationships (High Impact)
- Add `starred_in` to all actors referenced by movies via `stars`
- Add `directed` to all directors referenced by movies via `directed_by`
- Add `features_character` to movies for all characters with `appears_in`
- Add `portrayed_by` to characters (not just in properties)

### Priority 3: Standardize Relationship Types (Medium Impact)
- Migrate `acted_in` → `starred_in` for consistency
- Migrate `featured_in` → `starred_in` for actors
- Migrate `composed_for` → `composed` for consistency
- Ensure all relationship pairs use canonical vocabulary

### Priority 4: Add Missing Relationships (Medium Impact)
- Add author relationships to books that only have author in properties
- Add franchise relationships to books missing `part_of_franchise`
- Add `includes_book` to franchises for all member books
- Populate empty company relationship arrays

### Priority 5: Improve Aliases (Lower Impact)
- Add short forms and abbreviations
- Add alternate titles

---

## Summary Statistics

| Metric | Count |
|--------|-------|
| Total entities | 913 |
| Movie entities | 18 |
| Person entities | 132 |
| Character entities | 321 |
| Location entities | 241 |
| Book entities | 36 |
| Franchise entities | 14 |
| Company entities | 9 |
| Organization entities | 51 |
| Missing relationships (estimated) | ~530 |
| Files needing modification | ~200 |
| Malformed UUIDs | 2 |
| Incorrect relationships | 2 |
| Data errors (copy-paste) | 4+ LOTR locations |
