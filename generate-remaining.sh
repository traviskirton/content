#!/bin/bash

# Generate remaining entities using batch approach with chunk-size=5
# These are the scripts from generate-all.sh that haven't been run yet

set -e

BATCHES=(
  # Books - Foundation Trilogy
  "foundation.json"
  "foundation-and-empire.json"
  "second-foundation.json"

  # Books - Gibson Cyberpunk
  "neuromancer.json"
  "mona-lisa-overdrive.json"

  # Books - Creative Selection
  "creative-selection.json"

  # Books - Locke Lamora
  "locke-lamora.json"

  # Books - Lord of the Rings
  "fellowship-of-the-ring.json"
  "two-towers.json"
  "return-of-the-king.json"
  "the-hobbit.json"

  # Books - Sherlock Holmes
  "study-in-scarlet.json"
  "hound-of-baskervilles.json"
  "speckled-band.json"

  # Books - James Bond
  "from-russia-with-love.json"
  "goldfinger.json"

  # Books - Discworld
  "discworld.json"

  # Books - le Carré
  "tinker-tailor.json"
  "smileys-people.json"

  # Books - The Godfather
  "the-godfather.json"

  # Films - The Godfather Trilogy
  "godfather-film.json"
  "godfather-part-ii.json"
  "godfather-part-iii.json"
)

CHECKPOINT_FILE=".batch-checkpoint"

# Get the last completed batch index from checkpoint
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
echo "=== Batch Generation Script (chunk-size=5) ==="
echo ""

LAST_COMPLETED=$(get_checkpoint)
TOTAL=${#BATCHES[@]}

if [ "$LAST_COMPLETED" -ge 0 ]; then
  echo "Resuming from checkpoint: completed $((LAST_COMPLETED + 1))/$TOTAL batches"
  echo ""
fi

for i in "${!BATCHES[@]}"; do
  # Skip already completed batches
  if [ "$i" -le "$LAST_COMPLETED" ]; then
    echo "[$((i + 1))/$TOTAL] Skipping ${BATCHES[$i]} (already completed)"
    continue
  fi

  BATCH="${BATCHES[$i]}"
  echo ""
  echo "========================================"
  echo "[$((i + 1))/$TOTAL] Processing $BATCH"
  echo "========================================"
  echo ""

  if [ -f "./batches/$BATCH" ]; then
    npm run generate-batch -- "batches/$BATCH" --chunk-size=5

    # Save checkpoint after successful completion
    save_checkpoint "$i"
    echo ""
    echo "[$((i + 1))/$TOTAL] Completed $BATCH"
  else
    echo "WARNING: Batch not found: $BATCH"
    echo "Skipping..."
  fi
done

# Clean up checkpoint on full completion
rm -f "$CHECKPOINT_FILE"

echo ""
echo "========================================"
echo "=== All batches complete! ==="
echo "========================================"
echo ""

# Run reconcile and build
echo "Running reconcile..."
npm run reconcile

echo ""
echo "Running final build..."
npm run build

echo ""
echo "Generation complete!"
