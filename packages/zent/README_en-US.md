## Zent <a href="https://github.com/youzan/zent"><img src="https://img.yzcdn.cn/zanui/react/GitHub_Logo.png" width="78" height="32" alt="github-logo" /><img src="https://img.yzcdn.cn/zanui/react/GitHub-Mark-120px-plus.png" alt="github" width="32" height="32"/></a>

一套 React 的 UI 组件。

英文模式

A collection of essential UI components written with React.

### 组件展示

<img alt="zent-components" src="https://img.yzcdn.cn/zanui/react/zent-components.png" width="849" height="327" />

### 特性

* 高质量的 React 基础组件以及丰富的业务组件
* 内置 TypeScript 类型定义文件
* 支持定制主题
* 代码/样式按需加载
* yarn + webpack + babel + postcss + prettier + stylefmt
* 一套有赞设计师绘制的图标库
* 单测覆盖率在 90% 以上

### 支持环境

* 现代浏览器以及 IE 11 及以上
* 支持服务端渲染(SSR)

### 安装

```bash
yarn add zent
```

### 使用组件

```jsx
import { Button } from 'zent';

// 引入样式
import 'zent/css/index.css';

ReactDOM.render(<Button />, mountNode);
```

### 按需加载

[bable-plugin-zent](babel-plugin-zent) 这个 babel 插件可以帮助减小打包文件的大小，原理是自动做了类似下面的代码变换。

```js
import { Button } from 'zent';

// 变换为

import Button from 'zent/lib/button';
```

适用于基于 Zent 开发的组件库，以及对 Zent 使用量较少的项目。详细使用帮助请看[插件的文档](babel-plugin-zent)。

<style>
img[alt="github"] {
	float: right;
	margin-top: 10px;
}

img[alt="github-logo"] {
	float: right;
	margin-top: 12px;
}
</style>
