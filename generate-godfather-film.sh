#!/bin/bash

# The Godfather (1972 Film) - Entity Generation Script

set -e

echo "=== Generating The Godfather (Film) entities ==="

# 1. Franchise
echo ""
echo "--- Franchise ---"
npm run generate -- franchise "The Godfather Trilogy"

# 2. People
echo ""
echo "--- People ---"
npm run generate -- person "Francis Ford Coppola" "director"
npm run generate -- person "Marlon Brando" "actor"
npm run generate -- person "Al Pacino" "actor"
npm run generate -- person "James Caan" "actor"
npm run generate -- person "Robert Duvall" "actor"
npm run generate -- person "Diane Keaton" "actor"
npm run generate -- person "Talia Shire" "actor"
npm run generate -- person "John Cazale" "actor"
npm run generate -- person "Richard Castellano" "actor"
npm run generate -- person "Sterling Hayden" "actor"
npm run generate -- person "Al Lettieri" "actor"
npm run generate -- person "Nino Rota" "composer"
npm run generate -- person "Gordon Willis" "cinematographer"

# 3. Movie
echo ""
echo "--- Movie ---"
npm run generate -- movie "The Godfather (Film)"

# 4. Film Characters (actors' portrayals)
echo ""
echo "--- Film Characters ---"
npm run generate -- character "Vito Corleone (Brando)" "The Godfather (Film)"
npm run generate -- character "Michael Corleone (Pacino)" "The Godfather (Film)"
npm run generate -- character "Sonny Corleone (Caan)" "The Godfather (Film)"
npm run generate -- character "Tom Hagen (Duvall)" "The Godfather (Film)"
npm run generate -- character "Fredo Corleone (Cazale)" "The Godfather (Film)"
npm run generate -- character "Apollonia Vitelli" "The Godfather (Film)"
npm run generate -- character "Moe Greene" "The Godfather (Film)"

# 5. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Staten Island"
npm run generate -- filming-location "Sicily, Italy"
npm run generate -- filming-location "Filmways Studios"

# 6. Companies
echo ""
echo "--- Companies ---"
npm run generate -- company "Paramount Pictures"
npm run generate -- company "Alfran Productions"

# 7. Items
echo ""
echo "--- Items ---"
npm run generate -- item "The Godfather Theme (Speak Softly Love)" "The Godfather (Film)"

# 8. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
