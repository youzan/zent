#!/bin/bash

realpath() {
    [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}

realpath "$0"

basepath=$(dirname $0)

input=${1:-assets}

# autoprefixer
postcss \
  "$input" \
  --dir $(mktemp -d) \
  --syntax postcss-scss \
  --use $(realpath $basepath/../plugins/postcss-plugin-vars.js) \
  --no-map
