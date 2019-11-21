#!/bin/bash

basepath=$(dirname $0)

# autoprefixer
postcss \
  assets/animation/_zoom.scss \
  --dir $(mktemp -d) \
  --syntax postcss-scss \
  --use $(realpath $basepath/../plugins/postcss-plugin-lint.js) \
  --no-map
