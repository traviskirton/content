#!/bin/bash

# The Godfather - Entity Generation Script

set -e

echo "=== Generating The Godfather entities ==="

# 1. Author
echo ""
echo "--- Author ---"
npm run generate -- author "Mario Puzo"

# 2. Book
echo ""
echo "--- Book ---"
npm run generate -- book "The Godfather"

# 3. Characters - Corleone Family
echo ""
echo "--- Corleone Family ---"
npm run generate -- character "Vito Corleone" "The Godfather"
npm run generate -- character "Michael Corleone" "The Godfather"
npm run generate -- character "Sonny Corleone" "The Godfather"
npm run generate -- character "Fredo Corleone" "The Godfather"
npm run generate -- character "Tom Hagen" "The Godfather"
npm run generate -- character "Connie Corleone" "The Godfather"
npm run generate -- character "Kay Adams" "The Godfather"
npm run generate -- character "Carmela Corleone" "The Godfather"

# 4. Characters - Associates
echo ""
echo "--- Associates ---"
npm run generate -- character "Luca Brasi" "The Godfather"
npm run generate -- character "Peter Clemenza" "The Godfather"
npm run generate -- character "Salvatore Tessio" "The Godfather"
npm run generate -- character "Johnny Fontane" "The Godfather"
npm run generate -- character "Amerigo Bonasera" "The Godfather"

# 5. Characters - Rivals
echo ""
echo "--- Rivals ---"
npm run generate -- character "Virgil Sollozzo" "The Godfather"
npm run generate -- character "Emilio Barzini" "The Godfather"
npm run generate -- character "Philip Tattaglia" "The Godfather"
npm run generate -- character "Captain McCluskey" "The Godfather"
npm run generate -- character "Jack Woltz" "The Godfather"
npm run generate -- character "Carlo Rizzi" "The Godfather"

# 6. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Corleone Compound" "The Godfather"
npm run generate -- location "Genco Olive Oil Company" "The Godfather"
npm run generate -- location "Louis Restaurant" "The Godfather"
npm run generate -- location "Las Vegas (Godfather)" "The Godfather"
npm run generate -- location "Sicily (Godfather)" "The Godfather"
npm run generate -- location "Corleone, Sicily" "The Godfather"

# 7. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "Corleone Crime Family" "The Godfather"
npm run generate -- organization "The Five Families" "The Godfather"
npm run generate -- organization "Barzini Crime Family" "The Godfather"
npm run generate -- organization "Tattaglia Crime Family" "The Godfather"

# 8. Items/Concepts
echo ""
echo "--- Items ---"
npm run generate -- item "The Horse Head" "The Godfather"
npm run generate -- item "The Offer" "The Godfather"
npm run generate -- item "Mattresses (Going to the Mattresses)" "The Godfather"

# 9. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
