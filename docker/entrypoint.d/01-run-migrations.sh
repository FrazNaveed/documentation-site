#!/bin/bash

set -Eeo pipefail

cd /app
npm run payload migrate
cd -