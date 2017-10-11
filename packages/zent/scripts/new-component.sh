#!/bin/bash

basepath=$(dirname $0)
js_file_path=$basepath/../src/$1/index.js
js_file_name="$1.js"
css_file_name="$1.pcss"

echo "开始初始化组件 $@"

function touch_file () {
  touch index.js
  touch README.md
  touch $js_file_name
}

function touch_css_file () {
  touch $css_file_name
}

# js代码
cd $basepath/../src && mkdir $1 && cd $1 && touch_file && cd ../../
echo "export default from './$@.js';" > $js_file_path

# css代码
cd $basepath/../assets && touch_css_file

echo "完成初始化组件 $@"
