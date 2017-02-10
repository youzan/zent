# Zent

一套前端设计语言和基于React的实现。

立志于让前端开发更快速、简单，所有开发者都能快速上手。

[![NPM](https://nodei.co/npm/zent.png?downloads=true&downloadRank=true)](https://nodei.co/npm/zent/)

## 安装

```shell
npm install zent
```

## 使用组件示例

```js
import { Grid } from 'zent';
ReactDOM.render(<Grid />, somenode);
```

### 引入zent全套样式

```js
// 引入 sass 文件
import 'zent/assets/index.scss';   // 可选项目，预置封装了一些基础界面级的样式

// 直接使用 css
import 'zent/lib/index.css';
```

## 开发 zent

### 开发依赖：

* jq: `brew install jq`, [其他安装方式](https://stedolan.github.io/jq/download/)
* ttfautohint: `brew install ttfautohint`, [其他安装方式](https://www.freetype.org/ttfautohint/#download)
* fontforge: `brew install fontforge`, 需要python扩展。[其他安装方式](http://fontforge.github.io/en-US/downloads/)
* sketchtool: https://www.sketchapp.com/tool/
* zent-kit: `npm install -g zent-kit`
* felint: `npm install -g felint`
* iconfount: `npm install -g iconfount`
* lerna: `npm install -g lerna`

### 注意！注意！注意！重要的事说三遍！

**OSX可以直接运行`./scripts/install-dependencies.sh`安装上面的所有依赖。**

**OSX可以直接运行`./scripts/install-dependencies.sh`安装上面的所有依赖。**

**OSX可以直接运行`./scripts/install-dependencies.sh`安装上面的所有依赖。**

### 初始化项目:

大哥大姐，既然你已经看到这里了，请把这个文档看完吧～

```bash
npm install
felint update
lerna bootstrap # 如果这个命令执行失败，运行一下lerna clean --yes，否则下次无法运行lerna bootstrap命令
```

**如果`lerna bootstrap`在lint某个包的时候失败，请确认你的`eslint`符合`felint`的版本要求。**

执行完这些之后不需要再在`packages/zent-xxx`目录下去单独执行`npm install`了。

如果`packages/zent-xxx`需要添加新包，两种情况

1. 新依赖不是zent的包，直接在目录内`npm install`即可
2. 新依赖是zent的包，那就是组件库内的依赖，必须先在组件的`package.json`里加上新依赖，然后去根目录执行`lerna clean --yes && lerna bootstrap`

之后就可以在`packages`目录下的组件目录内开发了。

开发时一些常用命令，这些命令都需要在组件的目录(`packages/zent-xxx`)下运行:

* `zent-kit dev`: 启动一个本地开发模式的server
* `zent-kit test`: 运行组件的测试用例

## 常见问题

* `zent-utils`包提供了常见工具函数，包括`classnames`以及`lodash`里的所有函数，请不要在组件内部单独安装这两个包。
  原则上所有工具函数都应该放在`zent-utils`里面管理。
* 提交的代码确保已经通过eslint检查。

## 发布

**注意：不是所有人都有发包权限的**

1. 更新代码到最新: `git pull`
2. `./scripts/publish.sh`选择需要的版本即可(**不要直接运行`lerna publish`**)

### Tips

* `lerna updated`可以查看哪些包有改动。
* 如果A依赖B，B改动的话A也会发新包。
