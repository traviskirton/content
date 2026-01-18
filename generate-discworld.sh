#!/bin/bash

# Discworld by Terry Pratchett - Entity Generation Script
# The Light Fantastic, Mort, The Last Continent

set -e

echo "=== Generating Discworld entities ==="

# 1. Author
echo ""
echo "--- Author ---"
npm run generate -- author "Terry Pratchett"

# 2. Franchise
echo ""
echo "--- Franchise ---"
npm run generate -- franchise "Discworld"

# 3. Books
echo ""
echo "--- Books ---"
npm run generate -- book "The Light Fantastic"
npm run generate -- book "Mort"
npm run generate -- book "The Last Continent"

# 4. Characters
echo ""
echo "--- Characters ---"
# Core recurring characters
npm run generate -- character "Rincewind" "Discworld"
npm run generate -- character "The Luggage" "Discworld"
npm run generate -- character "Death (Discworld)" "Discworld"
npm run generate -- character "Twoflower" "The Light Fantastic"

# Mort characters
npm run generate -- character "Mort" "Mort"
npm run generate -- character "Ysabell" "Mort"
npm run generate -- character "Albert (Discworld)" "Mort"
npm run generate -- character "Princess Keli" "Mort"

# The Last Continent characters
npm run generate -- character "The Librarian" "Discworld"
npm run generate -- character "Archchancellor Ridcully" "Discworld"
npm run generate -- character "Ponder Stibbons" "Discworld"

# 5. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Discworld (World)" "Discworld"
npm run generate -- location "Ankh-Morpork" "Discworld"
npm run generate -- location "Unseen University" "Discworld"
npm run generate -- location "Death's Domain" "Mort"
npm run generate -- location "EcksEcksEcksEcks" "The Last Continent"
npm run generate -- location "The Dungeon Dimensions" "The Light Fantastic"

# 6. Items
echo ""
echo "--- Items ---"
npm run generate -- item "The Octavo" "The Light Fantastic"
npm run generate -- item "Death's Scythe" "Mort"
npm run generate -- item "Death's Hourglass" "Mort"

# 7. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "Unseen University (Organization)" "Discworld"
npm run generate -- organization "The Wizards" "Discworld"

# 8. Concepts/Creatures
echo ""
echo "--- Creatures ---"
npm run generate -- character "Great A'Tuin" "Discworld"
npm run generate -- character "The Four Elephants" "Discworld"

# 9. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
