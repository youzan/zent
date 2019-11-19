#!/bin/bash

set -e

basepath=$(dirname $0)

# Ensure only colors defined in themes are used
$basepath/check-style-colors.sh

# clean
echo "Clean up TypeScript output..."
rm -rf es

# generate icon types from zenticons
node $basepath/./generate-icon-type.js

echo "Compile TypeScript..."
tsc

$basepath/./cruiser.sh
