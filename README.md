<p>
	<a href="https://github.com/youzan/">
		<img alt="有赞logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan">
	</a>
</p>
<p align="center">
    <img alt="Zent logo" src="https://img.yzcdn.cn/public_files/2017/02/21/e96fcc2bb29150080fcf5da39cd27fbe.png">
</p>
<p align="center">
	A collection of essential UI components written with React.
</p>

[![npm version](https://img.shields.io/npm/v/zent.svg?style=flat)](https://www.npmjs.com/package/zent) [![downloads](https://img.shields.io/npm/dt/zent.svg)](https://www.npmjs.com/package/zent) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[![NPM](https://nodei.co/npm/zent.png?downloads=true&downloadRank=true)](https://nodei.co/npm/zent/)

## 安装

```shell
npm install zent --save
```

## 使用组件

```js
import { Button } from 'zent';
ReactDOM.render(<Button>Zent</Button>, somenode);
```

## 引入样式

```js
// 引入scss文件
import 'zent/assets/index.scss';

// 直接使用css
import 'zent/lib/index.css';
```

## 单独使用某个组件

如果你只需要某一个组件，`Zent` 支持单独引入某一个组件。如果你只用到了很少几个 `Zent` 组件，这种方式可以帮助减小最终打包出来的文件大小。

我们以 `Button` 组件为例。

```js
// 只引入Button的代码
import Button from 'zent/button';

// Button的样式文件
import 'zent/button/lib/index.css';
```

## 贡献代码

使用过程中发现任何问题都可以提 [Issue](https://github.com/youzan/zent/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://github.com/youzan/zent/pulls)。

修改代码请阅读我们的[开发指南](CONTRIBUTING.md)。

## 开源协议
本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。
