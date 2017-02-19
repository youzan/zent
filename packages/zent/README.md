# zent

React Component Ecosystem，一套前端设计语言和基于React的实现

## 特性

* 基于npm + webpack + babel + nodejs的工作流
* 立志于让前端开发更快速、简单，所有开发者都能快速上手
* 高度可扩展性及搭建策略

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
node_modules/zent/lib/index.css
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
