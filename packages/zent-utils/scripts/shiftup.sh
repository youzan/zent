#!/bin/sh

# 将lib下除了index.js之外的所有东西拷贝到根目录
for entry in lib/*
do
    name=$(basename $entry)
    if [ "$name" != "index.js" ] && [ "$name" != "index.css" ] ; then
        cp -Rf $entry $name
    fi
done
