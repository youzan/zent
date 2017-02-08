#!/bin/sh

# 重新bootstrap，以防有人改了组件的依赖
lerna clean --yes
lerna bootstrap

# 循序执行，因为@youzan/zent依赖其他包prepublish后的结果，会比较慢
lerna publish --exact --concurrency 1
