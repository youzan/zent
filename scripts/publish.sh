#!/bin/bash

set -e

basepath=$(dirname $0)

# 重新bootstrap，以防有人改了依赖
yarn bootstrap "$1"

yarn workspace "$1" publish "${@:2}"
