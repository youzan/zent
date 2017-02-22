#!/bin/sh

basepath=$(dirname $0)

function blacklist() {
    if [ "$fn_name" == "index" ] || [ "$fn_name" == "lodash" ] || [[ $fn_name == _* ]] ; then
        return 0
    fi

    return -1
}

function wrap() {
    cat > $basepath/../lodash/$1.js <<EOF
/* DO NOT EDIT!! Auto genetated wrapper for lodash/$1. */

var $1 = require('lodash/$1');
module.exports = $1;

EOF
}

mkdir -p $basepath/../lodash

for fn in $basepath/../node_modules/lodash/*.js
do
    fn_name=$(basename $fn .js)
    if ! blacklist $fn_name ; then
        wrap $fn_name
    fi
done
