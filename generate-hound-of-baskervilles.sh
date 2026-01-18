#!/bin/bash

# The Hound of the Baskervilles - Entity Generation Script

set -e

echo "=== Generating The Hound of the Baskervilles entities ==="

# 1. Book
echo ""
echo "--- Book ---"
npm run generate -- book "The Hound of the Baskervilles"

# 2. Story Characters
echo ""
echo "--- Characters ---"
npm run generate -- character "Sir Henry Baskerville" "The Hound of the Baskervilles"
npm run generate -- character "Sir Charles Baskerville" "The Hound of the Baskervilles"
npm run generate -- character "Dr. James Mortimer" "The Hound of the Baskervilles"
npm run generate -- character "Jack Stapleton" "The Hound of the Baskervilles"
npm run generate -- character "Beryl Stapleton" "The Hound of the Baskervilles"
npm run generate -- character "Barrymore (Butler)" "The Hound of the Baskervilles"
npm run generate -- character "Mrs. Barrymore" "The Hound of the Baskervilles"
npm run generate -- character "Selden" "The Hound of the Baskervilles"
npm run generate -- character "Sir Hugo Baskerville" "The Hound of the Baskervilles"

# 3. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "Baskerville Hall" "The Hound of the Baskervilles"
npm run generate -- location "Dartmoor" "The Hound of the Baskervilles"
npm run generate -- location "Grimpen Mire" "The Hound of the Baskervilles"
npm run generate -- location "Merripit House" "The Hound of the Baskervilles"
npm run generate -- location "The Neolithic Huts" "The Hound of the Baskervilles"
npm run generate -- location "Coombe Tracey" "The Hound of the Baskervilles"

# 4. Items/Creatures
echo ""
echo "--- Items ---"
npm run generate -- item "The Hound" "The Hound of the Baskervilles"
npm run generate -- item "Sir Hugo's Manuscript" "The Hound of the Baskervilles"
npm run generate -- item "The Baskerville Curse" "The Hound of the Baskervilles"

# 5. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
