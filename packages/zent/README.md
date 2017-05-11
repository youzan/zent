## Zent

一套 React 的基础组件。

A collection of essential UI components written with React.

### 安装

```bash
yarn add zent
```

### 使用组件

```jsx
import { Button } from 'zent';

ReactDOM.render(<Button />, mountNode);
```

### 引入样式

```jsx
import 'zent/css/index.css';
```

### babel-plugin-zent

这个 babel plugin 可以帮助减小打包文件的大小，原理是自动做了类似下面的代码变换。

适用于基于 Zent 开发的组件库，以及对 Zent 使用量较少的项目。

```js
import { Button } from 'zent';

// 变换为

import Button from 'zent/lib/button';
```

详细使用帮助请看[插件的文档](babel-plugin-zent)。
