#!/bin/bash

# Neuromancer - Entity Generation Script

set -e

echo "=== Generating Neuromancer entities ==="

# 1. Author
echo ""
echo "--- Author ---"
npm run generate -- author "William Gibson"

# 2. Franchise
echo ""
echo "--- Franchise ---"
npm run generate -- franchise "Sprawl Trilogy"

# 3. Book
echo ""
echo "--- Book ---"
npm run generate -- book "Neuromancer"

# 4. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Henry Case" "Neuromancer"
npm run generate -- character "Molly Millions" "Neuromancer"
npm run generate -- character "Armitage" "Neuromancer"
npm run generate -- character "Wintermute" "Neuromancer"
npm run generate -- character "Neuromancer (AI)" "Neuromancer"
npm run generate -- character "Peter Riviera" "Neuromancer"
npm run generate -- character "Lady 3Jane" "Neuromancer"
npm run generate -- character "The Finn" "Neuromancer"

# 5. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Chiba City" "Neuromancer"
npm run generate -- location "The Sprawl" "Neuromancer"
npm run generate -- location "Freeside" "Neuromancer"
npm run generate -- location "Straylight" "Neuromancer"
npm run generate -- location "Cyberspace (Neuromancer)" "Neuromancer"

# 6. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "Tessier-Ashpool S.A." "Neuromancer"

# 7. Items/Concepts
echo ""
echo "--- Items ---"
npm run generate -- item "Cyberspace Deck" "Neuromancer"
npm run generate -- item "Microsofts (Neuromancer)" "Neuromancer"
npm run generate -- item "Simstim" "Neuromancer"
npm run generate -- item "ICE (Intrusion Countermeasures Electronics)" "Neuromancer"

# 8. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
