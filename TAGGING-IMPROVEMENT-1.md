# Entity Generation Prompt

You are generating metadata for a knowledge base of entertainment entities (movies, books, characters, people, and locations). Each entity requires both **facets** (structured, filterable metadata) and **tags** (freeform associative concepts for discovery).

---

## Entity Structure

```json
{
  "name": "Display Name",
  "type": "movie|book|character|person|location",
  "description": "Brief description...",
  "facets": {
    "genre": [],
    "era": "",
    "tone": [],
    "content-rating": ""
  },
  "tags": []
}
```

---

## Facets (Structured Metadata)

Facets are **controlled vocabulary** fields used for filtering and faceted search. Use ONLY the values listed below.

### genre (select 1-3)
Primary content classification:
- `sci-fi` — science fiction, futuristic technology, space
- `fantasy` — magic, mythical creatures, secondary worlds
- `drama` — character-driven, emotional, realistic conflict
- `thriller` — suspense, tension, stakes-driven plot
- `horror` — fear, dread, supernatural or psychological terror
- `comedy` — humor-focused, lighthearted
- `romance` — love and relationships as central focus
- `action` — physical conflict, chase sequences, spectacle
- `mystery` — puzzle-solving, whodunit, investigation
- `documentary` — non-fiction, real events
- `western` — American frontier setting and themes
- `crime` — criminal activity, law enforcement, underworld
- `adventure` — journey, exploration, quest narrative
- `animation` — animated medium (combine with other genres)
- `musical` — songs integral to narrative
- `war` — armed conflict as central subject

### era (select 1)
Time period of setting OR release, whichever is more defining:
- `ancient` — prehistory through fall of Rome (~500 CE)
- `medieval` — ~500-1450 CE
- `renaissance` — ~1450-1650 CE
- `colonial` — ~1600-1800 CE
- `victorian` — ~1837-1901
- `early-20th-century` — 1900-1945
- `mid-century` — 1946-1969
- `1970s`
- `1980s`
- `1990s`
- `2000s`
- `2010s`
- `2020s`
- `near-future` — recognizable world with advanced tech
- `far-future` — distant future, unrecognizable world
- `timeless` — no specific era, fairy tale, or mythic time

### tone (select 1-3)
Emotional register and style:
- `dark` — bleak, heavy, pessimistic
- `light` — upbeat, optimistic, warm
- `serious` — weighty themes treated earnestly
- `comedic` — humorous approach even to serious topics
- `philosophical` — explores ideas, meaning, existence
- `action-driven` — pacing and spectacle prioritized
- `character-driven` — internal arcs prioritized
- `atmospheric` — mood and setting emphasized
- `satirical` — ironic social commentary
- `whimsical` — playful, fanciful, quirky
- `gritty` — raw, realistic, unflinching
- `suspenseful` — tension and uncertainty sustained
- `heartfelt` — emotionally sincere, sentimental
- `cerebral` — intellectually demanding, puzzle-like

### content-rating (select 1)
Audience appropriateness:
- `family` — suitable for all ages
- `teen` — some mature themes, PG-13 equivalent
- `mature` — adult themes, violence, or content

---

## Entity-Specific Facets

**For type: `person`**
```json
"facets": {
  "profession": [],
  "active-era": "",
  "nationality": ""
}
```
- `profession`: actor, director, writer, composer, producer, cinematographer, author, playwright
- `active-era`: use era values above
- `nationality`: lowercase country name (american, british, japanese, etc.)

**For type: `character`**
```json
"facets": {
  "role": "",
  "morality": "",
  "archetype": ""
}
```
- `role`: protagonist, antagonist, deuteragonist, supporting, minor
- `morality`: heroic, villainous, antihero, morally-ambiguous, neutral
- `archetype`: mentor, trickster, everyman, rebel, caregiver, explorer, ruler, creator, innocent, sage, magician, outlaw, lover, jester

**For type: `location`**
```json
"facets": {
  "location-type": "",
  "reality": "",
  "scale": ""
}
```
- `location-type`: city, country, building, landscape, planet, region, fictional-world
- `reality`: real, fictional, semi-fictional
- `scale`: room, building, neighborhood, city, region, country, continent, planet, universe

---

## Tags (Freeform Discovery Concepts)

Tags capture associative concepts, themes, aesthetics, and distinctive elements that help users discover related content. They complement facets—don't duplicate them.

### Formatting Rules

