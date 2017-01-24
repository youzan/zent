#!/bin/sh

run_test () {
    count=`ls -1 {__tests__/*.js,__tests__/*.jsx} 2>/dev/null | wc -l`
    if [ $count != 0 ] ; then
        zent-kit test
    fi
}

for package in packages/*
do
    (cd "$package" && run_test)

    if [ "$?" != 0 ] ; then
        exit -1
    fi
done
