#!/bin/bash

basepath=$(dirname $0)
RED='\033[0;31m'

fail () {
  printf "${RED}$@\n\n"
  exit -1
}

grep -RliE '#[0-9a-f]{3}|rgb\(\d+,\s*\d+,\s*\d+\)|rgba\(\d+,\s*\d+,\s*\d+,\s*[0-9\.]+\)' --exclude-dir="theme" $basepath/../assets/

if [ $? -eq 0 ]; then
  fail "\nArbitrary colors are not supported in styles.\nYou can only use the colors defined in theme/default.pcss."
fi
