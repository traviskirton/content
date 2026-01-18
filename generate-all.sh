#!/bin/bash

# Master Generation Script
# Runs all generation scripts in order with checkpoint tracking
# If interrupted, re-run this script to resume from where it left off

set -e

CHECKPOINT_FILE=".generation-checkpoint"
SCRIPTS=(
  # Books - Foundation Trilogy
  "generate-foundation.sh"
  "generate-foundation-and-empire.sh"
  "generate-second-foundation.sh"

  # Books - Gibson Cyberpunk
  "generate-neuromancer.sh"
  "generate-mona-lisa-overdrive.sh"

  # Books - Creative Selection
  "generate-creative-selection.sh"

  # Books - Locke Lamora
  "generate-locke-lamora.sh"

  # Books - Lord of the Rings
  "generate-fellowship-of-the-ring.sh"
  "generate-two-towers.sh"
  "generate-return-of-the-king.sh"
  "generate-the-hobbit.sh"

  # Books - Sherlock Holmes
  "generate-study-in-scarlet.sh"
  "generate-hound-of-baskervilles.sh"
  "generate-speckled-band.sh"

  # Books - James Bond
  "generate-from-russia-with-love.sh"
  "generate-goldfinger.sh"

  # Books - Discworld
  "generate-discworld.sh"

  # Books - le Carré
  "generate-tinker-tailor.sh"
  "generate-smileys-people.sh"

  # Books - The Godfather
  "generate-the-godfather.sh"

  # Films - The Godfather Trilogy
  "generate-godfather-film.sh"
  "generate-godfather-part-ii.sh"
  "generate-godfather-part-iii.sh"
)

# Get the last completed script index from checkpoint
get_checkpoint() {
  if [ -f "$CHECKPOINT_FILE" ]; then
    cat "$CHECKPOINT_FILE"
  else
    echo "-1"
  fi
}

# Save checkpoint
save_checkpoint() {
  echo "$1" > "$CHECKPOINT_FILE"
}

# Main execution
echo "=== Master Generation Script ==="
echo ""

LAST_COMPLETED=$(get_checkpoint)
TOTAL=${#SCRIPTS[@]}

if [ "$LAST_COMPLETED" -ge 0 ]; then
  echo "Resuming from checkpoint: completed $((LAST_COMPLETED + 1))/$TOTAL scripts"
  echo ""
fi

for i in "${!SCRIPTS[@]}"; do
  # Skip already completed scripts
  if [ "$i" -le "$LAST_COMPLETED" ]; then
    echo "[$((i + 1))/$TOTAL] Skipping ${SCRIPTS[$i]} (already completed)"
    continue
  fi

  SCRIPT="${SCRIPTS[$i]}"
  echo ""
  echo "========================================"
  echo "[$((i + 1))/$TOTAL] Running $SCRIPT"
  echo "========================================"
  echo ""

  if [ -f "./$SCRIPT" ]; then
    # Run the script, if it fails we exit and can resume later
    ./"$SCRIPT"

    # Save checkpoint after successful completion
    save_checkpoint "$i"
    echo ""
    echo "[$((i + 1))/$TOTAL] Completed $SCRIPT"
  else
    echo "WARNING: Script not found: $SCRIPT"
    echo "Skipping..."
  fi
done

# Clean up checkpoint on full completion
rm -f "$CHECKPOINT_FILE"

echo ""
echo "========================================"
echo "=== All generation scripts complete! ==="
echo "========================================"
echo ""

# Final build and reconcile
echo "Running final build..."
npm run build

echo ""
echo "Generation complete! Total entities:"
npm run build 2>&1 | grep "Stats:"
