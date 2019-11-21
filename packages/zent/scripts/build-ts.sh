#!/bin/bash

set -e

basepath=$(dirname $0)

# clean
echo "Clean up TypeScript output..."
rm -rf es

# generate icon types from zenticons
node $basepath/./generate-icon-type.js

echo "Compile TypeScript..."
ttsc

$basepath/./cruiser.sh
