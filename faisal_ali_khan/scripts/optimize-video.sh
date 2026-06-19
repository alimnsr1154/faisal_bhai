#!/usr/bin/env bash
# Re-encode site videos to web-friendly H.264 MP4 (capped at 1080p) and
# generate a poster JPEG for each. Outputs <name>.opt.mp4 and <name>.poster.jpg
# next to each source so markup can switch over without losing originals.
set -euo pipefail

shopt -s nullglob

# Explicit list of videos in use (avoids re-encoding stray files).
videos=(
  "assets/Untitled design (1).mp4"
  "assets/Untitled design.mp4"
  "assets/testimonails/1.mp4"
  "assets/testimonails/2.mp4"
  "assets/testimonails/3.mp4"
  "assets/testimonails/4.mp4"
  "assets/testimonails/5.mp4"
  "assets/ui-ux/Full Stack Developer UI_UX DESIGN WED and APP development Showreel - Trim.mp4"
)

for src in "${videos[@]}"; do
  [ -f "$src" ] || { echo "missing: $src"; continue; }
  dir=$(dirname "$src")
  base=$(basename "$src" .mp4)
  out="$dir/$base.opt.mp4"
  poster="$dir/$base.poster.jpg"

  echo "encoding: $src"
  ffmpeg -y -i "$src" \
    -vf "scale='min(1920,iw)':-2" \
    -c:v libx264 -preset slow -crf 26 -movflags +faststart \
    -c:a aac -b:a 96k \
    "$out" -loglevel error

  # Poster from first representative frame (1s in).
  ffmpeg -y -ss 00:00:01 -i "$src" -frames:v 1 -q:v 4 "$poster" -loglevel error || \
  ffmpeg -y -i "$src" -frames:v 1 -q:v 4 "$poster" -loglevel error

  echo "  -> $out + $poster"
done

echo "Done."
