#!/bin/bash

set -e

yarn
yarn workspace zent build
yarn workspace babel-plugin-zent build
