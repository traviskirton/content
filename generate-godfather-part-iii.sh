#!/bin/bash

# The Godfather Part III (1990 Film) - Entity Generation Script
# Including reference to 2020 re-edit: The Godfather Coda: The Death of Michael Corleone

set -e

echo "=== Generating The Godfather Part III entities ==="

# 1. People
echo ""
echo "--- People ---"
npm run generate -- person "Andy Garcia" "actor"
npm run generate -- person "Sofia Coppola" "actor"
npm run generate -- person "Joe Mantegna" "actor"
npm run generate -- person "Eli Wallach" "actor"
npm run generate -- person "Bridget Fonda" "actor"
npm run generate -- person "George Hamilton" "actor"
npm run generate -- person "Raf Vallone" "actor"

# 2. Movies
echo ""
echo "--- Movies ---"
npm run generate -- movie "The Godfather Part III"
npm run generate -- movie "The Godfather Coda: The Death of Michael Corleone"

# 3. Film Characters
echo ""
echo "--- Film Characters ---"
npm run generate -- character "Vincent Mancini-Corleone" "The Godfather Part III"
npm run generate -- character "Mary Corleone" "The Godfather Part III"
npm run generate -- character "Don Altobello" "The Godfather Part III"
npm run generate -- character "Joey Zasa" "The Godfather Part III"
npm run generate -- character "Archbishop Gilday" "The Godfather Part III"
npm run generate -- character "Cardinal Lamberto" "The Godfather Part III"
npm run generate -- character "Grace Hamilton" "The Godfather Part III"
npm run generate -- character "B.J. Harrison" "The Godfather Part III"
npm run generate -- character "Mosca" "The Godfather Part III"

# 4. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Vatican (Godfather)" "The Godfather Part III"
npm run generate -- location "Teatro Massimo" "The Godfather Part III"
npm run generate -- location "Atlantic City (Godfather)" "The Godfather Part III"
npm run generate -- location "Michael's Sicily Estate" "The Godfather Part III"

# 5. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Rome"
npm run generate -- filming-location "Palermo"

# 6. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "Immobiliare" "The Godfather Part III"
npm run generate -- organization "Vatican Bank" "The Godfather Part III"

# 7. Items/Events
echo ""
echo "--- Items ---"
npm run generate -- item "Cavalleria Rusticana Opera" "The Godfather Part III"
npm run generate -- item "Papal Assassination Plot" "The Godfather Part III"

# 8. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
