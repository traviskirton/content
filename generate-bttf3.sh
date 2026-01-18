#!/bin/bash

# Back to the Future Part III - Entity Generation Script
# Run from the content directory: ./generate-bttf3.sh

set -e

echo "=== Generating Back to the Future Part III entities ==="

# 1. New Movie
echo ""
echo "--- Movie ---"
npm run generate -- movie "Back to the Future Part III"

# 2. New Locations (1885 Old West)
echo ""
echo "--- New Locations ---"
npm run generate -- location "Hill Valley 1885" "Back to the Future Part III"
npm run generate -- location "Palace Saloon" "Back to the Future Part III"
npm run generate -- location "Hill Valley Festival" "Back to the Future Part III"
npm run generate -- location "Shonash Ravine" "Back to the Future Part III"
npm run generate -- location "Hill Valley Train Station" "Back to the Future Part III"
npm run generate -- location "Boot Hill Cemetery" "Back to the Future Part III"
npm run generate -- location "Blacksmith Shop" "Back to the Future Part III"

# 3. New Characters
echo ""
echo "--- New Characters ---"
npm run generate -- character "Clara Clayton" "Back to the Future Part III"
npm run generate -- character "Buford Tannen" "Back to the Future Part III"
npm run generate -- character "Seamus McFly" "Back to the Future Part III"
npm run generate -- character "Maggie McFly" "Back to the Future Part III"
npm run generate -- character "Marshal James Strickland" "Back to the Future Part III"

# 4. New Items/Vehicles
echo ""
echo "--- New Items & Vehicles ---"
npm run generate -- vehicle "Jules Verne Train" "Back to the Future Part III"
npm run generate -- item "Tombstone" "Back to the Future Part III"
npm run generate -- item "Frisbee Pie Tin" "Back to the Future Part III"

# 5. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Railtown 1897 State Historic Park"
npm run generate -- filming-location "Red Hills Ranch"
npm run generate -- filming-location "Monument Valley"
npm run generate -- filming-location "Sonora, California"

# 6. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
