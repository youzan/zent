# @youzan/zent

React Component Ecosystem，一套前端设计语言和基于React的实现

[![version][version-image]][download-url]
[![download][download-image]][download-url]
[version-image]: http://npm.qima-inc.com/badge/v/@youzan/zent.svg?style=flat-square
[download-image]: http://npm.qima-inc.com/badge/d/@youzan/zent.svg?style=flat-square
[download-url]: http://npm.qima-inc.com/package/@youzan/zent

## 特性

* 基于npm + webpack + babel + nodejs的工作流
* 立志于让前端开发更快速、简单，所有开发者都能快速上手
* 高度可扩展性及搭建策略

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
node_modules/@youzan/zent/lib/index.css
```

## 开发 zent

#### 目录结构

```shell
.
├── app           # 网站上运行前端代码
├── assets        # zent这个包的样式文件
├── config        # 主要是打包以及服务器的一些配置文件
├── dist          # 发布的时候生成的umd格式文件，主要时在老项目中使用，如iron-front
├── gulp          # gulp tasks
├── lib           # 发布时生成的babel转译后的文件
├── scripts       # 一些项目内用的脚本
├── server        # node服务器端的代码
├── src           # zent这个包的js文件
├── static_file   # build时生成的静态文件，供网站引用。
└── zent-doc      # 网站的几个静态页面，都是markdown格式

```

除了这些目录外，每一个zent组件都会有一个对应的目录，如`zent-button`在根目录下会有一个`button`
的目录，这些目录是直接从node_modules复制出来的，`npm run update`会更新这些目录，请不要手动修改
这些目录。

#### 添加新组件

需要修改几个地方：

* `src/index.js` 导出组件
* `assets/index.scss` 引入组件的样式文件
* `app/base-info.js` 添加组件在网站导航栏中的链接
* `.gitignore` 把组件目录加入忽略列表中，发包的时候每一个单独的组件代码会复制一份到根目录，这些目录是不应该提交到git中的
* `package.json` 更新`files`将新组件对应的目录加入进去

#### 本地服务

```shell
npm run dev;      # 开启本地js 打包等，用于本地开发使用
npm run serve;    # 启动 node 服务，此时打开 http://localhost:7778 即可看到网站
```

#### NPM发布新版本

当有 zent-\*组件更新时，需要重新打包 zent 总项目，遵循以下步骤即可

```shell
# 1. 首先要做的是做必要的代码修改，并更新这个文档下面的change logs

# 2. 更新版本号，不要自己手动改，因为有多个地方要改，容易漏掉
./scripts/bump_version.sh x.y.z

# 3. 更新所有依赖的@youzan/zent-\*组件包
npm run update;

# 4. 发布
ynpm publish;
```

#### 更新服务器

```shell
# 登陆服务器
ssh -A XXX@login1.qa.qima-inc.com     # 登录跳转机（权限问题请到 account 平台申请跳板机）
i qabb-fe-doc0                        # 登录服务所在机器（权限问题庆到 account 平台申请服务器）

# 进入开发目录，更新代码
cd /data/zent
git pull

# 重新安装依赖的组件包，并重新打包网站
LD_LIBRARY_PATH="/opt/gcc/lib64:/opt/gcc/lib" npm run online

