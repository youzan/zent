#!/bin/bash

# yarn has trouble running install hooks in packages

basepath=$(dirname $0)

rm -rf $basepath/../.git/hooks
node $basepath/../node_modules/husky/bin/install.js
