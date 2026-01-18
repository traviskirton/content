#!/bin/bash

# Second Foundation (Book 3) - Entity Generation Script

set -e

echo "=== Generating Second Foundation entities ==="

# 1. Book
echo ""
echo "--- Book ---"
npm run generate -- book "Second Foundation"

# 2. Characters - Part 1: Search by the Mule
echo ""
echo "--- Characters (Search by the Mule) ---"
npm run generate -- character "Bail Channis" "Second Foundation"
npm run generate -- character "First Speaker" "Second Foundation"

# 3. Characters - Part 2: Search by the Foundation
echo ""
echo "--- Characters (Search by the Foundation) ---"
npm run generate -- character "Arkady Darell" "Second Foundation"
npm run generate -- character "Dr. Toran Darell II" "Second Foundation"
npm run generate -- character "Pelleas Anthor" "Second Foundation"
npm run generate -- character "Preem Palver" "Second Foundation"
npm run generate -- character "Lady Callia" "Second Foundation"
npm run generate -- character "Lord Stettin" "Second Foundation"
npm run generate -- character "Homir Munn" "Second Foundation"

# 4. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Rossem" "Second Foundation"
npm run generate -- location "Tazenda" "Second Foundation"
npm run generate -- location "Star's End" "Second Foundation"
npm run generate -- location "Kalgan (Second Foundation)" "Second Foundation"

# 5. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "Second Foundation" "Second Foundation"
npm run generate -- organization "Speakers (Second Foundation)" "Second Foundation"

# 6. Items/Concepts
echo ""
echo "--- Items ---"
npm run generate -- item "Prime Radiant" "Second Foundation"
npm run generate -- item "Mentalics" "Second Foundation"
npm run generate -- item "Mental Static Device" "Second Foundation"

# 7. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
