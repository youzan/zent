#!/bin/bash

basepath=$(dirname $0)
js_file_path=$basepath/../src/$1/index.js
assets_index_path=$basepath/../assets/index.pcss
css_file_name="$1.pcss"
upper_name="$(tr '[:lower:]' '[:upper:]' <<< ${1:0:1})${1:1}"
upper_js_file_name="$upper_name.js"

# 添加js
function touch_js_file () {
  touch index.js
  touch README.md
  touch $upper_js_file_name
}

# 添加pcss
function touch_css_file () {
  touch $css_file_name
}

# 在 index.js 中导出
function update_js_index () {
  echo "export default from './$upper_js_file_name';" > $js_file_path
}

# 在 assets/index.pcss 中import
function update_assets_index () {
  echo "@import './$css_file_name';" >> $assets_index_path
}

if [ ! -z "$1" ] ; then
  echo "开始初始化组件：$upper_name"
  # js代码
  cd $basepath/../src && mkdir $1 && cd $1 && touch_js_file && cd ../../ && update_js_index

  # css代码
  cd $basepath/../assets && touch_css_file && cd ../ && update_assets_index

  echo "完成初始化组件：$upper_name"

  echo '更新jest配置...'

  node $basepath/update-jest-module-mapper.js
else
  echo '请输入需要新建的组件名！'
fi
