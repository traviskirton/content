#!/bin/bash

# Tinker, Tailor, Soldier, Spy - Entity Generation Script

set -e

echo "=== Generating Tinker, Tailor, Soldier, Spy entities ==="

# 1. Author
echo ""
echo "--- Author ---"
npm run generate -- author "John le Carré"

# 2. Franchise
echo ""
echo "--- Franchise ---"
npm run generate -- franchise "Karla Trilogy"
npm run generate -- franchise "George Smiley Series"

# 3. Book
echo ""
echo "--- Book ---"
npm run generate -- book "Tinker, Tailor, Soldier, Spy"

# 4. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "George Smiley" "Tinker, Tailor, Soldier, Spy"
npm run generate -- character "Control (le Carré)" "Tinker, Tailor, Soldier, Spy"
npm run generate -- character "Bill Haydon" "Tinker, Tailor, Soldier, Spy"
npm run generate -- character "Percy Alleline" "Tinker, Tailor, Soldier, Spy"
npm run generate -- character "Roy Bland" "Tinker, Tailor, Soldier, Spy"
npm run generate -- character "Toby Esterhase" "Tinker, Tailor, Soldier, Spy"
npm run generate -- character "Peter Guillam" "Tinker, Tailor, Soldier, Spy"
npm run generate -- character "Ricki Tarr" "Tinker, Tailor, Soldier, Spy"
npm run generate -- character "Jim Prideaux" "Tinker, Tailor, Soldier, Spy"
npm run generate -- character "Karla" "Tinker, Tailor, Soldier, Spy"
npm run generate -- character "Ann Smiley" "Tinker, Tailor, Soldier, Spy"
npm run generate -- character "Connie Sachs" "Tinker, Tailor, Soldier, Spy"

# 5. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "The Circus (le Carré)" "Tinker, Tailor, Soldier, Spy"
npm run generate -- location "Cambridge Circus" "Tinker, Tailor, Soldier, Spy"
npm run generate -- location "Thursgood's School" "Tinker, Tailor, Soldier, Spy"
npm run generate -- location "The Safe House (le Carré)" "Tinker, Tailor, Soldier, Spy"

# 6. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "The Circus" "Tinker, Tailor, Soldier, Spy"
npm run generate -- organization "Moscow Centre" "Tinker, Tailor, Soldier, Spy"
npm run generate -- organization "The Scalphunters" "Tinker, Tailor, Soldier, Spy"

# 7. Items/Operations
echo ""
echo "--- Items ---"
npm run generate -- item "Operation Testify" "Tinker, Tailor, Soldier, Spy"
npm run generate -- item "Operation Witchcraft" "Tinker, Tailor, Soldier, Spy"
npm run generate -- item "The Mole (Codename Gerald)" "Tinker, Tailor, Soldier, Spy"

# 8. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
