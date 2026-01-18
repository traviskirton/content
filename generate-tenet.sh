#!/bin/bash

# Tenet - Entity Generation Script
# Run from the content directory: ./generate-tenet.sh

set -e

echo "=== Generating Tenet entities ==="

# 1. People
echo ""
echo "--- People ---"
npm run generate -- person "John David Washington" "actor"
npm run generate -- person "Robert Pattinson" "actor"
npm run generate -- person "Elizabeth Debicki" "actor"
npm run generate -- person "Kenneth Branagh" "actor"
npm run generate -- person "Dimple Kapadia" "actor"
npm run generate -- person "Aaron Taylor-Johnson" "actor"
npm run generate -- person "Clémence Poésy" "actor"
npm run generate -- person "Himesh Patel" "actor"

# 2. Movie
echo ""
echo "--- Movie ---"
npm run generate -- movie "Tenet"

# 3. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "The Protagonist" "Tenet"
npm run generate -- character "Neil" "Tenet"
npm run generate -- character "Kat" "Tenet"
npm run generate -- character "Andrei Sator" "Tenet"
npm run generate -- character "Priya" "Tenet"
npm run generate -- character "Ives" "Tenet"
npm run generate -- character "Barbara" "Tenet"

# 4. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Kyiv Opera House" "Tenet"
npm run generate -- location "Freeport" "Tenet"
npm run generate -- location "Tallinn" "Tenet"
npm run generate -- location "Stalsk-12" "Tenet"
npm run generate -- location "Mumbai" "Tenet"
npm run generate -- location "Amalfi Coast" "Tenet"

# 5. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "Tenet Organization" "Tenet"

# 6. Items
echo ""
echo "--- Items ---"
npm run generate -- item "Algorithm" "Tenet"
npm run generate -- item "Inverted Bullets" "Tenet"
npm run generate -- item "Turnstile" "Tenet"

# 7. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Estonia"
npm run generate -- filming-location "United Kingdom"
npm run generate -- filming-location "Denmark"
npm run generate -- filming-location "India"
npm run generate -- filming-location "Italy"
npm run generate -- filming-location "Norway"

# 8. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
