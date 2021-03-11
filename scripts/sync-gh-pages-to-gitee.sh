#!/bin/bash

RED='\033[0;31m'

fail () {
    printf "${RED}$@\nAborting\n"
    exit -1
}

if output=$(git status --porcelain) && [ -z "$output" ]; then
  current_branch=$(git branch --show-current)

  git fetch origin gh-pages

  if [ -z "$(git show-ref --verify --quiet refs/heads/gh-pages)" ]; then
    git checkout gh-pages
  else
    git checkout --track origin/gh-pages
  fi

  git push -u gitee gh-pages

  git checkout $current_branch
else
  fail "Working directory is not clean"
fi
