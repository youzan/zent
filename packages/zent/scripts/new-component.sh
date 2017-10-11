#!/bin/bash

basepath=$(dirname $0)
js_file_path=$basepath/../src/$1/index.js
assets_index_path=$basepath/../assets/index.pcss
js_file_name="$1.js"
css_file_name="$1.pcss"

echo "开始初始化组件 $@"

function touch_js_file () {
  touch index.js
  touch README.md
  touch $js_file_name
}

function touch_css_file () {
  touch $css_file_name
}

# 在 index.js 中导出
function update_js_index () {
  echo "export default from './$js_file_name';" > $js_file_path
}

# 在 assets/index.pcss 中import
function update_assets_index () {
  echo "@import './$css_file_name';" >> $assets_index_path
}

# js代码
cd $basepath/../src && mkdir $1 && cd $1 && touch_js_file && cd ../../ && update_js_index

# css代码
cd $basepath/../assets && touch_css_file && cd ../ && update_assets_index

echo "完成初始化组件 $@"
