#!/bin/bash

# The Dark Knight - Entity Generation Script
# Run from the content directory: ./generate-dark-knight.sh

set -e

echo "=== Generating The Dark Knight entities ==="

# 1. New People
echo ""
echo "--- New People ---"
npm run generate -- person "Heath Ledger" "actor"
npm run generate -- person "Aaron Eckhart" "actor"
npm run generate -- person "Maggie Gyllenhaal" "actor"
npm run generate -- person "Eric Roberts" "actor"

# 2. Movie
echo ""
echo "--- Movie ---"
npm run generate -- movie "The Dark Knight"

# 3. New Characters
echo ""
echo "--- New Characters ---"
npm run generate -- character "The Joker" "The Dark Knight"
npm run generate -- character "Harvey Dent" "The Dark Knight"
npm run generate -- character "Sal Maroni" "The Dark Knight"

# 4. Update existing characters for trilogy
echo ""
echo "--- Updating characters (Dark Knight Trilogy) ---"
npm run generate -- character "Bruce Wayne" "The Dark Knight Trilogy"
npm run generate -- character "Alfred Pennyworth" "The Dark Knight Trilogy"
npm run generate -- character "James Gordon" "The Dark Knight Trilogy"
npm run generate -- character "Lucius Fox" "The Dark Knight Trilogy"
npm run generate -- character "Rachel Dawes" "The Dark Knight Trilogy"
npm run generate -- character "Jonathan Crane" "The Dark Knight Trilogy"

# 5. New Locations
echo ""
echo "--- New Locations ---"
npm run generate -- location "Gotham General Hospital" "The Dark Knight"
npm run generate -- location "Major Crimes Unit" "The Dark Knight"
npm run generate -- location "Prewitt Building" "The Dark Knight"

# 6. Update locations for trilogy
echo ""
echo "--- Updating locations (Dark Knight Trilogy) ---"
npm run generate -- location "Gotham City" "The Dark Knight Trilogy"
npm run generate -- location "Wayne Manor" "The Dark Knight Trilogy"
npm run generate -- location "Batcave" "The Dark Knight Trilogy"

# 7. New Vehicles & Items
echo ""
echo "--- New Vehicles & Items ---"
npm run generate -- vehicle "Batpod" "The Dark Knight"
npm run generate -- item "Joker Cards" "The Dark Knight"

# 8. Update vehicles for trilogy
echo ""
echo "--- Updating vehicles ---"
npm run generate -- vehicle "Tumbler" "The Dark Knight Trilogy"

# 9. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Chicago"
npm run generate -- filming-location "Pinewood Studios"
npm run generate -- filming-location "Hong Kong"
npm run generate -- filming-location "Battersea Power Station"
npm run generate -- filming-location "Chicago Post Office"

# 10. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
