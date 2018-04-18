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
git diff-index HEAD --
rv=$?
echo $rv
git diff --name-only --exit-code
popd >/dev/null 2>&1

if [ $rv -ne 0 ]; then
  git diff --name-only --exit-code
  fail 'Git hooks not installed. Follow these instructions on your local machine:\n1. yarn install\n2. yarn prettify\n3. Commit your changes and push.'
fi
