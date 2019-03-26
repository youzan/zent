#!/bin/bash

set -e

mkdir -p packages/zent/lib
ts-node --project packages/zent/scripts/cruiser/tsconfig.json  packages/zent/scripts/cruiser/index.ts packages/zent/src/index.ts packages/zent/assets
yarn workspace zent test
yarn workspace babel-plugin-zent test
