#!/bin/bash

# From Russia with Love (Ian Fleming) - Entity Generation Script

set -e

echo "=== Generating From Russia with Love entities ==="

# 1. Book
echo ""
echo "--- Book ---"
npm run generate -- book "From Russia with Love"

# 2. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Rosa Klebb" "From Russia with Love"
npm run generate -- character "Red Grant" "From Russia with Love"
npm run generate -- character "Tatiana Romanova" "From Russia with Love"
npm run generate -- character "Kronsteen" "From Russia with Love"
npm run generate -- character "Darko Kerim" "From Russia with Love"
npm run generate -- character "General Grubozaboyschikov" "From Russia with Love"

# 3. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Istanbul (Bond)" "From Russia with Love"
npm run generate -- location "Orient Express" "From Russia with Love"
npm run generate -- location "Soviet Embassy Istanbul" "From Russia with Love"
npm run generate -- location "Hagia Sophia (Bond)" "From Russia with Love"

# 4. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "SPECTRE" "James Bond"
npm run generate -- organization "Otdyel II" "From Russia with Love"

# 5. Items
echo ""
echo "--- Items ---"
npm run generate -- item "Spektor Cipher Machine" "From Russia with Love"
npm run generate -- item "Rosa Klebb's Poison Shoe" "From Russia with Love"
npm run generate -- item "Periscope Briefcase" "From Russia with Love"

# 6. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