# 这个命令一般不需要执行，偶尔服务器出现问题的时候需要重启服务器（有权限问题请找冬瓜）
sudo supervisorctl restart zent:zent-1
```

## Change logs

* 2017-01-11, 0.3.11, `zent-form`为内置封装的`SelectField`做`onChange`回调参数的兼容
* 2017-01-10, 0.3.10, `zent-form`增加`required`支持
* 2017-01-06, 0.3.9, `zent-select`更新样式，`zent-datetimepicker`bug修复
* 2017-01-03, 0.3.8, 更新`zent-datetimepicker`，增加disabled状态，日期选择添加min 和max 的支持, 一些bug修复; 用`portal`重写`zent-notify`
* 2016-12-30, 0.3.7, `zent-tabs`支持number作为id使用
* 2016-12-28, 0.3.6, `zent-form`修复使用jquery中非标准promise方法always导致的报错，改用then
* 2016-12-27, 0.3.5, `zent-tree`增加`isRoot`用来处理根结点的`parentId`非零的情况；checkbox样式bug修复
* 2016-12-23, 0.3.4, 更新table组件样式
* 2016-12-22, 0.3.3, 更新loading组件，修复examples在包里丢失的问题
* 2016-12-20, 0.3.2, 更新table组件，修复了bodyRender返回0时不显示的bug
* 2016-12-19, 0.3.1, 更新icon组件，现在会透传额外的props了
* 2016-12-14, 0.3.0, 升级zent-tabs，tabs初始化的时候只会mount当前active的panel；其他bug修复
* 2016-12-09, 0.2.37, datetimepicker bug修复
* 2016-12-08, 0.2.36, input组件css样式去掉
* 2016-12-08, 0.2.35, 修复select的bug
* 2016-12-07, 0.2.34, 修复pagination对select版本号的依赖，和zent保持一致
* 2016-12-07, 0.2.33, 去除所有组件对react的依赖，都改成了devDependencies
* 2016-12-06, 0.2.32, 修复form组件bug
* 2016-12-06, 0.2.31, 修复form组件的export
* 2016-11-30, 0.2.30, 发布steps组件
* 2016-11-30, 0.2.29, 发布form组件，终于！！！
* 2016-11-30, 0.2.28, 修复datetime picker bug
* 2016-11-29, 0.2.25/0.2.26/0.2.27, 修复datetime picker的bug
* 2016-11-28, 0.2.24, 发布datetime picker，暂时只开放DatePicker
* 2016-11-23, 0.2.23, 修复select的一些问题
* 2016-11-16, 0.2.21/0.2.22, 支持@youzan/zent/button这种引用方式，有问题请找对应组件的作者
* 2016-11-16, 0.2.20, 发布zent-tabs
* 2016-11-15, 0.2.19, zent-button去掉无用props，某些版本的react会有警告
* 2016-11-15, 0.2.18, sweetalert增加type选项，设置后在title左侧会显示一个图标
* 2016-11-14, 0.2.17, 重新打包，修复zent-kit更新引起的css问题（iron-front下node-sass编译出问题）
* 2016-11-14, 0.2.15/0.2.16, zent-alert的style从error改成danger，error仍旧支持
* 2016-11-11, 0.2.12/0.2.13/0.2.14, 添加zent-alert组件
* 2016-11-11, 0.2.10/0.2.11, 添加zent-icon组件
* 2016-11-09, 0.2.8/0.2.9, zent-switch移除size="large"支持
* 2016-11-09, 0.2.7, zent-switch添加user-select: none
* 2016-11-08, 0.2.6, 修复zent-input组件defaultValue的问题
* 2016-10-25, 0.2.5, 修复`input`组件和`bootstrap`的样式冲突
* 2016-10-25, 0.2.4, 更新`dialog`和`input`组件的样式
* 2016-10-24, 0.2.3, 修复`switch`和`input`组件样式丢失的bug
* 2016-10-19, 0.2.2, 发布`zent-input`组件, `zent-dialog`调整没有header和footer时的样式
* 2016-10-18, 0.2.1, `zent-tree`删除对`zent-util`的引用（setClass）
* 2016-10-14, 0.2.0, `sweetalert`组件升级，该组件有API改动。
* 2016-10-13, 0.1.34, `radio`/`checkbox`组件的`value`支持任意类型；新增`switch`组件。
* 2016-09-26, 0.1.33, `Dialog`组件添加`openDialog`方法。
* 2016-09-22, 0.1.32, 升级`zent-dialog`, 现在`dialog`会居中显示了。
* 2016-09-21, 0.1.31, 升级`zent-button`，主要是`loading`样式的修改。
