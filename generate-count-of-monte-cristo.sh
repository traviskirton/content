#!/bin/bash

# The Count of Monte Cristo - Entity Generation Script

set -e

echo "=== Generating The Count of Monte Cristo entities ==="

# 1. Author
echo ""
echo "--- Author ---"
npm run generate -- author "Alexandre Dumas"

# 2. Book
echo ""
echo "--- Book ---"
npm run generate -- book "The Count of Monte Cristo"

# 3. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Edmond Dantès" "The Count of Monte Cristo"
npm run generate -- character "Fernand Mondego" "The Count of Monte Cristo"
npm run generate -- character "Abbé Faria" "The Count of Monte Cristo"
npm run generate -- character "Mercédès" "The Count of Monte Cristo"
npm run generate -- character "Danglars" "The Count of Monte Cristo"
npm run generate -- character "Villefort" "The Count of Monte Cristo"
npm run generate -- character "Maximilian Morrel" "The Count of Monte Cristo"
npm run generate -- character "Haydée" "The Count of Monte Cristo"
npm run generate -- character "Albert de Morcerf" "The Count of Monte Cristo"

# 4. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Château d'If" "The Count of Monte Cristo"
npm run generate -- location "Isle of Monte Cristo" "The Count of Monte Cristo"
npm run generate -- location "Marseille (Monte Cristo)" "The Count of Monte Cristo"
npm run generate -- location "Paris (Monte Cristo)" "The Count of Monte Cristo"

# 5. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
