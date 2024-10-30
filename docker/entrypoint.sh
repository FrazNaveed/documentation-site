#!/usr/bin/env bash
set -Eeo pipefail

# file taken from
# postgres:alpine@sha256:b910575268455ec1748ad35f07349887a526fb90951b16ffda7d634c95231b92 image

_is_sourced() {
    # https://unix.stackexchange.com/a/215279
    [ "${#FUNCNAME[@]}" -ge 2 ] \
        && [ "${FUNCNAME[0]}" = '_is_sourced' ] \
        && [ "${FUNCNAME[1]}" = 'source' ]
}

docker_process_init_files() {
    printf '\n'
    local f
    for f; do
        case "$f" in
            *.sh)
                # https://github.com/docker-library/postgres/issues/450#issuecomment-393167936
                # https://github.com/docker-library/postgres/pull/452
                if [ -x "$f" ]; then
                    printf '%s: running %s\n' "$0" "$f"
                    "$f"
                else
                    printf '%s: sourcing %s\n' "$0" "$f"
                    . "$f"
                fi
                ;;
            *)  printf '%s: ignoring %s\n' "$0" "$f" ;;
        esac
        printf '\n'
    done
}


if ! _is_sourced; then
    docker_process_init_files /docker-entrypoint.d/*
    exec "$@"
fi