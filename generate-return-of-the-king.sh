#!/bin/bash

# The Return of the King - Entity Generation Script

set -e

echo "=== Generating The Return of the King entities ==="

# 1. Book
echo ""
echo "--- Book ---"
npm run generate -- book "The Return of the King"

# 2. Characters (new or prominent in this book)
echo ""
echo "--- Characters ---"
npm run generate -- character "Denethor" "The Return of the King"
npm run generate -- character "The Witch-king of Angmar" "The Return of the King"
npm run generate -- character "Mouth of Sauron" "The Return of the King"

# 3. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Minas Tirith" "The Return of the King"
npm run generate -- location "Minas Morgul" "The Return of the King"
npm run generate -- location "Pelennor Fields" "The Return of the King"
npm run generate -- location "The Black Gate" "The Return of the King"
npm run generate -- location "The Grey Havens" "The Return of the King"

# 4. Items
echo ""
echo "--- Items ---"
npm run generate -- item "Phial of Galadriel" "The Return of the King"
npm run generate -- item "The White Tree of Gondor" "The Return of the King"

# 5. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "Gondor" "The Return of the King"
npm run generate -- organization "Army of the Dead" "The Return of the King"

# 6. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
