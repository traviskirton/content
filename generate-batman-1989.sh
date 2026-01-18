#!/bin/bash

# Batman (1989) - Entity Generation Script
# Run from the content directory: ./generate-batman-1989.sh

set -e

echo "=== Generating Batman (1989) entities ==="

# 1. People
echo ""
echo "--- People ---"
npm run generate -- person "Tim Burton" "director"
npm run generate -- person "Michael Keaton" "actor"
npm run generate -- person "Jack Nicholson" "actor"
npm run generate -- person "Kim Basinger" "actor"
npm run generate -- person "Jack Palance" "actor"
npm run generate -- person "Michael Gough" "actor"
npm run generate -- person "Pat Hingle" "actor"
npm run generate -- person "Billy Dee Williams" "actor"
npm run generate -- person "Danny Elfman" "composer"
npm run generate -- person "Sam Hamm" "writer"

# 2. Franchise
echo ""
echo "--- Franchise ---"
npm run generate -- franchise "Burton/Schumacher Batman Films"

# 3. Movie
echo ""
echo "--- Movie ---"
npm run generate -- movie "Batman (1989)"

# 4. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Bruce Wayne (Burton)" "Batman (1989)"
npm run generate -- character "The Joker (Nicholson)" "Batman (1989)"
npm run generate -- character "Vicki Vale" "Batman (1989)"
npm run generate -- character "Alfred Pennyworth (Gough)" "Batman (1989)"
npm run generate -- character "Commissioner Gordon (Hingle)" "Batman (1989)"
npm run generate -- character "Harvey Dent (Williams)" "Batman (1989)"
npm run generate -- character "Carl Grissom" "Batman (1989)"
npm run generate -- character "Alexander Knox" "Batman (1989)"

# 5. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Gotham City (Burton)" "Batman (1989)"
npm run generate -- location "Axis Chemicals" "Batman (1989)"
npm run generate -- location "Gotham Cathedral" "Batman (1989)"
npm run generate -- location "Flugelheim Museum" "Batman (1989)"

# 6. Vehicles & Items
echo ""
echo "--- Vehicles & Items ---"
npm run generate -- vehicle "Batmobile (1989)" "Batman (1989)"
npm run generate -- vehicle "Batwing" "Batman (1989)"
npm run generate -- item "Smylex" "Batman (1989)"

# 7. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Pinewood Studios"
npm run generate -- filming-location "Knebworth House"
npm run generate -- filming-location "Acton Lane Power Station"
npm run generate -- filming-location "Little Barford Power Station"
npm run generate -- filming-location "Hatfield House"

# 8. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
