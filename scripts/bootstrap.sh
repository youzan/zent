#!/bin/bash

set -e

yarn
pushd packages/zent && yarn && yarn build && popd
pushd packages/babel-plugin-zent && yarn && yarn build && popd
pushd site && yarn && popd
