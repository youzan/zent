#!/bin/bash

basepath=$(dirname $0)

input=${1:-assets}

postcss \
  "$input" \
  --dir $(mktemp -d) \
  --syntax postcss-scss \
  --use $(realpath $basepath/../plugins/postcss-generate-theme-css-vars.js) \
  --no-map
