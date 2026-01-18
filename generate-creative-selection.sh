#!/bin/bash

# Creative Selection - Entity Generation Script

set -e

echo "=== Generating Creative Selection entities ==="

# 1. Author
echo ""
echo "--- Author ---"
npm run generate -- author "Ken Kocienda"

# 2. Book
echo ""
echo "--- Book ---"
npm run generate -- book "Creative Selection"

# 3. People mentioned
echo ""
echo "--- People ---"
npm run generate -- person "Steve Jobs" "Apple"
npm run generate -- person "Scott Forstall" "Apple"
npm run generate -- person "Bas Ording" "Apple"
npm run generate -- person "Greg Christie" "Apple"
npm run generate -- person "Henri Lamiraux" "Apple"

# 4. Companies
echo ""
echo "--- Companies ---"
npm run generate -- company "Apple Inc."

# 5. Items/Concepts
echo ""
echo "--- Items ---"
npm run generate -- item "iPhone Keyboard" "Creative Selection"
npm run generate -- item "Safari Browser" "Creative Selection"
npm run generate -- item "Demo Culture" "Creative Selection"

# 6. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Apple Campus" "Creative Selection"
npm run generate -- location "Infinite Loop" "Creative Selection"

# 7. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
