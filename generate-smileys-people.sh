#!/bin/bash

# Smiley's People - Entity Generation Script

set -e

echo "=== Generating Smiley's People entities ==="

# 1. Book
echo ""
echo "--- Book ---"
npm run generate -- book "Smiley's People"

# 2. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "General Vladimir" "Smiley's People"
npm run generate -- character "Otto Leipzig" "Smiley's People"
npm run generate -- character "Madame Ostrakova" "Smiley's People"
npm run generate -- character "Alexandra (Tatiana)" "Smiley's People"
npm run generate -- character "Grigoriev" "Smiley's People"
npm run generate -- character "Kirov" "Smiley's People"
npm run generate -- character "Toby Esterhase (Smiley's People)" "Smiley's People"
npm run generate -- character "Saul Enderby" "Smiley's People"
npm run generate -- character "Lauder Strickland" "Smiley's People"

# 3. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Hampstead Heath" "Smiley's People"
npm run generate -- location "Hamburg (le Carré)" "Smiley's People"
npm run generate -- location "Paris (le Carré)" "Smiley's People"
npm run generate -- location "Bern (le Carré)" "Smiley's People"
npm run generate -- location "Berlin Wall Crossing" "Smiley's People"

# 4. Items/Operations
echo ""
echo "--- Items ---"
npm run generate -- item "The Sandman Network" "Smiley's People"
npm run generate -- item "Group Thirteen" "Smiley's People"

# 5. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
