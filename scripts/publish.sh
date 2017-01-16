#!/bin/sh

# 循序执行，因为@youzan/alert依赖其他包prepublish后的结果
lerna publish --concurrency 1
