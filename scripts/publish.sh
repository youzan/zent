#!/bin/bash

RED='\033[0;31m'
basepath=$(dirname $0)
npmtag=${1:-latest}

fail () {
    printf "${RED}$@\nAborting\n"
    exit -1
}

command_exists () {
    type "$1" >/dev/null 2>&1
}

if ! command_exists superman ; then
    fail 'superman is required to publish packages'
fi

if ! command_exists github_changelog_generator ; then
    fail 'github_changelog_generator is required to publish packages'
fi

if [ -z "$CHANGELOG_GITHUB_TOKEN" ] ; then
    fail 'You must set CHANGELOG_GITHUB_TOKEN environment variable\nhttps://github.com/skywinder/github-changelog-generator#github-token'
fi

# 重新bootstrap，以防有人改了组件的依赖
$basepath/../lerna clean --yes
$basepath/../lerna bootstrap

# 循序执行，因为zent依赖其他包prepublish后的结果，会比较慢
$basepath/../lerna publish --exact --concurrency 1 --npm-tag=$npmtag

# 生成 change log
github_changelog_generator --exclude-tags-regex "zent-.+" -o $basepath/../packages/zent/CHANGELOG.md
git add $basepath/../packages/zent/CHANGELOG.md
git commit -m "doc: update change log(publish)"
git push
