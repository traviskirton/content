#!/bin/bash

# A Study in Scarlet - Entity Generation Script

set -e

echo "=== Generating A Study in Scarlet entities ==="

# 1. Author
echo ""
echo "--- Author ---"
npm run generate -- author "Arthur Conan Doyle"

# 2. Franchise
echo ""
echo "--- Franchise ---"
npm run generate -- franchise "Sherlock Holmes"

# 3. Book
echo ""
echo "--- Book ---"
npm run generate -- book "A Study in Scarlet"

# 4. Core Characters
echo ""
echo "--- Core Characters ---"
npm run generate -- character "Sherlock Holmes" "Sherlock Holmes"
npm run generate -- character "Dr. John Watson" "Sherlock Holmes"
npm run generate -- character "Mrs. Hudson" "Sherlock Holmes"
npm run generate -- character "Inspector Lestrade" "Sherlock Holmes"
npm run generate -- character "Inspector Gregson" "A Study in Scarlet"

# 5. Story-Specific Characters
echo ""
echo "--- Story Characters ---"
npm run generate -- character "Jefferson Hope" "A Study in Scarlet"
npm run generate -- character "Enoch Drebber" "A Study in Scarlet"
npm run generate -- character "Joseph Stangerson" "A Study in Scarlet"
npm run generate -- character "Lucy Ferrier" "A Study in Scarlet"
npm run generate -- character "John Ferrier" "A Study in Scarlet"

# 6. Locations
echo ""
echo "--- Locations ---"
npm run generate -- location "221B Baker Street" "Sherlock Holmes"
npm run generate -- location "Lauriston Gardens" "A Study in Scarlet"
npm run generate -- location "Salt Lake City (Study in Scarlet)" "A Study in Scarlet"

# 7. Items
echo ""
echo "--- Items ---"
npm run generate -- item "Holmes's Pipe" "Sherlock Holmes"
npm run generate -- item "Holmes's Magnifying Glass" "Sherlock Holmes"
npm run generate -- item "Holmes's Chemistry Set" "Sherlock Holmes"
npm run generate -- item "The Wedding Ring (Study in Scarlet)" "A Study in Scarlet"

# 8. Organizations
echo ""
echo "--- Organizations ---"
npm run generate -- organization "Scotland Yard" "Sherlock Holmes"
npm run generate -- organization "The Danites" "A Study in Scarlet"

# 9. Build index
echo ""
echo "--- Building index ---"
npm run build

echo ""
echo "=== Done! ==="
