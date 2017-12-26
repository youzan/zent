#!/bin/bash

set -e

lerna clean --yes

cd packages/zent && yarn && yarn build
cd ../babel-plugin-zent && yarn && yarn build
