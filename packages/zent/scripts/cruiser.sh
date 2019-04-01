#!/bin/bash

set -e

basepath=$(dirname $0)

echo 'Generate component dependency graph...'
ts-node --project $basepath/./cruiser/tsconfig.json  $basepath/./cruiser/index.ts $basepath/../src/index.ts $basepath/../assets
