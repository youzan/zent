#!/bin/bash

set -e

basepath=$(dirname $0)

rm -rf umd

$basepath/./build-theme.sh
$basepath/./build-ts.sh

rollup -c rollup.config.js
