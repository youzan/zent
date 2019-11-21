#!/bin/bash

basepath=$(dirname $0)

# autoprefixer
postcss \
  assets \
  --dir $(mktemp -d) \
  --syntax postcss-scss \
  --use $(realpath $basepath/../plugins/postcss-plugin-lint.js) \
  --no-map
