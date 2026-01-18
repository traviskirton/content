#!/bin/bash

# Back to the Future - Entity Generation Script
# Run from the content directory: ./generate-bttf.sh

set -e

echo "=== Generating Back to the Future entities ==="

# 1. Companies
echo ""
echo "--- Companies ---"
npm run generate -- company "Universal Pictures"
npm run generate -- company "Amblin Entertainment"

# 2. People
echo ""
echo "--- People ---"
npm run generate -- person "Robert Zemeckis" "director"
npm run generate -- person "Steven Spielberg" "producer"
npm run generate -- person "Bob Gale" "writer"
npm run generate -- person "Michael J. Fox" "actor"
npm run generate -- person "Christopher Lloyd" "actor"
npm run generate -- person "Lea Thompson" "actor"
npm run generate -- person "Crispin Glover" "actor"
npm run generate -- person "Thomas F. Wilson" "actor"
npm run generate -- person "Alan Silvestri" "composer"

# 3. Movie (regenerate with all links)
echo ""
echo "--- Movie ---"
npm run generate -- movie "Back to the Future"

# 4. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Biff Tannen" "Back to the Future"
npm run generate -- character "George McFly" "Back to the Future"
npm run generate -- character "Lorraine Baines" "Back to the Future"
npm run generate -- character "Jennifer Parker" "Back to the Future"
npm run generate -- character "Mr. Strickland" "Back to the Future"
npm run generate -- character "Goldie Wilson" "Back to the Future"

# 5. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Lyon Estates" "Back to the Future"
npm run generate -- location "Doc Brown's Garage" "Back to the Future"
npm run generate -- location "Hill Valley High School" "Back to the Future"
npm run generate -- location "Courthouse Square" "Back to the Future"
npm run generate -- location "Lou's Cafe" "Back to the Future"
npm run generate -- location "Enchantment Under the Sea Dance" "Back to the Future"
npm run generate -- location "McFly Residence" "Back to the Future"
npm run generate -- location "Peabody Farm" "Back to the Future"

# 6. Vehicles & Items
echo ""
echo "--- Vehicles & Items ---"
npm run generate -- vehicle "DeLorean Time Machine" "Back to the Future"
npm run generate -- item "Flux Capacitor" "Back to the Future"

# 7. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Universal Studios Hollywood"
npm run generate -- filming-location "Courthouse Square (Universal Backlot)"
npm run generate -- filming-location "Puente Hills Mall"
npm run generate -- filming-location "Whittier High School"
npm run generate -- filming-location "Gamble House"
npm run generate -- filming-location "Golden Oak Ranch"

# 8. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
