#!/bin/bash

set -e

basepath=$(dirname $0)

cat <<EOF > "$basepath/../src/invalidate-ts-cache.ts"
/**
 * This file is auto generated to invalidate TypeScript build cache.
 * ts-loader fails with 'Error: Debug Failure. False expression.' if TypeScript build cache is reused upon each build.
 * DO NOT EDIT
 */
export const timestamp = $(date +%s);
EOF

echo 'TypeScript build cache invalidated'

