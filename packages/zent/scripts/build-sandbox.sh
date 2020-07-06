#!/bin/bash

set -e

basepath=$(dirname $0)

rm -rf sandbox


$basepath/./build-theme.sh

echo "Generating sandbox entry file..."
node ./scripts/generate-sandbox-entry.js
$basepath/./build-ts.sh

echo "Packing sandbox file..."
webpack --config webpack.sandbox.config.js
echo "Minimize sandbox file..."
terser -c -m -o ./sandbox/zent.sandbox.min.js ./sandbox/zent.sandbox.js

