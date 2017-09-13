#!/bin/bash

RED='\033[0;31m'
basepath=$(dirname $0)

fail () {
    printf "${RED}$@\nAborting\n"
    exit -1
}

command_exists () {
    type "$1" >/dev/null 2>&1
}

if ! command_exists github_changelog_generator ; then
    fail 'github_changelog_generator is required to publish packages'
fi

if [ -z "$CHANGELOG_GITHUB_TOKEN" ] ; then
    fail 'You must set CHANGELOG_GITHUB_TOKEN environment variable\nhttps://github.com/skywinder/github-changelog-generator#github-token'
fi

# 安装依赖，以防有人修改依赖
yarn

# 重新bootstrap，以防有人改了依赖
yarn bootstrap

$basepath/../lerna publish --exact "$@"

# 生成 change log
github_changelog_generator \
    --exclude-tags-regex "(zent-.+|beta|alpha)" \
    --header-label "## 更新日志" \
    --bugs-label "**Bug 修复:**" \
    --enhancement-label "**不兼容改动和新功能:**" \
    --issues-label "**处理的 Issue:**" \
    --pr-label "**合并的 Pull Request (可能有不兼容改动):**" \
    --no-unreleased \
    -o $basepath/../packages/zent/CHANGELOG.md

git add $basepath/../packages/zent/CHANGELOG.md
git commit -m "doc: update change log (publish)"
git push --no-verify
