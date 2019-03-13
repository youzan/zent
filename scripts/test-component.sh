#!/bin/bash

set -e

pushd packages/zent
mkdir -p lib
node scripts/generate-module-config.js
jest -c jest.config.json __tests__/$1
popd
