#!/bin/bash

# clean
rm -rf lib css

# build styles
postcss assets/*.scss -d css --ext css

# transpile using babel
babel src --out-dir lib

# build umd output
webpack --progress
uglifyjs lib/zent-umd.js --compress warnings=false --mangle --output lib/zent-umd.min.js
