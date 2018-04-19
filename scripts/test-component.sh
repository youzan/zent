#!/bin/bash

set -e

mkdir -p packages/zent/lib
node packages/zent/scripts/generate-module-config.js
jest -c packages/zent/jest.config.json packages/zent/__tests__/$1
