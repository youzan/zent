#!/bin/bash

set -e

basepath=$(dirname $0)

if [[ -z "${CI}" ]]; then
  jest -c jest.config.json "$@"
else
  jest -c jest.config.json --runInBand "$@"
fi

# Only upload if we're on travis
if [[ -n "${TRAVIS}" ]]; then
  echo 'Uploading coverage info...'
  cat $basepath/../coverage/lcov.info | $basepath/../../../node_modules/.bin/coveralls
fi
