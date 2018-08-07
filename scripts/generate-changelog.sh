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
  fail 'github_changelog_generator is required to generate changelog'
fi

if [ -z "$CHANGELOG_GITHUB_TOKEN" ] ; then
  fail 'You must set CHANGELOG_GITHUB_TOKEN environment variable\nhttps://github.com/skywinder/github-changelog-generator#github-token'
fi

# requires github_changelog_generator >= 1.15.0
github_changelog_generator \
  --user youzan \
  --project zent \
  --exclude-tags-regex "zent-.+" \
  --header-label "## Github Change Log" \
  --no-unreleased \
  -o $basepath/../packages/zent/CHANGELOG.md
