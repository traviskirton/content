#!/bin/bash

# The Two Towers - Entity Generation Script

set -e

echo "=== Generating The Two Towers entities ==="

# 1. Book
echo ""
echo "--- Book ---"
npm run generate -- book "The Two Towers"

# 2. Characters (new or prominent in this book)
echo ""
echo "--- Characters ---"
npm run generate -- character "Gollum" "The Two Towers"
npm run generate -- character "Treebeard" "The Two Towers"
npm run generate -- character "Éomer" "The Two Towers"
npm run generate -- character "Éowyn" "The Two Towers"
npm run generate -- character "Théoden" "The Two Towers"
npm run generate -- character "Wormtongue" "The Two Towers"
npm run generate -- character "Faramir" "The Two Towers"
npm run generate -- character "Shelob" "The Two Towers"

# 3. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Isengard" "The Two Towers"
npm run generate -- location "Fangorn Forest" "The Two Towers"
npm run generate -- location "Rohan" "The Two Towers"
npm run generate -- location "Helm's Deep" "The Two Towers"
npm run generate -- location "Edoras" "The Two Towers"
npm run generate -- location "Osgiliath" "The Two Towers"
npm run generate -- location "Cirith Ungol" "The Two Towers"

# 4. Items
echo ""
echo "--- Items ---"
npm run generate -- item "Palantír" "The Two Towers"

# 5. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "The Ents" "The Two Towers"
npm run generate -- organization "Rohirrim" "The Two Towers"

# 6. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
