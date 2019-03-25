#!/bin/bash

set -e

pushd packages/zent >/dev/null 2>&1
mkdir -p lib
ts-node --project scripts/cruiser/tsconfig.json  scripts/cruiser/index.ts src/index.ts assets
jest -c jest.config.json __tests__/$1
popd >/dev/null 2>&1
