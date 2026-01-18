# Entity Generation Prompt

You are generating structured metadata for an entertainment knowledge base. Each entity has **facets** (controlled vocabulary for filtering) and **tags** (freeform concepts for discovery).

---

## Schema

```json
{
  "name": "Display Name",
  "type": "movie|book|character|person|location",
  "description": "1-2 sentence spoiler-free description.",
  "facets": { },
  "tags": []
}
```

---

## Facets by Entity Type

Facets use **controlled vocabulary only**. Use the exact values listed.

### All Content Types (movie, book)

| Facet | Type | Values |
|-------|------|--------|
| `genre` | array, 1-3 | `sci-fi`, `fantasy`, `drama`, `thriller`, `horror`, `comedy`, `romance`, `action`, `mystery`, `crime`, `adventure`, `western`, `war`, `musical`, `animation`, `documentary` |
| `era` | string | `ancient`, `medieval`, `renaissance`, `victorian`, `early-20th-century`, `mid-century`, `1970s`, `1980s`, `1990s`, `2000s`, `2010s`, `2020s`, `near-future`, `far-future`, `timeless` |
| `tone` | array, 1-3 | `dark`, `light`, `serious`, `comedic`, `philosophical`, `cerebral`, `atmospheric`, `suspenseful`, `gritty`, `whimsical`, `satirical`, `heartfelt`, `action-driven`, `character-driven` |
| `rating` | string | `family`, `teen`, `mature` |

### Person

| Facet | Type | Values |
|-------|------|--------|
| `profession` | array, 1-3 | `actor`, `director`, `writer`, `producer`, `composer`, `cinematographer`, `author`, `playwright`, `showrunner` |
| `active-era` | string | Same as `era` above |
| `nationality` | string | Lowercase demonym: `american`, `british`, `french`, `japanese`, etc. Use `british-american` for dual |

### Character

| Facet | Type | Values |
|-------|------|--------|
| `role` | string | `protagonist`, `antagonist`, `deuteragonist`, `supporting`, `minor` |
| `morality` | string | `heroic`, `villainous`, `antihero`, `ambiguous`, `neutral` |
| `archetype` | string | `mentor`, `trickster`, `everyman`, `rebel`, `caregiver`, `explorer`, `ruler`, `creator`, `innocent`, `sage`, `outlaw`, `lover`, `jester`, `warrior`, `mastermind` |

### Location

| Facet | Type | Values |
|-------|------|--------|
| `location-type` | string | `city`, `country`, `building`, `landscape`, `planet`, `region`, `realm`, `structure` |
| `reality` | string | `real`, `fictional`, `semi-fictional` |
| `scale` | string | `room`, `building`, `neighborhood`, `city`, `region`, `country`, `continent`, `planet`, `universe` |

---

## Tags

Tags are freeform but normalized. They capture themes, aesthetics, and distinctive elements that help discovery.

### Formatting Rules

- **lowercase** always: `time-travel` not `Time-Travel`
- **kebab-case** for compounds: `coming-of-age` not `coming of age`
- **singular** form: `robot` not `robots`
- **no articles**: `matrix` not `the-matrix`
- **ascii only**: `naive` not `naïve`

### What to Tag

| Category | Examples |
|----------|----------|
| Themes | `redemption`, `identity`, `grief`, `obsession`, `class-conflict`, `paranoia` |
| Aesthetics | `cyberpunk`, `noir`, `gothic`, `neon`, `pastoral`, `brutalist`, `retro-futurism` |
| Narrative devices | `heist`, `time-loop`, `unreliable-narrator`, `ensemble-cast`, `nonlinear`, `frame-story` |
| Subject matter | `artificial-intelligence`, `organized-crime`, `space-exploration`, `courtroom`, `pandemic` |
| Emotional experience | `mind-bending`, `tear-jerker`, `slow-burn`, `crowd-pleaser`, `fever-dream` |
| Setting flavor | `urban-decay`, `small-town`, `dystopia`, `utopia`, `claustrophobic`, `sprawling` |
| Franchise/universe | `middle-earth`, `star-wars`, `dc-universe`, `foundation-universe` |
| Influences | `kafkaesque`, `lynchian`, `hitchcockian`, `spielbergian` |

### What NOT to Tag

- Anything already in facets (don't tag `sci-fi` if `genre: ["sci-fi"]`)
- Obvious type info (`film`, `novel`, `character`)
- Vague qualifiers (`good`, `classic`, `interesting`)
- Spoilers (`twist-ending` is fine; `protagonist-dies` is not)

### Tag Count

**5-10 tags per entity.** Every tag should help someone discover this entity who didn't know they were looking for it.

---

## Examples

### Movie

```json
{
  "name": "Blade Runner",
  "type": "movie",
  "description": "A blade runner hunts four escaped replicants in a rain-soaked future Los Angeles.",
  "facets": {
    "genre": ["sci-fi", "thriller"],
    "era": "near-future",
    "tone": ["dark", "philosophical", "atmospheric"],
    "rating": "mature"
  },
  "tags": [
    "cyberpunk",
    "artificial-intelligence",
    "identity",
    "neo-noir",
    "dystopia",
    "existentialism",
    "replicant",
    "los-angeles"
  ]
}
```

### Book

```json
{
  "name": "Neuromancer",
  "type": "book",
  "description": "A washed-up hacker is recruited for one last job in a world of corporate espionage and artificial intelligence.",
  "facets": {
    "genre": ["sci-fi", "thriller"],
    "era": "near-future",
    "tone": ["dark", "atmospheric", "cerebral"],
    "rating": "mature"
  },
  "tags": [
    "cyberpunk",
    "hacking",
    "artificial-intelligence",
    "cyberspace",
    "corporate-dystopia",
    "sprawl-trilogy",
    "heist",
    "drug-culture"
  ]
}
```

### Person

```json
{
  "name": "Christopher Nolan",
  "type": "person",
  "description": "British-American filmmaker known for complex narratives and large-scale practical filmmaking.",
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
    "blockbuster-auteur",
    "puzzle-box"
  ]
}
```

### Character

```json
{
  "name": "The Joker",
  "type": "character",
  "description": "Batman's arch-nemesis, an agent of chaos with no clear origin or motive beyond destruction.",
  "facets": {
    "role": "antagonist",
    "morality": "villainous",
    "archetype": "trickster"
  },
  "tags": [
    "dc-universe",
    "chaos",
    "clown",
    "gotham",
    "nihilism",
    "criminal-mastermind",
    "theatrical",
    "unreliable-origin"
  ]
}
```

### Location

```json
{
  "name": "Gotham City",
  "type": "location",
  "description": "A perpetually dark, crime-ridden American metropolis and home of Batman.",
  "facets": {
    "location-type": "city",
    "reality": "fictional",
    "scale": "city"
  },
  "tags": [
    "dc-universe",
    "urban-decay",
    "crime-capital",
    "gothic-architecture",
    "art-deco",
    "corruption",
    "batman",
    "noir"
  ]
}
```

---

## Validation Checklist

Before finalizing:

- [ ] `type` matches the facets used (person facets for person, etc.)
- [ ] All facet values are from the controlled vocabulary
- [ ] Tags are lowercase, kebab-case, singular, no articles
- [ ] Tags don't duplicate facets
- [ ] 5-10 tags, each adding discovery value
- [ ] Description is 1-2 sentences, spoiler-free
- [ ] No spoilers in tags
