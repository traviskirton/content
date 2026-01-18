#!/bin/bash

# The Hobbit - Entity Generation Script

set -e

echo "=== Generating The Hobbit entities ==="

# 1. Book
echo ""
echo "--- Book ---"
npm run generate -- book "The Hobbit"

# 2. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Thorin Oakenshield" "The Hobbit"
npm run generate -- character "Smaug" "The Hobbit"
npm run generate -- character "Bard the Bowman" "The Hobbit"
npm run generate -- character "Beorn" "The Hobbit"
npm run generate -- character "Thranduil" "The Hobbit"
npm run generate -- character "The Great Goblin" "The Hobbit"
npm run generate -- character "Balin" "The Hobbit"
npm run generate -- character "Dwalin" "The Hobbit"
npm run generate -- character "Fíli" "The Hobbit"
npm run generate -- character "Kíli" "The Hobbit"

# 3. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Erebor" "The Hobbit"
npm run generate -- location "Lake-town" "The Hobbit"
npm run generate -- location "Mirkwood" "The Hobbit"
npm run generate -- location "Goblin-town" "The Hobbit"
npm run generate -- location "The Lonely Mountain" "The Hobbit"

# 4. Items
echo ""
echo "--- Items ---"
npm run generate -- item "Arkenstone" "The Hobbit"
npm run generate -- item "Orcrist" "The Hobbit"
npm run generate -- item "Glamdring" "The Hobbit"

# 5. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
