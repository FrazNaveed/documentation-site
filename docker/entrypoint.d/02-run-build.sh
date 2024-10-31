#!/bin/bash

set -Eeo pipefail

cd /app
npm run build

cp -r /app/.next/standalone/. /runtime
cp -r /app/public/. /runtime/public
mkdir -p /runtime/.next
cp -r /app/.next/static/. /runtime/.next/static

cd -