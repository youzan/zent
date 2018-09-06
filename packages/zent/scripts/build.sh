#!/bin/bash

set -e

basepath=$(dirname $0)

$basepath/validate-pop-size.sh

# Ensure only colors defined in themes are used
$basepath/check-style-colors.sh

# clean
rm -rf lib css

# build styles
postcss assets/*.pcss -d css --ext css

# transpile using babel
cross-env BABEL_ENV=transpile babel src --out-dir lib

# babel 6 doesn't support env specific preset option
cp -fp .babelrc .babelrc.bak
cp -fp .es-babelrc .babelrc
cross-env BABEL_ENV=es babel src --out-dir es
cp -fp .babelrc .es-babelrc
cp -fp .babelrc.bak .babelrc
rm -rf .babelrc.bak

# build umd output
cross-env NODE_ENV=production webpack --progress
echo 'Minify umd bundle...'
uglifyjs lib/zent-umd.js --compress warnings=false --mangle --output lib/zent-umd.min.js

echo 'Generate component mapping...'
node ./scripts/generate-module-config.js
