#!/bin/bash

set -e

mkdir -p packages/zent/lib
node packages/zent/scripts/generate-module-config.js
yarn workspace zent test
yarn workspace babel-plugin-zent test
