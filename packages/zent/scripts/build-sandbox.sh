#!/bin/bash

set -e

basepath=$(dirname $0)

rm -rf umd


$basepath/./build-theme.sh

echo "Generating sandbox entry file..."
node ./scripts/generate-sandbox-entry.js
$basepath/./build-ts.sh

echo "Packing sandbox umd file..."
webpack --config webpack.sandbox.config.js
echo "Minimize sandbox umd file..."
terser -c -m -o ./sandbox/zent.sandbox.min.js ./sandbox/zent.sandbox.js

