#!/bin/bash
# Compress hero video for better LCP (currently ~5MB).
# Requires ffmpeg: brew install ffmpeg
#
# Usage: ./scripts/compress-hero-video.sh

set -e
INPUT="public/videos/hero.mp4"
OUTPUT="public/videos/hero-compressed.mp4"
BACKUP="public/videos/hero-original.mp4"

if [ ! -f "$INPUT" ]; then
  echo "Error: $INPUT not found"
  exit 1
fi

echo "Backing up original to $BACKUP"
cp "$INPUT" "$BACKUP"

echo "Compressing (CRF 28, no audio)..."
ffmpeg -i "$INPUT" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart "$OUTPUT" -y

echo "Replacing original..."
mv "$OUTPUT" "$INPUT"

echo "Done. Original backed up at $BACKUP"
echo "Run 'ls -la public/videos/' to compare sizes"
