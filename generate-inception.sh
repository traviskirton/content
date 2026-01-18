#!/bin/bash

# Inception - Entity Generation Script
# Run from the content directory: ./generate-inception.sh

set -e

echo "=== Generating Inception entities ==="

# 1. People
echo ""
echo "--- People ---"
npm run generate -- person "Leonardo DiCaprio" "actor"
npm run generate -- person "Joseph Gordon-Levitt" "actor"
npm run generate -- person "Ellen Page" "actor"
npm run generate -- person "Tom Hardy" "actor"
npm run generate -- person "Ken Watanabe" "actor"
npm run generate -- person "Dileep Rao" "actor"
npm run generate -- person "Cillian Murphy" "actor"
npm run generate -- person "Tom Berenger" "actor"
npm run generate -- person "Marion Cotillard" "actor"
npm run generate -- person "Pete Postlethwaite" "actor"
npm run generate -- person "Lukas Haas" "actor"

# 2. Movie
echo ""
echo "--- Movie ---"
npm run generate -- movie "Inception"

# 3. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Dom Cobb" "Inception"
npm run generate -- character "Arthur" "Inception"
npm run generate -- character "Ariadne" "Inception"
npm run generate -- character "Eames" "Inception"
npm run generate -- character "Saito" "Inception"
npm run generate -- character "Yusuf" "Inception"
npm run generate -- character "Robert Fischer" "Inception"
npm run generate -- character "Peter Browning" "Inception"
npm run generate -- character "Mal Cobb" "Inception"
npm run generate -- character "Maurice Fischer" "Inception"

# 4. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Limbo" "Inception"
npm run generate -- location "Snow Fortress" "Inception"
npm run generate -- location "Hotel Dream Level" "Inception"
npm run generate -- location "City Dream Level" "Inception"
npm run generate -- location "Mombasa" "Inception"

# 5. Items
echo ""
echo "--- Items ---"
npm run generate -- item "Totem" "Inception"
npm run generate -- item "PASIV Device" "Inception"
npm run generate -- item "Spinning Top" "Inception"

# 6. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "Cobol Engineering" "Inception"
npm run generate -- organization "Proclus Global" "Inception"
npm run generate -- organization "Fischer Morrow" "Inception"

# 7. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Paris"
npm run generate -- filming-location "Tokyo"
npm run generate -- filming-location "Tangier"
npm run generate -- filming-location "Calgary"
npm run generate -- filming-location "Bedfordshire"

# 8. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
