<p>
  <a href="https://github.com/youzan/">
    <img alt="Youzan logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan">
  </a>
</p>
<p align="center">
    <img alt="Zent logo" src="https://img.yzcdn.cn/public_files/2017/02/21/e96fcc2bb29150080fcf5da39cd27fbe.png">
</p>
<p align="center">
  Zent <small><font color="grey">( &#92;ˈzent&#92; )</font></small>, a collection of essential UI components written with React.
</p>

[![Build Status](https://travis-ci.org/youzan/zent.svg?branch=master)](https://travis-ci.org/youzan/zent) [![npm version](https://img.shields.io/npm/v/zent.svg?style=flat)](https://www.npmjs.com/package/zent) [![downloads](https://img.shields.io/npm/dt/zent.svg)](https://www.npmjs.com/package/zent) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

[![NPM](https://nodei.co/npm/zent.png?downloads=true&downloadRank=true)](https://nodei.co/npm/zent/)

## Install

```shell
yarn add zent

# or

npm install zent --save
```

## Usage

```js
import { Button } from 'zent';
ReactDOM.render(<Button>Zent</Button>, somenode);
```

## Import style

```js
// import scss file
import 'zent/assets/index.scss';

// import css file directly
import 'zent/lib/index.css';
```

## Use components independently

`Zent` also supports using components independently if you only need to use a few of them. It may reduce your bundle size.

Taking `Button` component as an example:

```js
// import Button alone
import Button from 'zent/button';

// import style of Button
import 'zent/button/lib/index.css';
```

## Contribution

Send [issues](https://github.com/youzan/zent/issues) and [pull requests](https://github.com/youzan/zent/pulls) with your ideas.

Read our [contributing guide](CONTRIBUTING.md) to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes to Zent.

## License

Project licensed under [MIT](https://en.wikipedia.org/wiki/MIT_License) license, feel free to enjoy and participate in Open Source.
