#!/bin/bash

projectPath=`pwd`
RED='\033[0;31m'
NC='\033[0m'
LGREEN='\033[1;32m'
my_dir="$(dirname "$0")"

# install package
installPackage()
{
  pn=$1
  printf "\n========== Install ${pn} start ==========\n"
  npm install -g "$pn"
  printf "\n========== Install ${pn} done ==========\n"
}

# check if package is already installed
# if not install it
checkAndInstallPackage()
{
  pn=$1
  v=$2
  if [[ $packageList == '' ]]; then
    packageList=`npm list -g --depth=0 --silent --parseable=true 2> /dev/null`
  fi
  sh "$my_dir/checkPackage.sh" "$pn" "$v" "$packageList"
  result=$?
  if [[ $result == '1' ]]; then
    printf "${RED}你已安装${pn}，如果出现问题，请安装${LGREEN}${v}版本尝试解决${NC}"
  fi

  if [[ $result == '2' ]]; then
    installPackage "${pn}""@${v}"
  fi
}

# Check for eslint
checkAndInstallPackage 'eslint' '2.11.1'

# Check for scss_lint
which scss-lint &> /dev/null
if [[ "$?" == 1 ]]; then
  printf '\n========== Install scss_lint@0.48.0 start ==========\n'
  gem install scss_lint --version=0.48.0
  printf '\n========== Install scss_lint@0.48.0 done ==========\n'
fi

# Check eslint-plugin-react
checkAndInstallPackage 'eslint-plugin-react' '5.1.1'
checkAndInstallPackage 'babel-eslint' '6.0.4'
checkAndInstallPackage 'eslint-plugin-import' '1.8.1'
checkAndInstallPackage 'eslint-plugin-jsx-a11y' '1.2.3'
checkAndInstallPackage 'eslint-config-airbnb' '9.0.1'
checkAndInstallPackage 'eslint-plugin-lean-imports' '0.3.3'

# Check MultiHook
ALL_HOOKS_FOLDER=$projectPath/.multi_hooks/all_hooks

APPLICATION=felint

if [ ! -d $ALL_HOOKS_FOLDER ];then
  printf '\n========== 开始安装multi_hooks ==========\n'
  curl http://gitlab.qima-inc.com/delai/youzan_git_kit/raw/master/init_multi_hooks.sh | sh
  printf '\n========== 安装multi_hooks完成 ==========\n'
fi

# cd to hooks folder
cd ./.felint

printf '\n========== init .eslintignore start ==========\n'
cp ./.eslintignore "$projectPath"
printf '\n========== init .eslintignore done ==========\n'

if [ -d $ALL_HOOKS_FOLDER ];then
  rm -rf $ALL_HOOKS_FOLDER/$APPLICATION
  mkdir -p $ALL_HOOKS_FOLDER/$APPLICATION
  cd $ALL_HOOKS_FOLDER/$APPLICATION
  # 2、下面这里填脚本地址
  printf '\n========== init hook ==========\n'
  ln -s ../../../.felint/pre-commit "./pre-commit"
  ln -s ../../../.felint/commit-msg "./commit-msg"
  echo '当前目录里的 commit-msg 和 pre-commit 实际上被软链到了 '$projectPath'/.felint 下真正的脚本文件，相应的钩子触发的时候会被执行。\n
  只是勾子通过multihook来出发而已，后续的 felint 钩子、配置的更新都没有差别' > ./README

  printf '\n========== chmod hook ==========\n'
  chmod -R a+x $projectPath/.multi_hooks
  printf '\n========== chmod hook done ==========\n'
  printf '\n========== init hook done ==========\n'
else
  echo '请先在当前项目里初始化 multi_hooks'
  echo '方法：在项目根目录执行： curl http://gitlab.qima-inc.com/delai/youzan_git_kit/raw/master/init_multi_hooks.sh | sh'
  exit 1;
fi

printf '\n========== ALL DONE, THANKS\n'
