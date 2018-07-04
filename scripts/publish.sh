#!/bin/bash

set -e

# 安装依赖，以防有人修改依赖
yarn

# 重新bootstrap，以防有人改了依赖
yarn bootstrap

$basepath/../lerna publish --exact "$@"
