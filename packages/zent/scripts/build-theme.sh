#!/bin/bash

set -e

basepath=$(dirname $0)

# clean
echo "Clean up style output..."
rm -rf css

# transpile scss to css
# custom importer for @import '~some-node-module'
echo "Compile styles..."
node $basepath/./compile-style.js

# autoprefixer, put it at last
postcss \
  css \
  --use $(realpath $basepath/../plugins/postcss-plugin-constants) \
  --use $(realpath $basepath/../plugins/postcss-plugin-version-attribute) \
  --use autoprefixer \
  --replace \
  --no-map

# minify index.css
postcss css/index.css --use cssnano --no-map -o css/index.min.css
