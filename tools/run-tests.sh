#!/usr/bin/env bash
# Запускає tests/index.html у headless Chrome і повертає 0, якщо всі тести пройшли.
# Потрібні: python3, google-chrome (або chromium).
set -euo pipefail
cd "$(dirname "$0")/.."

CHROME="${CHROME:-$(command -v google-chrome || command -v chromium || command -v chromium-browser || true)}"
if [ -z "$CHROME" ]; then echo "Chrome не знайдено (задайте CHROME=/шлях)"; exit 2; fi

PORT="${PORT:-8791}"
python3 -m http.server "$PORT" --bind 127.0.0.1 >/dev/null 2>&1 &
SERVER=$!
trap 'kill $SERVER 2>/dev/null || true' EXIT
sleep 0.5

OUT=$("$CHROME" --headless=new --disable-gpu --no-sandbox --virtual-time-budget=20000 \
  --user-data-dir="$(mktemp -d)" --dump-dom "http://127.0.0.1:$PORT/tests/" 2>/dev/null || true)

SUMMARY=$(printf '%s' "$OUT" | sed -n 's/.*<title>\([^<]*\)<\/title>.*/\1/p' | head -1)
echo "$SUMMARY"
printf '%s' "$OUT" | grep -o '<li class="fail">[^<]*' | sed 's/<li class="fail">//' || true
case "$SUMMARY" in
  PASS*) exit 0 ;;
  *) exit 1 ;;
esac
