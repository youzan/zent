#!/bin/bash

set -e

basepath=$(dirname $0)

# 重新bootstrap，以防有人改了依赖
yarn bootstrap "$1"

# bump version first, build relies on it
yarn workspace "$1" version
yarn workspace "$1" publish --non-interactive "${@:2}"
