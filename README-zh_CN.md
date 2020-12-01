<p>
	<a href="https://github.com/youzan/">
		<img alt="有赞logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan">
	</a>
</p>
<p align="center">
    <img alt="Zent logo" src="https://img.yzcdn.cn/public_files/2017/02/21/e96fcc2bb29150080fcf5da39cd27fbe.png" width="200px">
</p>
<p align="center">
	Zent <small><font color="grey">( &#92;ˈzent&#92; )</font></small>, a collection of essential UI components written with React.
</p>

[![CircleCI](https://circleci.com/gh/youzan/zent.svg?style=svg)](https://circleci.com/gh/youzan/zent)
[![npm version](https://img.shields.io/npm/v/zent.svg?style=flat)](https://www.npmjs.com/package/zent)
[![bundle size](https://badgen.net/bundlephobia/minzip/zent)](https://bundlephobia.com/result?p=zent)
[![coverage status](https://img.shields.io/coveralls/youzan/zent/master.svg?style=flat)](https://coveralls.io/github/youzan/zent?branch=master)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](packages/zent/docs/CONTRIBUTING_zh-CN.md)

Zent ( \ˈzent\ ) 是有赞 PC 端 WebUI 规范的 React 实现，提供了一整套基础的 UI 组件以及一些常用的业务组件。

目前我们有 50+ 组件，这些组件都已经在有赞的各类 PC 业务中使用，我们会在此基础上，持续开发一些新组件。

我们的目标是让 React 项目开发更快、更简单。

### 特性

- 高质量的 React 基础组件以及丰富的业务组件
- 内置 TypeScript 类型定义文件
- 支持定制主题
- 代码/样式按需加载
- 一套有赞设计师绘制的图标库

### 支持环境

- React >= 17
- 现代浏览器，IE 除外
- 支持服务端渲染(SSR)

### 必须的 polyfill

- `es6.object.assign`
- `es6.object.is`
- `es6.string.ends-with`
- `es6.string.starts-with`
- `es6.string.includes`
- `es7.string.trim-left`
- `es7.string.trim-right`
- `es6.array.from`
- `es6.array.of`
- `es6.array.fill`
- `es6.array.find`
- `es6.array.find-index`
- `es7.array.includes`

## 安装

```shell
yarn add zent

# or

npm install zent --save
```

## 组件文档

[https://youzan.github.io/zent/zh/guides/install](https://youzan.github.io/zent/zh/guides/install)

## 贡献代码

修改代码请阅读我们的[开发指南](packages/zent/docs/CONTRIBUTING_zh-CN.md)。

使用过程中发现任何问题都可以提 [Issue](https://github.com/youzan/zent/issues) 给我们，当然，我们也非常欢迎你给我们发 [PR](https://github.com/youzan/zent/pulls)。

## 开源协议

本项目基于 [MIT](https://zh.wikipedia.org/wiki/MIT%E8%A8%B1%E5%8F%AF%E8%AD%89) 协议，请自由地享受和参与开源。
