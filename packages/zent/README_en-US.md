# Zent

Zent ( \ˈzent\ ) is a React component library developed and used at Youzan. Zent provides a collection of essential UI components and lots of useful domain specific components.

We have more than 50 components for now and we're releasing more.

Our goal is making React development faster and simpler.

### Showcase

![zent-components](https://img.yzcdn.cn/public_files/2018/04/17/ab32128950146c5932c267cbc19f9363.png)

### Features

* High quality React components
* Builtin TypeScript support
* Supports custom themes
* Import JavaScript and styles only if they are used
* Handmade icon font

### Supported Environments

* React >= 16.8
* Supports server-side rendering(SSR)

### Browsers

* Firefox >= 52(ESR)
* Chrome >= 49
* Safari >= 9.1
* No IE support

#### Polyfills needed for supported browsers
* String.prototype.padStart (Chrome 57, Safari 10)

#### Other browsers

For CSS, please refer to [Themes](theme)

Possibly needed polyfills:
* Map
* Set
* Array.prototype.includes
* String.prototype.includes
* Object.assign
* Object.is

### Install

```bash
yarn add zent
```

### Using Components

```jsx
import { Button } from 'zent';

// Import style
import 'zent/css/index.css';

ReactDOM.render(<Button />, mountNode);
```

### Import as Necessary

[babel-plugin-zent](babel-plugin-zent) is a babel plugin that can help reduce bundle size, it does code transformations like this:

```js
import { Button } from 'zent';

// Transforms into

import Button from 'zent/lib/button';
```

This plugin is useful if you are developing a library based on Zent, or if you only use a small part of Zent components.

You can find detailed instructions in its [documentation](babel-plugin-zent).

Using ESM with tree-shaking enabled bundler is also possible.

<style>
img[alt="zent-components"] {
  width: 523px;
  height: 435px;
}
</style>
