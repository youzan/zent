Felint Config
========

## 配置

### 安装依赖

安装所依赖的npm包和gem包：(_需要eslint2_)

```
npm install -g eslint && npm install -g eslint-plugin-react
gem install scss_lint
```

### 校验配置

代码检查配置请配置`.eslintrc`、`.eslintignore`和`.scss-lint.yml`三个文件，然后运行`update_git_hooks.sh`。

详细规范配置

 - [eslint](http://eslint.org/docs/rules/)
 - [scss](https://github.com/brigade/scss-lint/blob/master/lib/scss_lint/linter/README.md)

## 数据统计接口配置

修改`pre-commit`和`commit-msg`钩子文件中`curl`对应行的接口请求地址，以及去掉注释。

例如`commit-msg`：

```c
#!/bin/sh

curl -G -s -o /dev/null "www.interface.com/commit/msg?user=$(git config user.name)" --data-urlencode "comments=$(cat $1)"
```