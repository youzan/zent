## Zent

Zent ( \ˈzent\ ) is a React component library developed and used at Youzan. Zent provides a collection of essential UI components and lots of useful domain specific components.

We have more than 40 components for now and we're releasing more.

Our goal is making React development faster and simpler.

### Showcase

![zent-components](https://img.yzcdn.cn/zanui/react/zent-components.png)

### Features

* High quality React components
* Builtin TypeScript support
* Supports custom themes
* Import JavaScript and styles only if they are used
* yarn + webpack + babel + postcss + prettier + stylefmt
* Handmade icon font
* Tests coverage is above 90%

### Supported Environments

* Modern browsers and IE >= 11
* Supports server-side rendering(SSR)

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

[bable-plugin-zent](babel-plugin-zent) is a babel plugin that can help reduce bundle size, it does code transformations like this:

```js
import { Button } from 'zent';

// Transforms into

import Button from 'zent/lib/button';
```

This plugin is useful if you are developing a library based on Zent, or if you only use a small part of Zent components.

You can find detailed instructions in its [documentation](babel-plugin-zent).

<style>
img[alt="zent-components"] {
  width: 849px; 
  height: 327px;
}
</style>
