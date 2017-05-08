#!/bin/bash

cd packages/zent && yarn test -- "$@"
cd ../babel-plugin-zent && yarn test -- "$@"
