#!/bin/sh

# Ensure font files are uploaded to CDN

basepath=$(dirname $0)
server_prefix=/zent/zenticon

command_exists () {
    type "$1" >/dev/null 2>&1
}

if command_exists superman ; then
  superman cdn $server_prefix $basepath/../build/font/zenticon-*
fi
