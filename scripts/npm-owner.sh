#!/bin/bash

function add_user {
    npm owner add $2
    echo "$1: done"
}

function remove_user {
    npm owner remove $2
    echo "$1: done"
}

function ls_user {
    echo "$1:"
    npm owner ls
    echo
}

for package in packages/*
do
    case "$1" in

    ls) (cd "$package" && ls_user "$package")
        ;;

    add) (cd "$package" && add_user "$package" $2)
        ;;

    remove) (cd "$package" && remove_user "$package" $2)
        ;;

    esac
done
