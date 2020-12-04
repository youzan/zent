#!/bin/bash

set -e

basepath=$(dirname $0)

# clean
echo "Clean up TypeScript output..."
rm -rf es

# Generate unicode regexps
node $basepath/./generate-unicode-regexp.js

echo "Compile TypeScript..."
ttsc

$basepath/./cruiser.sh
