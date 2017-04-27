#!/bin/bash

if [[ -z "${CI}" ]]; then
  jest -c jest.config.json "$@"
else
  jest -c jest.config.json --runInBand "$@"
fi
