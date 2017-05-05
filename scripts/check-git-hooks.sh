#!/bin/bash

# Ensure everyone installs the git hook.
# The result is a guess.

RED='\033[0;31m'
basepath=$(dirname $0)

fail () {
    printf "${RED}$@\nAborting\n"
    exit -1
}

pushd $basepath/.. >/dev/null 2>&1
yarn prettify
git diff-index --quiet HEAD --
rv=$?
popd >/dev/null 2>&1

if [ $rv -ne 0 ]; then
  fail 'Git hooks not installed. Follow these instructions on your local machine:\n1. yarn install\n2. yarn prettify\n3. Commit your changes and push.'
fi
