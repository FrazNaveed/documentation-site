#!/bin/bash
VERSION=v1.1.16
set -o allexport; source .env; set +o allexport
if [ -z "${PGPASS+x}" ]; then
  echo "Error: set PGPASS variable"
  exit 1
fi

docker build --push --build-arg PAYLOAD_SECRET=${PAYLOAD_SECRET} --build-arg POSTGRES_URL=${POSTGRES_URL} -f Dockerfile-static -t europe-west1-docker.pkg.dev/flare-network-staging/containers/websitev4:${VERSION} .
docker build --push --build-arg PAYLOAD_SECRET=${PAYLOAD_SECRET} --build-arg POSTGRES_URL=${POSTGRES_URL} -f Dockerfile-init -t europe-west1-docker.pkg.dev/flare-network-staging/containers/websitev4-init:${VERSION} .
