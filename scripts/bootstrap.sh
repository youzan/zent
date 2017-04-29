#!/bin/bash

lerna clean --yes

cd packages/zent && yarn
cd ../babel-plugin-zent && yarn
