#!/bin/bash

set -e

basepath=$(dirname $0)

# clean
echo "Clean up TypeScript output..."
rm -rf es

echo "Compile TypeScript..."
ttsc

$basepath/./cruiser.sh
