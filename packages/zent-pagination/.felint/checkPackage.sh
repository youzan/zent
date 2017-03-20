#!/bin/bash

# check if package is existed
# and whether version matched

packageName=$1
packageVersion=$2
packageList=$3
pathStr=`echo "$packageList" | grep -E "/$packageName$" 2> /dev/null`
if [[ $pathStr == '' ]]; then
  exit 2;
fi

packageJsonPath="${pathStr}/package.json"

if [ -f $packageJsonPath ]; then
  grep "version" "$packageJsonPath" | grep -q "${packageVersion}"
  if [[ $? == '0' ]]; then
    exit 0;
  else
    exit 1;
  fi
else
  exit 2;
fi