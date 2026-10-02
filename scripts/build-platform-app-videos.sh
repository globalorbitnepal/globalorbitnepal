#!/usr/bin/env bash
# Builds unique platform preview clips from studio masters (different segment + crop per file).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
FF="${FFMPEG:-$ROOT/node_modules/@ffmpeg-installer/linux-x64/ffmpeg}"
BRAND="$ROOT/public/brand"
OUT="$BRAND/platform-apps"

P="$BRAND/custom-apps/01-customer-portal.mp4"
A="$BRAND/custom-apps/02-admin-dashboard.mp4"
M="$BRAND/custom-apps/03-mobile-booking.mp4"
F="$BRAND/custom-apps/04-field-operations.webm"

if [[ ! -x "$FF" ]]; then
  echo "ffmpeg not found at $FF — run: npm install @ffmpeg-installer/ffmpeg"
  exit 1
fi

WEB_LAND='scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2,setsar=1'
WEB_LAND_4K='scale=2560:1440:force_original_aspect_ratio=decrease,pad=2560:1440:(ow-iw)/2:(oh-ih)/2,setsar=1'
PORTRAIT='scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1'
PORTRAIT_WIDE='scale=1215:2160:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1'

encode_mp4() {
  local out="$1" ss="$2" dur="$3" vf="$4" inp="$5"
  "$FF" -y -ss "$ss" -t "$dur" -i "$inp" -an \
    -vf "$vf" -c:v libx264 -preset fast -crf 22 -movflags +faststart \
    "$out"
}

encode_webm() {
  local out="$1" ss="$2" dur="$3" vf="$4" inp="$5"
  "$FF" -y -ss "$ss" -t "$dur" -i "$inp" -an \
    -vf "$vf" -c:v libvpx-vp9 -b:v 1800k -row-mt 1 \
    "$out"
}

mkdir -p "$OUT/web" "$OUT/android" "$OUT/ios"

echo "Web Apps (landscape)…"
encode_mp4 "$OUT/web/hero-main.mp4"      0   11 "$WEB_LAND_4K" "$P"
encode_mp4 "$OUT/web/01-portal.mp4"      2   9  "$WEB_LAND_4K" "$P"
encode_mp4 "$OUT/web/02-admin.mp4"     0   10 "$WEB_LAND"     "$A"
encode_mp4 "$OUT/web/03-responsive.mp4" 0  12 "$WEB_LAND"     "$M"
encode_webm "$OUT/web/04-pwa.webm"     0   9  "$WEB_LAND"     "$F"

echo "Android Apps (portrait)…"
encode_mp4 "$OUT/android/hero-main.mp4"   0.5 10 "$PORTRAIT"      "$M"
encode_mp4 "$OUT/android/01-playstore.mp4" 4   9  "$PORTRAIT"      "$M"
encode_mp4 "$OUT/android/02-compose.mp4"   0   8  "$PORTRAIT_WIDE" "$P"
encode_mp4 "$OUT/android/03-fcm.mp4"       1   9  "$PORTRAIT"      "$A"
encode_mp4 "$OUT/android/04-offline.mp4"   2   7  "$PORTRAIT"      "$F"

echo "iOS Apps (portrait, different segments)…"
encode_webm "$OUT/ios/hero-main.webm"     3.5 9  "$PORTRAIT_WIDE" "$P"
encode_mp4 "$OUT/ios/01-store.mp4"        6   7  "$PORTRAIT_WIDE" "$P"
encode_mp4 "$OUT/ios/02-swiftui.mp4"      8   7  "$PORTRAIT"      "$M"
encode_mp4 "$OUT/ios/03-testflight.mp4"   4   7  "$PORTRAIT"      "$A"
encode_mp4 "$OUT/ios/04-widgets.mp4"      4   6  "$PORTRAIT"      "$F"

echo "Done. Unique outputs under $OUT"
