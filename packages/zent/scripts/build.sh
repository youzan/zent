#!/bin/bash

# clean
rm -rf lib css

# build styles
postcss assets/*.scss -d css --ext css

# transpile using babel
cross-env BABEL_ENV=transpile babel src --out-dir lib

# build umd output
cross-env NODE_ENV=production webpack --progress
echo 'Minify umd bundle...'
uglifyjs lib/zent-umd.js --compress warnings=false --mangle --output lib/zent-umd.min.js
