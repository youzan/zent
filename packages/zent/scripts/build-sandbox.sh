#!/bin/bash

set -e

basepath=$(dirname $0)

rm -rf umd

$basepath/./build-theme.sh
$basepath/./build-ts.sh

cross-env NODE_ENV=development webpack --config webpack.sandbox.config.js
cross-env NODE_ENV=production webpack --config webpack.sandbox.config.js

