## Zent 

Zent ( \ˈzent\ ) 是有赞 PC 端 WebUI 规范的 React 实现，提供了一整套基础的 UI 组件以及一些常用的业务组件。

目前我们有 40+ 组件，这些组件都已经在有赞的各类 PC 业务中使用，我们会在此基础上，持续开发一些新组件。

我们的目标是让 React 项目开发更快、更简单。

### 组件展示

![zent-components](https://img.yzcdn.cn/zanui/react/zent-components.png)

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
img[alt="zent-components"] {
  width: 849px; 
  height: 327px;
}
</style>
