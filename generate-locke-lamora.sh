#!/bin/bash

# The Lies of Locke Lamora - Entity Generation Script

set -e

echo "=== Generating The Lies of Locke Lamora entities ==="

# 1. Author
echo ""
echo "--- Author ---"
npm run generate -- author "Scott Lynch"

# 2. Franchise
echo ""
echo "--- Franchise ---"
npm run generate -- franchise "Gentleman Bastard Series"

# 3. Book
echo ""
echo "--- Book ---"
npm run generate -- book "The Lies of Locke Lamora"

# 4. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Locke Lamora" "The Lies of Locke Lamora"
npm run generate -- character "Jean Tannen" "The Lies of Locke Lamora"
npm run generate -- character "Father Chains" "The Lies of Locke Lamora"
npm run generate -- character "Calo Sanza" "The Lies of Locke Lamora"
npm run generate -- character "Galdo Sanza" "The Lies of Locke Lamora"
npm run generate -- character "Bug" "The Lies of Locke Lamora"
npm run generate -- character "The Gray King" "The Lies of Locke Lamora"
npm run generate -- character "Capa Barsavi" "The Lies of Locke Lamora"
npm run generate -- character "The Bondsmage of Karthain" "The Lies of Locke Lamora"
npm run generate -- character "Don Salvara" "The Lies of Locke Lamora"

# 5. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Camorr" "The Lies of Locke Lamora"
npm run generate -- location "The Elderglass" "The Lies of Locke Lamora"
npm run generate -- location "The Floating Grave" "The Lies of Locke Lamora"
npm run generate -- location "Temple of Perelandro" "The Lies of Locke Lamora"

# 6. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "The Gentleman Bastards" "The Lies of Locke Lamora"
npm run generate -- organization "The Right People" "The Lies of Locke Lamora"
npm run generate -- organization "The Bondsmagi of Karthain" "The Lies of Locke Lamora"

# 7. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
