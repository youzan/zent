#!/bin/bash

youzan=$1
projectPath=`pwd`

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
  printf "\n========== Check ${pn} ==========\n"
  if [[ $packageList == '' ]]; then
    packageList=`npm list -g --depth=0 2> /dev/null`
  fi
  echo "$packageList" | grep "$pn""@"
  if [[ $? == '1' ]]; then
    installPackage "${pn}""${v}"
  fi
}

ALL_HOOKS_FOLDER=$projectPath/.multi_hooks/all_hooks

APPLICATION=felint

if [ ! -d $ALL_HOOKS_FOLDER ];then
  printf '\n========== 开始安装multi_hooks ==========\n'
  curl http://gitlab.qima-inc.com/delai/youzan_git_kit/raw/master/init_multi_hooks.sh | sh
  printf '\n========== 安装multi_hooks完成 ==========\n'
fi

# Check for eslint
which eslint &> /dev/null
if [[ "$?" == 1 ]]; then
  installPackage "eslint@2.11.1"
fi

# Check for scss_lint
which scss-lint &> /dev/null
if [[ "$?" == 1 ]]; then
  printf '\n========== Install scss_lint@0.48.0 start ==========\n'
  gem install scss_lint --version=0.48.0
  printf '\n========== Install scss_lint@0.48.0 done ==========\n'
fi

# Check eslint-plugin-react
checkAndInstallPackage 'eslint-plugin-react' '@5.1.1'
checkAndInstallPackage 'babel-eslint' '@6.0.4'
checkAndInstallPackage 'eslint-plugin-import' '@1.8.1'
checkAndInstallPackage 'eslint-plugin-jsx-a11y' '@1.2.3'
checkAndInstallPackage 'eslint-config-airbnb' '@9.0.1'
checkAndInstallPackage 'eslint-plugin-lean-imports' '@0.3.3'

# cd to hooks folder
cd ./.felint

printf '\n========== init .eslintignore start ==========\n'
cp ./.eslintignore "$projectPath"
printf '\n========== init .eslintignore done ==========\n'

if [[ $youzan == "youzan" ]]; then
  printf '\n========== init .felintrc start ==========\n'
  cp ./.felintrc "$projectPath"
  printf '\n========== init .felintrc done ==========\n'
fi

if [ -d $ALL_HOOKS_FOLDER ];then
  rm -rf $ALL_HOOKS_FOLDER/$APPLICATION
  mkdir -p $ALL_HOOKS_FOLDER/$APPLICATION
  cd $ALL_HOOKS_FOLDER/$APPLICATION
  # 2、下面这里填脚本地址
  printf '\n========== init hook ==========\n'
  ln -s ../../../.felint/pre-commit "./pre-commit"
  ln -s ../../../.felint/commit-msg "./commit-msg"
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