#!/bin/zsh

cd "$(dirname "$0")" || exit 1

PREVIEW_PORT=4173
PREVIEW_URL="http://localhost:${PREVIEW_PORT}"

if ! command -v python3 >/dev/null 2>&1; then
  echo "Python 3 is needed to run the local preview."
  echo "You can still open index.html directly in a browser."
  read -r "?Press Return to close."
  exit 1
fi

echo "Astrobiology Tool Explorer"
echo "Preview: ${PREVIEW_URL}"
echo "Keep this window open while editing. Press Control-C to stop."

(sleep 0.8; open "${PREVIEW_URL}") &
python3 -m http.server "${PREVIEW_PORT}" --bind 127.0.0.1