| Rule | Correct | Incorrect |
|------|---------|-----------|
| All lowercase | `time-travel` | `Time-Travel` |
| Hyphenate compounds | `coming-of-age` | `coming of age` |
| Hyphenate proper nouns | `middle-earth` | `Middle-earth` |
| Use singular form | `robot` | `robots` |
| No leading articles | `matrix` | `the-matrix` |
| Expand abbreviations | `science-fiction` | `sf` (but keep `wwii`) |

### What Makes a Good Tag?

**DO tag:**
- Themes: `redemption`, `identity`, `class-conflict`, `grief`, `obsession`
- Aesthetics: `cyberpunk`, `noir`, `gothic`, `neon`, `pastoral`
- Distinctive elements: `heist`, `time-loop`, `unreliable-narrator`, `ensemble-cast`
- Subject matter: `artificial-intelligence`, `organized-crime`, `space-exploration`
- Emotional experience: `mind-bending`, `tear-jerker`, `slow-burn`
- Setting vibes: `urban-decay`, `small-town`, `dystopia`, `utopia`
- Franchise/universe: `middle-earth`, `star-wars`, `marvel-cinematic-universe`
- Influences/comparisons: `kafkaesque`, `lynchian`, `hitchcockian`

**DON'T tag:**
- Things covered by facets (don't tag `1980s` if era facet says `1980s`)
- Obvious type attributes (don't tag `film` for movies)
- Vague qualifiers (`good`, `interesting`, `classic`)
- Plot spoilers (`twist-ending` is okay; `villain-was-hero` is not)

### Tag Count
- Generate **5-8 tags** per entity
- Prioritize specificity over quantity
- Every tag should help someone discover this entity

---

## Complete Examples

### Movie Example
```json
{
  "name": "Blade Runner",
  "type": "movie",
  "description": "A blade runner must pursue and terminate four replicants who have escaped to Earth seeking their creator.",
  "facets": {
    "genre": ["sci-fi", "thriller"],
    "era": "1980s",
    "tone": ["dark", "philosophical", "atmospheric"],
    "content-rating": "mature"
  },
  "tags": [
    "cyberpunk",
    "artificial-intelligence",
    "identity",
    "dystopia",
    "replicant",
    "neo-noir",
    "rain-soaked",
    "existentialism"
  ]
}
```

### Character Example
```json
{
  "name": "Gandalf",
  "type": "character",
  "description": "A wizard who guides the Free Peoples of Middle-earth in their struggle against Sauron.",
  "facets": {
    "role": "deuteragonist",
    "morality": "heroic",
    "archetype": "mentor"
  },
  "tags": [
    "wizard",
    "middle-earth",
    "immortal",
    "pipe-smoker",
    "wanderer",
    "divine-being",
    "fellowship"
  ]
}
```

### Person Example
```json
{
  "name": "Christopher Nolan",
  "type": "person",
  "description": "British-American filmmaker known for complex narratives and large-scale productions.",
  "facets": {
    "profession": ["director", "writer", "producer"],
    "active-era": "2000s",
    "nationality": "british-american"
  },
  "tags": [
    "nonlinear-narrative",
    "practical-effects",
    "imax",
    "time-manipulation",
    "cerebral",
    "blockbuster-auteur"
  ]
}
```

### Location Example
```json
{
  "name": "Gotham City",
  "type": "location",
  "description": "A dark, crime-ridden metropolis and home of Batman.",
  "facets": {
    "location-type": "city",
    "reality": "fictional",
    "scale": "city"
  },
  "tags": [
    "dc-universe",
    "urban-decay",
    "crime-capital",
    "art-deco",
    "gothic-architecture",
    "corruption",
    "batman"
  ]
}
```

### Book Example
```json
{
  "name": "1984",
  "type": "book",
  "description": "A dystopian novel about totalitarian surveillance and the destruction of truth.",
  "facets": {
    "genre": ["sci-fi", "drama"],
    "era": "mid-century",
    "tone": ["dark", "philosophical", "gritty"],
    "content-rating": "mature"
  },
  "tags": [
    "dystopia",
    "totalitarianism",
    "surveillance",
    "propaganda",
    "thoughtcrime",
    "doublespeak",
    "cautionary-tale",
    "orwellian"
  ]
}
```

---

## Pre-Submission Checklist

Before finalizing an entity, verify:

- [ ] All facet values are from the controlled vocabulary above
- [ ] Tags follow formatting rules (lowercase, hyphenated, singular)
- [ ] Tags don't duplicate information already in facets
- [ ] 5-8 tags provided, each adding discovery value
- [ ] No spoilers in tags or description
- [ ] Entity type matches the appropriate facet schema
- [ ] Description is concise (1-2 sentences) and spoiler-free