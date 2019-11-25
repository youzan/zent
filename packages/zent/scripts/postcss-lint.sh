#!/bin/bash

basepath=$(dirname $0)

input=${1:-assets}

# autoprefixer
postcss \
  "$input" \
  --dir $(mktemp -d) \
  --syntax postcss-scss \
  --use $(realpath $basepath/../plugins/postcss-plugin-lint.js) \
  --no-map
