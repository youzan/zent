#!/bin/bash

set -e

mkdir -p packages/zent/lib
node packages/zent/scripts/generate-module-config.js
pushd packages/zent && yarn test && popd
pushd packages/babel-plugin-zent && yarn test && popd
