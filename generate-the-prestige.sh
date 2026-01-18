#!/bin/bash

# The Prestige - Entity Generation Script
# Run from the content directory: ./generate-the-prestige.sh

set -e

echo "=== Generating The Prestige entities ==="

# 1. People
echo ""
echo "--- People ---"
npm run generate -- person "Hugh Jackman" "actor"
npm run generate -- person "Christian Bale" "actor"
npm run generate -- person "Scarlett Johansson" "actor"
npm run generate -- person "Michael Caine" "actor"
npm run generate -- person "Piper Perabo" "actor"
npm run generate -- person "Rebecca Hall" "actor"
npm run generate -- person "Andy Serkis" "actor"
npm run generate -- person "David Bowie" "actor"

# 2. Movie
echo ""
echo "--- Movie ---"
npm run generate -- movie "The Prestige"

# 3. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Robert Angier" "The Prestige"
npm run generate -- character "Alfred Borden" "The Prestige"
npm run generate -- character "Olivia Wenscombe" "The Prestige"
npm run generate -- character "Cutter" "The Prestige"
npm run generate -- character "Julia McCullough" "The Prestige"
npm run generate -- character "Sarah Borden" "The Prestige"
npm run generate -- character "Nikola Tesla" "The Prestige"
npm run generate -- character "Alley" "The Prestige"

# 4. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "London (The Prestige)" "The Prestige"
npm run generate -- location "Colorado Springs" "The Prestige"
npm run generate -- location "Angier's Theater" "The Prestige"

# 5. Items
echo ""
echo "--- Items ---"
npm run generate -- item "Tesla Machine" "The Prestige"
npm run generate -- item "Borden's Diary" "The Prestige"
npm run generate -- item "Angier's Journal" "The Prestige"

# 6. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Los Angeles"
npm run generate -- filming-location "London"
npm run generate -- filming-location "Colorado"

# 7. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
