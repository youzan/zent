#!/bin/bash

basepath=$(dirname $0)

function check_result {
  if [ $? -ne 0 ]; then
    exit -1
  fi
}

if [[ -z "${CI}" ]]; then
  jest -c jest.config.json "$@"
else
  jest -c jest.config.json --runInBand "$@"
fi

check_result

# Only upload if we're on travis
if [[ -n "${TRAVIS}" ]]; then
  echo 'Uploading coverage info...'
  cat $basepath/../coverage/lcov.info | $basepath/../node_modules/.bin/coveralls

  check_result
fi
