#!/bin/sh

rm -rf node_modules yarn.lock
pushd packages/zent && rm -rf node_modules yarn.lock && popd
pushd packages/babel-plugin-zent && rm -rf node_modules yarn.lock && popd
pushd site && rm -rf node_modules yarn.lock && popd
