#!/bin/bash

basepath=$(dirname $0)

function check_result {
  if [ $? -ne 0 ]; then
    exit -1
  fi
}

$basepath/validate-pop-size.sh
check_result

# clean
rm -rf lib css
check_result

# build styles
postcss assets/*.pcss -d css --ext css
check_result

# transpile using babel
cross-env BABEL_ENV=transpile babel src --out-dir lib
check_result

# build umd output
cross-env NODE_ENV=production webpack --progress
check_result
echo 'Minify umd bundle...'
uglifyjs lib/zent-umd.js --compress warnings=false --mangle --output lib/zent-umd.min.js
check_result

echo 'Generate component mapping...'
node ./scripts/generate-module-config.js
