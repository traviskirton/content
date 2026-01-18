#!/bin/bash

# The Dark Knight Rises - Entity Generation Script
# Run from the content directory: ./generate-dark-knight-rises.sh

set -e

echo "=== Generating The Dark Knight Rises entities ==="

# 1. New People
echo ""
echo "--- New People ---"
npm run generate -- person "Tom Hardy" "actor"
npm run generate -- person "Anne Hathaway" "actor"
npm run generate -- person "Joseph Gordon-Levitt" "actor"
npm run generate -- person "Marion Cotillard" "actor"
npm run generate -- person "Matthew Modine" "actor"

# 2. Movie
echo ""
echo "--- Movie ---"
npm run generate -- movie "The Dark Knight Rises"

# 3. New Characters
echo ""
echo "--- New Characters ---"
npm run generate -- character "Bane" "The Dark Knight Rises"
npm run generate -- character "Selina Kyle" "The Dark Knight Rises"
npm run generate -- character "John Blake" "The Dark Knight Rises"
npm run generate -- character "Miranda Tate" "The Dark Knight Rises"
npm run generate -- character "Talia al Ghul" "The Dark Knight Rises"
npm run generate -- character "Deputy Commissioner Foley" "The Dark Knight Rises"

# 4. Update existing characters for full trilogy
echo ""
echo "--- Updating characters (full trilogy) ---"
npm run generate -- character "Bruce Wayne" "The Dark Knight Trilogy"
npm run generate -- character "Alfred Pennyworth" "The Dark Knight Trilogy"
npm run generate -- character "James Gordon" "The Dark Knight Trilogy"
npm run generate -- character "Lucius Fox" "The Dark Knight Trilogy"
npm run generate -- character "Ra's al Ghul" "The Dark Knight Trilogy"
npm run generate -- character "Jonathan Crane" "The Dark Knight Trilogy"

# 5. New Locations
echo ""
echo "--- New Locations ---"
npm run generate -- location "The Pit" "The Dark Knight Rises"
npm run generate -- location "Gotham Stock Exchange" "The Dark Knight Rises"
npm run generate -- location "Blackgate Prison" "The Dark Knight Rises"
npm run generate -- location "City Hall Gotham" "The Dark Knight Rises"

# 6. Update locations for full trilogy
echo ""
echo "--- Updating locations (full trilogy) ---"
npm run generate -- location "Gotham City" "The Dark Knight Trilogy"
npm run generate -- location "Wayne Manor" "The Dark Knight Trilogy"
npm run generate -- location "Batcave" "The Dark Knight Trilogy"
npm run generate -- location "Wayne Tower" "The Dark Knight Trilogy"

# 7. New Vehicles
echo ""
echo "--- New Vehicles ---"
npm run generate -- vehicle "The Bat" "The Dark Knight Rises"

# 8. Update vehicles for full trilogy
echo ""
echo "--- Updating vehicles ---"
npm run generate -- vehicle "Tumbler" "The Dark Knight Trilogy"
npm run generate -- vehicle "Batpod" "The Dark Knight Trilogy"

# 9. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Pittsburgh"
npm run generate -- filming-location "Los Angeles"
npm run generate -- filming-location "New York City"
npm run generate -- filming-location "Newark"
npm run generate -- filming-location "Jodhpur, India"
npm run generate -- filming-location "Wollaton Hall"
npm run generate -- filming-location "Cardington Airship Sheds"
npm run generate -- filming-location "Heinz Field"

# 10. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
