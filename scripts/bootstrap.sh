#!/bin/bash

set -e

yarn

lerna clean --yes
lerna bootstrap
lerna run build

pushd site && yarn && popd
