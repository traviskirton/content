#!/bin/bash

# Casino Royale (Ian Fleming) - Entity Generation Script

set -e

echo "=== Generating Casino Royale entities ==="

# 1. Author
echo ""
echo "--- Author ---"
npm run generate -- author "Ian Fleming"

# 2. Franchise
echo ""
echo "--- Franchise ---"
npm run generate -- franchise "James Bond"

# 3. Book
echo ""
echo "--- Book ---"
npm run generate -- book "Casino Royale (Novel)"

# 4. Core Characters
echo ""
echo "--- Core Characters ---"
npm run generate -- character "James Bond" "James Bond"
npm run generate -- character "M (James Bond)" "James Bond"
npm run generate -- character "Miss Moneypenny" "James Bond"
npm run generate -- character "Q (James Bond)" "James Bond"
npm run generate -- character "Felix Leiter" "James Bond"

# 5. Story Characters
echo ""
echo "--- Story Characters ---"
npm run generate -- character "Le Chiffre" "Casino Royale"
npm run generate -- character "Vesper Lynd" "Casino Royale"
npm run generate -- character "René Mathis" "Casino Royale"
npm run generate -- character "SMERSH Agent (Casino Royale)" "Casino Royale"

# 6. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Casino Royale (Location)" "Casino Royale"
npm run generate -- location "Royale-les-Eaux" "Casino Royale"
npm run generate -- location "Hotel Splendide" "Casino Royale"

# 7. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "MI6" "James Bond"
npm run generate -- organization "SMERSH" "James Bond"
npm run generate -- organization "Le Chiffre's Network" "Casino Royale"

# 8. Items
echo ""
echo "--- Items ---"
npm run generate -- item "Walther PPK" "James Bond"
npm run generate -- item "Bentley (Bond)" "James Bond"
npm run generate -- item "Baccarat Chemin de Fer" "Casino Royale"

# 9. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
