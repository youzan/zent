import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Perf from 'react-addons-perf';

/*
开发时请遵守开发规范。

```
git clone git@gitlab.qima-inc.com:zent/zent-seed.git
在zent-seed的基础上进行组件开发

```

## Feature

* support jsx
* support es6

## File Structure Guide

	-assets/ // css文件夹
    -lib/   // 组件打包文件夹
	-examples/  // demo文件夹
	-src/   // 组件源文件
	-readme.md
	-package.json

## Start Server

npm install @youzan/zent-server

node node_modules/@youzan/zent-server/bin/dev   // default port 7777

## Publish

node node_modules/@youzan/zent-server/bin/prepublish  // Compile files

npm publish

## examples/simple.js

```
import React from 'react';

export default class Example extends React.Component {
    onClick() {
        alert('This is a simple example');
    }
    render() {
        return <button onClick={this::this.onClick}>This is a simple Example</button>;
    }
};

```

可以在package.json中添加以下代码

```
"scripts" : {
    "dev": "node node_modules/@youzan/zent-server/bin/dev",
    "prepublish": "node node_modules/@youzan/zent-server/bin/prepublish"
},
"zentServer": {
    "port": 7777
}
```
之后可以运行以下指令

```
npm run dev
npm run build
```
    src文件夹下的组件注释可以生成于readme.md中
*/
let PageComponent = require('../examples/' + window.Component + '.js');

ReactDOM.render(<PageComponent />, document.getElementById('react-component-container'));

window.Perf = Perf;
/*
## 开发性能

我们暴露Perf以供开发使用，具体的文档请看

[GitHub](https://github.com/crysislinux/chrome-react-perf)

安装[chrome插件](https://chrome.google.com/webstore/detail/react-perf/hacmcodfllhbnekmghgdlplbdnahmhmm)
*/
