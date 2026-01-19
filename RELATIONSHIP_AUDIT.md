# Relationship Audit Report

Generated: 2026-01-19T01:02:43.540Z

## Statistics

- Total entities: 913
- Total relationships: 3591

### Entities by Type

- character: 321
- location: 241
- person: 132
- item: 91
- organization: 51
- book: 22
- movie: 18
- vehicle: 14
- franchise: 14
- company: 9

### Relationships by Type (top 30)

- `features_character`: 252
- `appears_in`: 245
- `starred_in`: 228
- `contains`: 223
- `located_in`: 219
- `stars`: 203
- `related_to`: 187
- `featured_in`: 178
- `features_location`: 172
- `worked_with`: 171
- `filming_location_for`: 69
- `filmed_in`: 69
- `ally_of`: 47
- `rivals_with`: 46
- `portrays`: 44
- `created_by`: 44
- `portrayed_by`: 44
- `friends_with`: 35
- `used_by`: 35
- `owned_by`: 28
- `associated_with`: 28
- `wrote`: 27
- `written_by`: 27
- `produced`: 26
- `part_of_series`: 26
- `produced_by`: 26
- `member_of`: 25
- `colleague_of`: 24
- `part_of`: 24
- `includes`: 24

## Missing Targets

Found 0 relationships pointing to non-existent entities.

## Non-Canonical Relationship Types

Found 0 relationships using non-standard types.

## Missing Bidirectional Relationships

Found 54 one-way relationships that should have a reverse.

### By Relationship Type

#### starred_in → stars (26)

- Aaron Taylor-Johnson → Smylex (needs `stars` back)
- Anne Hathaway → Axis Chemicals (needs `stars` back)
- Benny Safdie → The Joker (needs `stars` back)
- Christian Bale → Miller's Planet (needs `stars` back)
- Christopher Lloyd → Doc Brown (needs `stars` back)
- Clémence Poésy → Pinewood Studios (needs `stars` back)
- Danny DeVito → Matthew Modine (needs `stars` back)
- David Bowie → Aaron Taylor-Johnson (needs `stars` back)
- Elizabeth Debicki → Sal Maroni (needs `stars` back)
- Elizabeth Debicki → Vicki Vale (needs `stars` back)
- ... and 16 more

#### contains → located_in (8)

- California → Amblin Entertainment (needs `located_in` back)
- California → Legendary Pictures (needs `located_in` back)
- California → Universal Pictures (needs `located_in` back)
- California → Warner Bros. Pictures (needs `located_in` back)
- Gotham City (Reeves) → Joseph Gordon-Levitt (needs `located_in` back)
- United States → Amblin Entertainment (needs `located_in` back)
- United States → DC Comics (needs `located_in` back)
- United States → Syncopy (needs `located_in` back)

#### featured_in → features_location (7)

- 1917 New York → The Godfather (Film) (needs `features_location` back)
- Casino Royale (Location) → Casino Royale (Novel) (needs `features_location` back)
- Cuba (Godfather) → The Godfather (Film) (needs `features_location` back)
- Ellis Island → The Godfather (Film) (needs `features_location` back)
- Hotel Splendide → Casino Royale (Novel) (needs `features_location` back)
- Royale-les-Eaux → Casino Royale (Novel) (needs `features_location` back)
- Senate Hearing Room → The Godfather (Film) (needs `features_location` back)

#### features_character → appears_in (7)

- Casino Royale (Novel) → Hotel Splendide (needs `appears_in` back)
- Casino Royale (Novel) → Casino Royale (Location) (needs `appears_in` back)
- Casino Royale (Novel) → Royale-les-Eaux (needs `appears_in` back)
- The Godfather (Film) → 1917 New York (needs `appears_in` back)
- The Godfather (Film) → Ellis Island (needs `appears_in` back)
- The Godfather (Film) → Senate Hearing Room (needs `appears_in` back)
- The Godfather (Film) → Cuba (Godfather) (needs `appears_in` back)

#### located_in → contains (4)

- Cambridge Circus → Wintermute (needs `contains` back)
- City Dream Level → Interstellar (needs `contains` back)
- The Circus (le Carré) → Robert Angier (needs `contains` back)
- The Safe House (le Carré) → Wintermute (needs `contains` back)

#### stars → starred_in (1)

- Batman → Jack Palance (needs `starred_in` back)

#### features_location → featured_in (1)

- Interstellar → City Dream Level (needs `featured_in` back)

## Actor-Movie Relationship Gaps

Found 0 actors missing `starred_in` relationships for movies that reference them.

