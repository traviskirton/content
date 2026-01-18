#!/bin/bash

# Batman Returns - Entity Generation Script
# Run from the content directory: ./generate-batman-returns.sh

set -e

echo "=== Generating Batman Returns entities ==="


# 5. New Locations
echo ""
echo "--- New Locations ---"
# npm run generate -- location "Gotham Plaza" "Batman Returns"
npm run generate -- location "Old Zoo" "Batman Returns"
npm run generate -- location "Shreck's Department Store" "Batman Returns"

# 6. Update locations
echo ""
echo "--- Updating locations ---"
npm run generate -- location "Gotham City (Burton)" "Burton Batman films"

# 7. New Vehicles
echo ""
echo "--- New Vehicles ---"
npm run generate -- vehicle "Batskiboat" "Batman Returns"
npm run generate -- vehicle "Duck Vehicle" "Batman Returns"

# 8. Filming Locations
echo ""
echo "--- Filming Locations ---"
npm run generate -- filming-location "Warner Bros. Studios Burbank"
npm run generate -- filming-location "Universal Studios Hollywood"

# 9. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
