#!/bin/bash

# Ensure everyone installs the git hook.
# The result is a guess, but false positive
# is not an issue here.

RED='\033[0;31m'
basepath=$(dirname $0)

fail () {
    printf "${RED}$@\nAborting\n"
    exit -1
}

pushd $basepath/.. >/dev/null 2>&1
yarn prettify
changes=$(git diff-index HEAD | grep -v babelrc | grep -v 'yarn.lock')
change_count=$(echo "$changes" | sed '/^\s*$/d' | wc -l)
popd >/dev/null 2>&1

if [ "$change_count" -gt 0 ]; then
  echo "$changes"
  fail 'Git hooks not installed. Follow these instructions on your local machine:\n1. yarn install\n2. yarn prettify\n3. Commit your changes and push.'
fi
