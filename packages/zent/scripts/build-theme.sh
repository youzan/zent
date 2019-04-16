#!/bin/bash

set -e

basepath=$(dirname $0)

$basepath/validate-pop-size.sh

# Ensure only colors defined in themes are used
$basepath/check-style-colors.sh

# clean
echo "Clean up..."
rm -rf lib es css

# transpile scss to css
# custom importer for @import '~some-node-module'
echo "Compile styles..."
node-sass \
  --importer $basepath/../../../node_modules/node-sass-magic-importer/dist/cli.js \
  assets -o css -q

# autoprefixer
postcss css --use autoprefixer --replace --no-map

# minify index.css
cleancss -o css/index.min.css css/index.css

echo "Done! Custom styles are in css directory."
