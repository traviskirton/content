#!/bin/bash

# Foundation and Empire (Book 2) - Entity Generation Script

set -e

echo "=== Generating Foundation and Empire entities ==="

# 1. Book
echo ""
echo "--- Book ---"
npm run generate -- book "Foundation and Empire"

# 2. Characters - Part 1: The General
echo ""
echo "--- Characters (The General) ---"
npm run generate -- character "Bel Riose" "Foundation and Empire"
npm run generate -- character "Ducem Barr" "Foundation and Empire"
npm run generate -- character "Cleon II" "Foundation and Empire"
npm run generate -- character "Brodrig" "Foundation and Empire"
npm run generate -- character "Lathan Devers" "Foundation and Empire"

# 3. Characters - Part 2: The Mule
echo ""
echo "--- Characters (The Mule) ---"
npm run generate -- character "The Mule" "Foundation and Empire"
npm run generate -- character "Bayta Darell" "Foundation and Empire"
npm run generate -- character "Toran Darell" "Foundation and Empire"
npm run generate -- character "Ebling Mis" "Foundation and Empire"
npm run generate -- character "Han Pritcher" "Foundation and Empire"
npm run generate -- character "Magnifico Giganticus" "Foundation and Empire"

# 4. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Kalgan" "Foundation and Empire"
npm run generate -- location "Neotrantor" "Foundation and Empire"
npm run generate -- location "Haven" "Foundation and Empire"

# 5. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "The Mule's Empire" "Foundation and Empire"
npm run generate -- organization "Independent Traders" "Foundation and Empire"

# 6. Items/Concepts
echo ""
echo "--- Items ---"
npm run generate -- item "Emotional Control (Mule)" "Foundation and Empire"
npm run generate -- item "Visi-Sonor" "Foundation and Empire"

# 7. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
