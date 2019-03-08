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
echo "Compiling styles..."
node-sass \
  --importer $basepath/../../../node_modules/node-sass-magic-importer/dist/cli.js \
  assets -o css -q

# autoprefixer
postcss css --use autoprefixer --replace --no-map

# minify index.css
cleancss -o css/index.min.css css/index.css

# transpile using babel
# cross-env BABEL_ENV=transpile babel src --out-dir lib
# cross-env BABEL_ENV=es babel src --out-dir es
echo "Compiling esm..."
tsc

echo "Compiling commonjs..."
tsc --outDir lib --module commonjs

# echo 'Generate component mapping...'
# node ./scripts/generate-module-config.js
