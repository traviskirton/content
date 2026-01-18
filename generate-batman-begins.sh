#!/bin/bash

# Batman Begins - Entity Generation Script
# Run from the content directory: ./generate-batman-begins.sh

set -e

echo "=== Generating Batman Begins entities ==="

# 1. Companies
echo ""
echo "--- Companies ---"
npm run generate -- company "Warner Bros. Pictures"
npm run generate -- company "Legendary Pictures"
npm run generate -- company "Syncopy"
npm run generate -- company "DC Comics"

# 2. People
echo ""
echo "--- People ---"
npm run generate -- person "Christopher Nolan" "director"
npm run generate -- person "Christian Bale" "actor"
npm run generate -- person "Michael Caine" "actor"
npm run generate -- person "Liam Neeson" "actor"
npm run generate -- person "Katie Holmes" "actor"
npm run generate -- person "Gary Oldman" "actor"
npm run generate -- person "Cillian Murphy" "actor"
npm run generate -- person "Morgan Freeman" "actor"
npm run generate -- person "Tom Wilkinson" "actor"
npm run generate -- person "Hans Zimmer" "composer"
npm run generate -- person "James Newton Howard" "composer"
npm run generate -- person "David S. Goyer" "writer"

# 3. Franchise
echo ""
echo "--- Franchise ---"
npm run generate -- franchise "The Dark Knight Trilogy"
npm run generate -- franchise "Batman"

# 4. Movie
echo ""
echo "--- Movie ---"
npm run generate -- movie "Batman Begins"

# 5. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Bruce Wayne" "Batman Begins"
npm run generate -- character "Alfred Pennyworth" "Batman Begins"
npm run generate -- character "Ra's al Ghul" "Batman Begins"
npm run generate -- character "Henri Ducard" "Batman Begins"
npm run generate -- character "Rachel Dawes" "Batman Begins"
npm run generate -- character "James Gordon" "Batman Begins"
npm run generate -- character "Jonathan Crane" "Batman Begins"
npm run generate -- character "Lucius Fox" "Batman Begins"
npm run generate -- character "Carmine Falcone" "Batman Begins"
npm run generate -- character "Thomas Wayne" "Batman Begins"
npm run generate -- character "Martha Wayne" "Batman Begins"

# 6. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Gotham City" "Batman Begins"
npm run generate -- location "Wayne Manor" "Batman Begins"
npm run generate -- location "Batcave" "Batman Begins"
npm run generate -- location "Arkham Asylum" "Batman Begins"
npm run generate -- location "Wayne Tower" "Batman Begins"
npm run generate -- location "The Narrows" "Batman Begins"
npm run generate -- location "League of Shadows Monastery" "Batman Begins"

# 7. Vehicles & Items
echo ""
echo "--- Vehicles & Items ---"
npm run generate -- vehicle "Tumbler" "Batman Begins"
npm run generate -- item "Batsuit" "Batman Begins"
npm run generate -- item "Fear Toxin" "Batman Begins"
npm run generate -- item "Microwave Emitter" "Batman Begins"

# 8. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "League of Shadows" "Batman Begins"
npm run generate -- organization "Wayne Enterprises" "Batman Begins"
npm run generate -- organization "Gotham City Police Department" "Batman Begins"

# 9. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Mentmore Towers"
npm run generate -- filming-location "Shepperton Studios"
npm run generate -- filming-location "Cardington Airship Sheds"
npm run generate -- filming-location "Chicago"
npm run generate -- filming-location "Iceland"
npm run generate -- filming-location "Coalhouse Fort"

# 10. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
