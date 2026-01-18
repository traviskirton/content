#!/bin/bash

# Oppenheimer - Entity Generation Script
# Run from the content directory: ./generate-oppenheimer.sh

set -e

echo "=== Generating Oppenheimer entities ==="

# 1. People
echo ""
echo "--- People ---"
npm run generate -- person "Cillian Murphy" "actor"
npm run generate -- person "Emily Blunt" "actor"
npm run generate -- person "Robert Downey Jr." "actor"
npm run generate -- person "Florence Pugh" "actor"
npm run generate -- person "Josh Hartnett" "actor"
npm run generate -- person "Rami Malek" "actor"
npm run generate -- person "Kenneth Branagh" "actor"
npm run generate -- person "Benny Safdie" "actor"
npm run generate -- person "Jason Clarke" "actor"
npm run generate -- person "Dylan Arnold" "actor"
npm run generate -- person "David Krumholtz" "actor"
npm run generate -- person "Alden Ehrenreich" "actor"

# 2. Movie
echo ""
echo "--- Movie ---"
npm run generate -- movie "Oppenheimer"

# 3. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "J. Robert Oppenheimer" "Oppenheimer"
npm run generate -- character "Kitty Oppenheimer" "Oppenheimer"
npm run generate -- character "Lewis Strauss" "Oppenheimer"
npm run generate -- character "Jean Tatlock" "Oppenheimer"
npm run generate -- character "General Leslie Groves" "Oppenheimer"
npm run generate -- character "Ernest Lawrence" "Oppenheimer"
npm run generate -- character "Edward Teller" "Oppenheimer"
npm run generate -- character "Isidor Isaac Rabi" "Oppenheimer"
npm run generate -- character "Niels Bohr" "Oppenheimer"
npm run generate -- character "Albert Einstein" "Oppenheimer"

# 4. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Los Alamos" "Oppenheimer"
npm run generate -- location "Trinity Test Site" "Oppenheimer"
npm run generate -- location "Princeton Institute for Advanced Study" "Oppenheimer"
npm run generate -- location "Berkeley" "Oppenheimer"

# 5. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "Manhattan Project" "Oppenheimer"
npm run generate -- organization "Los Alamos Laboratory" "Oppenheimer"
npm run generate -- organization "Atomic Energy Commission" "Oppenheimer"

# 6. Items
echo ""
echo "--- Items ---"
npm run generate -- item "The Gadget" "Oppenheimer"

# 7. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "New Mexico"
npm run generate -- filming-location "Princeton, New Jersey"
npm run generate -- filming-location "Berkeley, California"

# 8. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
