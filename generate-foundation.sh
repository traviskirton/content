#!/bin/bash

# Foundation (Book 1) - Entity Generation Script

set -e

echo "=== Generating Foundation entities ==="

# 1. Author
echo ""
echo "--- Author ---"
npm run generate -- author "Isaac Asimov"

# 2. Franchise
echo ""
echo "--- Franchise ---"
npm run generate -- franchise "Foundation Series"

# 3. Book
echo ""
echo "--- Book ---"
npm run generate -- book "Foundation"

# 4. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Hari Seldon" "Foundation"
npm run generate -- character "Gaal Dornick" "Foundation"
npm run generate -- character "Salvor Hardin" "Foundation"
npm run generate -- character "Lewis Pirenne" "Foundation"
npm run generate -- character "Hober Mallow" "Foundation"
npm run generate -- character "Sef Sermak" "Foundation"
npm run generate -- character "Limmar Ponyets" "Foundation"
npm run generate -- character "Ankor Jael" "Foundation"

# 5. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Trantor" "Foundation"
npm run generate -- location "Terminus" "Foundation"
npm run generate -- location "Anacreon" "Foundation"
npm run generate -- location "Smyrno" "Foundation"

# 6. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "First Foundation" "Foundation"
npm run generate -- organization "Galactic Empire (Foundation)" "Foundation"
npm run generate -- organization "Encyclopedia Foundation" "Foundation"
npm run generate -- organization "Commission of Public Safety" "Foundation"

# 7. Items/Concepts
echo ""
echo "--- Items ---"
npm run generate -- item "Psychohistory" "Foundation"
npm run generate -- item "Seldon Plan" "Foundation"
npm run generate -- item "Time Vault" "Foundation"
npm run generate -- item "Seldon Crisis" "Foundation"
npm run generate -- item "Nuclear Power (Foundation)" "Foundation"

# 8. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
