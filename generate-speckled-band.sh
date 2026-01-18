#!/bin/bash

# The Adventure of the Speckled Band - Entity Generation Script

set -e

echo "=== Generating The Adventure of the Speckled Band entities ==="

# 1. Book/Story
echo ""
echo "--- Book ---"
npm run generate -- book "The Adventure of the Speckled Band"

# 2. Story Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Dr. Grimesby Roylott" "The Adventure of the Speckled Band"
npm run generate -- character "Helen Stoner" "The Adventure of the Speckled Band"
npm run generate -- character "Julia Stoner" "The Adventure of the Speckled Band"
npm run generate -- character "Percy Armitage" "The Adventure of the Speckled Band"

# 3. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Stoke Moran Manor" "The Adventure of the Speckled Band"
npm run generate -- location "Dr. Roylott's Chamber" "The Adventure of the Speckled Band"
npm run generate -- location "Helen's Bedroom" "The Adventure of the Speckled Band"
npm run generate -- location "Surrey (Speckled Band)" "The Adventure of the Speckled Band"

# 4. Items/Creatures
echo ""
echo "--- Items ---"
npm run generate -- item "The Swamp Adder" "The Adventure of the Speckled Band"
npm run generate -- item "The Ventilator" "The Adventure of the Speckled Band"
npm run generate -- item "The Bell-Pull" "The Adventure of the Speckled Band"
npm run generate -- item "The Safe" "The Adventure of the Speckled Band"
npm run generate -- item "Dr. Roylott's Dog-Lash" "The Adventure of the Speckled Band"

# 5. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
