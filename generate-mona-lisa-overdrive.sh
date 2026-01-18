#!/bin/bash

# Mona Lisa Overdrive - Entity Generation Script

set -e

echo "=== Generating Mona Lisa Overdrive entities ==="

# 1. Book
echo ""
echo "--- Book ---"
npm run generate -- book "Mona Lisa Overdrive"

# 2. Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Mona Lisa" "Mona Lisa Overdrive"
npm run generate -- character "Angie Mitchell" "Mona Lisa Overdrive"
npm run generate -- character "Bobby Newmark" "Mona Lisa Overdrive"
npm run generate -- character "Slick Henry" "Mona Lisa Overdrive"
npm run generate -- character "Kumiko Yanaka" "Mona Lisa Overdrive"
npm run generate -- character "Sally Shears" "Mona Lisa Overdrive"

# 3. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Dog Solitude" "Mona Lisa Overdrive"
npm run generate -- location "The Sprawl (Mona Lisa)" "Mona Lisa Overdrive"
npm run generate -- location "London (Mona Lisa)" "Mona Lisa Overdrive"

# 4. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "Sense/Net" "Mona Lisa Overdrive"

# 5. Items
echo ""
echo "--- Items ---"
npm run generate -- item "Aleph" "Mona Lisa Overdrive"

# 6. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
