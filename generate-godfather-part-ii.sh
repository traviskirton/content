#!/bin/bash

# The Godfather Part II (1974 Film) - Entity Generation Script

set -e

echo "=== Generating The Godfather Part II entities ==="

# 1. People
echo ""
echo "--- People ---"
npm run generate -- person "Robert De Niro" "actor"
npm run generate -- person "Lee Strasberg" "actor"
npm run generate -- person "Michael V. Gazzo" "actor"
npm run generate -- person "G.D. Spradlin" "actor"
npm run generate -- person "Carmine Coppola" "composer"

# 2. Movie
echo ""
echo "--- Movie ---"
npm run generate -- movie "The Godfather Part II"

# 3. Film Characters
echo ""
echo "--- Film Characters ---"
npm run generate -- character "Young Vito Corleone (De Niro)" "The Godfather Part II"
npm run generate -- character "Don Fanucci" "The Godfather Part II"
npm run generate -- character "Hyman Roth" "The Godfather Part II"
npm run generate -- character "Frankie Pentangeli" "The Godfather Part II"
npm run generate -- character "Senator Pat Geary" "The Godfather Part II"
npm run generate -- character "Johnny Ola" "The Godfather Part II"
npm run generate -- character "Young Clemenza" "The Godfather Part II"
npm run generate -- character "Vito's Mother" "The Godfather Part II"

# 4. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Lake Tahoe Compound" "The Godfather Part II"
npm run generate -- location "Cuba (Godfather)" "The Godfather Part II"
npm run generate -- location "Ellis Island" "The Godfather Part II"
npm run generate -- location "1917 New York" "The Godfather Part II"
npm run generate -- location "Senate Hearing Room" "The Godfather Part II"

# 5. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Lake Tahoe"
npm run generate -- filming-location "Santo Domingo"
npm run generate -- filming-location "Little Italy, New York"

# 6. Items/Events
echo ""
echo "--- Items ---"
npm run generate -- item "First Communion Party" "The Godfather Part II"
npm run generate -- item "Senate Hearings on Organized Crime" "The Godfather Part II"

# 7. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
