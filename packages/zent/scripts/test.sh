#!/bin/bash

basepath=$(dirname $0)

if [[ -z "${CI}" ]]; then
  jest -c jest.config.json "$@"
else
  jest -c jest.config.json --runInBand "$@"
  cat $basepath/../coverage/lcov.info | $basepath/../node_modules/.bin/coveralls
fi
