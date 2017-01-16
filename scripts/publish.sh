#!/bin/sh

lerna publish --ignore @youzan/zent

# Ensure all packages are up-to-date before publishing this package.
# Package files will be copied from node_modules
lerna publish --force-publish=@youzan/zent