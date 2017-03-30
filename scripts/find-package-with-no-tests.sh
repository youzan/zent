#!/bin/bash

check () {
    count=`ls -1 {__tests__/*.js,__tests__/*.jsx} 2>/dev/null | wc -l`
    if [ $count == 0 ] ; then
        echo $1
    fi
}

for package in packages/*
do
    if [ -d "$package" ] ; then
        (cd "$package" && check "$package")

        if [ "$?" != 0 ] ; then
            exit -1
        fi
    fi
done
