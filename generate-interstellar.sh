#!/bin/bash

# Interstellar - Entity Generation Script
# Run from the content directory: ./generate-interstellar.sh

set -e

echo "=== Generating Interstellar entities ==="

# 1. People
echo ""
echo "--- People ---"
npm run generate -- person "Matthew McConaughey" "actor"
npm run generate -- person "Jessica Chastain" "actor"
npm run generate -- person "Anne Hathaway" "actor"
npm run generate -- person "Michael Caine" "actor"
npm run generate -- person "Casey Affleck" "actor"
npm run generate -- person "Matt Damon" "actor"
npm run generate -- person "Mackenzie Foy" "actor"
npm run generate -- person "Timothée Chalamet" "actor"
npm run generate -- person "John Lithgow" "actor"
npm run generate -- person "Ellen Burstyn" "actor"
npm run generate -- person "Hoyte van Hoytema" "cinematographer"

# 2. Movie
echo ""
echo "--- Movie ---"
npm run generate -- movie "Interstellar"

# 3. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Cooper" "Interstellar"
npm run generate -- character "Murph" "Interstellar"
npm run generate -- character "Amelia Brand" "Interstellar"
npm run generate -- character "Professor Brand" "Interstellar"
npm run generate -- character "Tom Cooper" "Interstellar"
npm run generate -- character "Dr. Mann" "Interstellar"
npm run generate -- character "TARS" "Interstellar"
npm run generate -- character "CASE" "Interstellar"
npm run generate -- character "Donald" "Interstellar"

# 4. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Cooper's Farm" "Interstellar"
npm run generate -- location "NASA Facility" "Interstellar"
npm run generate -- location "Miller's Planet" "Interstellar"
npm run generate -- location "Mann's Planet" "Interstellar"
npm run generate -- location "Edmund's Planet" "Interstellar"
npm run generate -- location "Gargantua" "Interstellar"
npm run generate -- location "The Tesseract" "Interstellar"
npm run generate -- location "Cooper Station" "Interstellar"

# 5. Vehicles
echo ""
echo "--- Vehicles ---"
npm run generate -- vehicle "Endurance" "Interstellar"
npm run generate -- vehicle "Ranger" "Interstellar"
npm run generate -- vehicle "Lander" "Interstellar"

# 6. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "NASA (Interstellar)" "Interstellar"

# 7. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Alberta, Canada"
npm run generate -- filming-location "Iceland"
npm run generate -- filming-location "Los Angeles"

# 8. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
