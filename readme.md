# @youzan/zent

React Component Ecosystem，一套前端设计语言和基于React的实现

[![version][version-image]][download-url]
[![download][download-image]][download-url]
[version-image]: http://npm.qima-inc.com/badge/v/@youzan/zent.svg?style=flat-square
[download-image]: http://npm.qima-inc.com/badge/d/@youzan/zent.svg?style=flat-square
[download-url]: http://npm.qima-inc.com/package/@youzan/zent

## 特性

* 立志于让前端开发更快速、简单，所有开发者都能快速上手

## 安装

```shell
ynpm install @youzan/zent
```

## 使用组件示例

```js
import { Grid } from '@youzan/zent';
ReactDOM.render(<Grid />, somenode);
```

### 引入zent全套样式

```js
// 引入 sass 文件
import '@youzan/zent/assets/index.scss';   // 可选项目，预置封装了一些基础界面级的样式

// 直接使用 css
import '@youzan/zent/lib/index.css';
```

## 开发 zent

### 注意！注意！注意！重要的事说三遍！

**OSX可以直接运行`./scripts/install-dependencies.sh`安装依赖。**

**OSX可以直接运行`./scripts/install-dependencies.sh`安装依赖。**

**OSX可以直接运行`./scripts/install-dependencies.sh`安装依赖。**

### 开发依赖：

* jq: `brew install jq`, [其他安装方式](https://stedolan.github.io/jq/download/)
* ttfautohint: `brew install ttfautohint`, [其他安装方式](https://www.freetype.org/ttfautohint/#download)
* fontforge: `brew install fontforge`, 需要python扩展。[其他安装方式](http://fontforge.github.io/en-US/downloads/)
* sketchtool: https://www.sketchapp.com/tool/
* zent-kit: `ynpm install -g @youzan/zent-kit`
* felint: `ynpm install -g @youzan/felint`
* fount: `ynpm install -g @youzan/fount`
* superman: `ynpm install -g @youzan/superman`
* lerna: `ynpm install -g lerna`

### 初始化项目:

大哥大姐，既然你已经看到这里了，请把这个文档看完吧～

```bash
ynpm install
felint youzan && felint init -6
lerna bootstrap # 如果这个命令执行失败，运行一下lerna clean --yes，否则下次无法运行lerna bootstrap命令
```

**如果`lerna bootstrap`在lint某个包的时候失败，请确认你的`eslint`符合`felint`的版本要求(现在是2.11.1)。**

执行完这些之后不需要再在`packages/zent-xxx`目录下去单独执行`npm install`了。

如果`packages/zent-xxx`需要添加新包，两种情况

1. 新依赖不是zent的包，直接在目录内`npm install`即可
2. 新依赖是zent的包，那就是组件库内的依赖，必须先在组件的`package.json`里加上新依赖，然后去根目录执行`lerna clean --yes && lerna bootstrap`

之后就可以在`packages`目录下的组件目录内开发了。

开发时一些常用命令，这些命令都需要在组件的目录(`packages/zent-xxx`)下运行:

* `zent-kit dev`: 启动一个本地开发模式的server
* `zent-kit test`: 运行组件的测试用例

## 发布

**注意：不是所有人都有发包权限的**

1. 更新代码到最新: `git pull`
2. `./scripts/publish.sh`选择需要的版本即可(**不要直接运行`lerna publish`**)

### Tips

* `lerna updated`可以查看哪些包有改动。
* 如果A依赖B，B改动的话A也会发新包。

## 注意

现在所有代码修改请拉一个新分支，修改完成后发一个Merge Request给我，后续会把权限开放给更多人，但是以后所有代码修改都需要发Merge 
Request。

提交的代码确保已经通过eslint检查。
