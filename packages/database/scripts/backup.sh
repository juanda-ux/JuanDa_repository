#!/usr/bin/env bash
set -euo pipefail

TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
OUTPUT_DIR=${1:-"./backups"}
mkdir -p "$OUTPUT_DIR"

pg_dump "$DATABASE_URL" > "$OUTPUT_DIR/websmith_${TIMESTAMP}.sql"
echo "Backup stored at $OUTPUT_DIR/websmith_${TIMESTAMP}.sql"
