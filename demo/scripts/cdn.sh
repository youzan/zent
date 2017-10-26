#!/bin/sh

RED='\033[0;31m'
basepath=$(dirname $0)

fail () {
    printf "${RED}$@\nAborting\n"
    exit -1
}

command_exists () {
    type "$1" >/dev/null 2>&1
}

if [[ -n "${ZENT_DEPLOY_DEMO_YOUZAN_PRIVATE}" ]]; then
  if ! command_exists superman ; then
    fail 'superman is required to deploy demos to CDN'
  fi

  superman cdn /zanui/demo/zent $basepath/../dist/*.js $basepath/../dist/*.css
fi


