#!/bin/bash

# The Batman (2022) - Entity Generation Script
# Run from the content directory: ./generate-the-batman.sh

set -e

echo "=== Generating The Batman (2022) entities ==="

# 1. People
echo ""
echo "--- People ---"
npm run generate -- person "Matt Reeves" "director"
npm run generate -- person "Robert Pattinson" "actor"
npm run generate -- person "Zoë Kravitz" "actor"
npm run generate -- person "Paul Dano" "actor"
npm run generate -- person "Jeffrey Wright" "actor"
npm run generate -- person "John Turturro" "actor"
npm run generate -- person "Colin Farrell" "actor"
npm run generate -- person "Andy Serkis" "actor"
npm run generate -- person "Peter Sarsgaard" "actor"
npm run generate -- person "Michael Giacchino" "composer"

# 2. Franchise
echo ""
echo "--- Franchise ---"
npm run generate -- franchise "The Batman (Reeves)"

# 3. Movie
echo ""
echo "--- Movie ---"
npm run generate -- movie "The Batman (2022)"

# 4. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Bruce Wayne (Pattinson)" "The Batman (2022)"
npm run generate -- character "Selina Kyle (Kravitz)" "The Batman (2022)"
npm run generate -- character "The Riddler" "The Batman (2022)"
npm run generate -- character "James Gordon (Wright)" "The Batman (2022)"
npm run generate -- character "Oswald Cobblepot" "The Batman (2022)"
npm run generate -- character "Carmine Falcone (Turturro)" "The Batman (2022)"
npm run generate -- character "Alfred Pennyworth (Serkis)" "The Batman (2022)"
npm run generate -- character "Gil Colson" "The Batman (2022)"
npm run generate -- character "Bella Reál" "The Batman (2022)"

# 5. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Gotham City (Reeves)" "The Batman (2022)"
npm run generate -- location "Wayne Tower (Reeves)" "The Batman (2022)"
npm run generate -- location "Iceberg Lounge" "The Batman (2022)"
npm run generate -- location "Gotham Square Garden" "The Batman (2022)"
npm run generate -- location "Batcave (Reeves)" "The Batman (2022)"
npm run generate -- location "44 Below" "The Batman (2022)"
npm run generate -- location "Orphanage" "The Batman (2022)"

# 6. Vehicles & Items
echo ""
echo "--- Vehicles & Items ---"
npm run generate -- vehicle "Batmobile (Reeves)" "The Batman (2022)"
npm run generate -- vehicle "Batcycle (Reeves)" "The Batman (2022)"
npm run generate -- item "Riddler Ciphers" "The Batman (2022)"
npm run generate -- item "Contact Lenses" "The Batman (2022)"

# 7. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "Gotham City Police Department (Reeves)" "The Batman (2022)"
npm run generate -- organization "Renewal Fund" "The Batman (2022)"

# 8. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Liverpool"
npm run generate -- filming-location "Glasgow"
npm run generate -- filming-location "London"
npm run generate -- filming-location "Chicago"
npm run generate -- filming-location "Warner Bros. Studios Leavesden"
npm run generate -- filming-location "St George's Hall, Liverpool"
npm run generate -- filming-location "Necropolis Cemetery Glasgow"

# 9. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
