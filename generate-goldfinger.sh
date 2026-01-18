#!/bin/bash

# Goldfinger (Ian Fleming) - Entity Generation Script

set -e

echo "=== Generating Goldfinger entities ==="

# 1. Book
echo ""
echo "--- Book ---"
npm run generate -- book "Goldfinger (Novel)"

# 2. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Auric Goldfinger" "Goldfinger"
npm run generate -- character "Oddjob" "Goldfinger"
npm run generate -- character "Pussy Galore" "Goldfinger"
npm run generate -- character "Jill Masterton" "Goldfinger"
npm run generate -- character "Tilly Masterton" "Goldfinger"
npm run generate -- character "Colonel Smithers" "Goldfinger"
npm run generate -- character "Mr. Strap" "Goldfinger"
npm run generate -- character "Mr. Midnight" "Goldfinger"

# 3. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Fort Knox" "Goldfinger"
npm run generate -- location "Goldfinger's Factory" "Goldfinger"
npm run generate -- location "Miami Beach (Bond)" "Goldfinger"
npm run generate -- location "Reculver (Bond)" "Goldfinger"
npm run generate -- location "Geneva (Bond)" "Goldfinger"

# 4. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "Pussy Galore's Flying Circus" "Goldfinger"
npm run generate -- organization "The Mob (Goldfinger)" "Goldfinger"

# 5. Items
echo ""
echo "--- Items ---"
npm run generate -- item "Aston Martin DB Mark III" "Goldfinger"
npm run generate -- item "Operation Grand Slam" "Goldfinger"
npm run generate -- item "Golden Girl (Corpse)" "Goldfinger"
npm run generate -- item "Oddjob's Bowler Hat" "Goldfinger"
npm run generate -- item "Goldfinger's Gold" "Goldfinger"

# 6. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
