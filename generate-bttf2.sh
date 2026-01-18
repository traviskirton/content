#!/bin/bash

# Back to the Future Part II - Entity Generation Script
# Run from the content directory: ./generate-bttf2.sh

set -e

echo "=== Generating Back to the Future Part II entities ==="

# 1. New Movie
echo ""
echo "--- Movie ---"
npm run generate -- movie "Back to the Future Part II"

# 2. New Locations (2015 and alternate 1985)
echo ""
echo "--- New Locations ---"
npm run generate -- location "Cafe 80's" "Back to the Future Part II"
npm run generate -- location "Hill Valley 2015" "Back to the Future Part II"
npm run generate -- location "Hilldale" "Back to the Future Part II"
npm run generate -- location "Biff Tannen's Pleasure Paradise" "Back to the Future Part II"
npm run generate -- location "Alternate 1985 Hill Valley" "Back to the Future Part II"

# 3. New Characters
echo ""
echo "--- New Characters ---"
npm run generate -- character "Old Biff Tannen" "Back to the Future Part II"
npm run generate -- character "Griff Tannen" "Back to the Future Part II"
npm run generate -- character "Marlene McFly" "Back to the Future Part II"
npm run generate -- character "Marty McFly Jr." "Back to the Future Part II"

# 4. New Items
echo ""
echo "--- New Items ---"
npm run generate -- item "Gray's Sports Almanac" "Back to the Future Part II"
npm run generate -- item "Hoverboard" "Back to the Future Part II"
npm run generate -- item "Mr. Fusion" "Back to the Future Part II"
npm run generate -- item "Self-Lacing Nikes" "Back to the Future Part II"

# 5. Regenerate existing characters with full trilogy knowledge
echo ""
echo "--- Updating existing characters (full trilogy) ---"
npm run generate -- character "Marty McFly" "Back to the Future trilogy"
npm run generate -- character "Doc Brown" "Back to the Future trilogy"
npm run generate -- character "Biff Tannen" "Back to the Future trilogy"
npm run generate -- character "Lorraine Baines" "Back to the Future trilogy"
npm run generate -- character "George McFly" "Back to the Future trilogy"
npm run generate -- character "Jennifer Parker" "Back to the Future trilogy"

# 6. Regenerate existing locations with expanded info
echo ""
echo "--- Updating existing locations (full trilogy) ---"
npm run generate -- location "Hill Valley" "Back to the Future trilogy"
npm run generate -- location "Courthouse Square" "Back to the Future trilogy"
npm run generate -- location "Lyon Estates" "Back to the Future trilogy"
npm run generate -- location "McFly Residence" "Back to the Future trilogy"

# 7. Update vehicles
echo ""
echo "--- Updating vehicles ---"
npm run generate -- vehicle "DeLorean Time Machine" "Back to the Future trilogy"

# 8. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
