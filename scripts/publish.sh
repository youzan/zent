#!/bin/sh

# 循序执行，因为@youzan/zent依赖其他包prepublish后的结果，会比较慢
lerna publish --concurrency 1
