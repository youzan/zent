#!/bin/bash

set -e

basepath=$(dirname $0)

yarn workspace zent add "zenticon@$1"
node $basepath/./generate-icon-grid.js
node $basepath/./generate-icon-type.js
