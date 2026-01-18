#!/bin/bash

# The Fellowship of the Ring - Entity Generation Script

set -e

echo "=== Generating The Fellowship of the Ring entities ==="

# 1. Author
echo ""
echo "--- Author ---"
npm run generate -- author "J.R.R. Tolkien"

# 2. Franchise
echo ""
echo "--- Franchise ---"
npm run generate -- franchise "Middle-earth"
npm run generate -- franchise "The Lord of the Rings"

# 3. Book
echo ""
echo "--- Book ---"
npm run generate -- book "The Fellowship of the Ring"

# 4. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Frodo Baggins" "The Fellowship of the Ring"
npm run generate -- character "Samwise Gamgee" "The Fellowship of the Ring"
npm run generate -- character "Gandalf" "The Fellowship of the Ring"
npm run generate -- character "Aragorn" "The Fellowship of the Ring"
npm run generate -- character "Legolas" "The Fellowship of the Ring"
npm run generate -- character "Gimli" "The Fellowship of the Ring"
npm run generate -- character "Boromir" "The Fellowship of the Ring"
npm run generate -- character "Meriadoc Brandybuck" "The Fellowship of the Ring"
npm run generate -- character "Peregrin Took" "The Fellowship of the Ring"
npm run generate -- character "Bilbo Baggins" "The Fellowship of the Ring"
npm run generate -- character "Elrond" "The Fellowship of the Ring"
npm run generate -- character "Galadriel" "The Fellowship of the Ring"
npm run generate -- character "Sauron" "The Fellowship of the Ring"
npm run generate -- character "Saruman" "The Fellowship of the Ring"

# 5. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "The Shire" "The Fellowship of the Ring"
npm run generate -- location "Bag End" "The Fellowship of the Ring"
npm run generate -- location "Rivendell" "The Fellowship of the Ring"
npm run generate -- location "Moria" "The Fellowship of the Ring"
npm run generate -- location "Lothlórien" "The Fellowship of the Ring"
npm run generate -- location "Mordor" "The Fellowship of the Ring"
npm run generate -- location "Mount Doom" "The Fellowship of the Ring"

# 6. Items
echo ""
echo "--- Items ---"
npm run generate -- item "The One Ring" "The Fellowship of the Ring"
npm run generate -- item "Sting (Sword)" "The Fellowship of the Ring"
npm run generate -- item "Mithril Coat" "The Fellowship of the Ring"
npm run generate -- item "Andúril" "The Fellowship of the Ring"

# 7. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "The Fellowship of the Ring (Group)" "The Fellowship of the Ring"

# 8. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
