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

if ! command_exists superman ; then
    fail 'superman is required to deploy docs'
fi

if [[ -z "${ZENT_DEPLOY_DOC_GIT_REPO}" ]]; then
  fail 'Environment variable ZENT_DEPLOY_DOC_GIT_REPO not set.'
else
  gh-pages -d dist -r "${ZENT_DEPLOY_DOC_GIT_REPO}"
fi

superman cdn /zanui/zent $basepath/../dist/*
