#!/bin/sh

basepath=$(dirname $0)

rm -rf $basepath/../svg
sketchtool export slices --formats=svg --overwriting=YES --save-for-web=YES --output=$basepath/../svg $basepath/../assets/icons.sketch
