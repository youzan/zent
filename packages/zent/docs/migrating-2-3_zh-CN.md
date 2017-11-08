## Zent 2.x 到 3.x 升级指南

### Javascript 组件

从 Zent 3.x 开始我们不再单独为每个组件发包，所有组件代码都包含在一个包里。因此，原来的一些使用方法我们不再支持了。

```js
// 这些 2.x 的写法不再支持(以 Button 组件为例)
import Button from 'zent-button';
import Button from 'zent/button';

// 请改成 3.x 的写法
import { Button } from 'zent';
```

也就是说 3.x 只支持 `import { Button } from 'zent';` 这一种写法。

### UMD

UMD 文件的路径变了。

```js
// 2.x 的写法
require('zent/dist/main.js');

// 请改成 3.x 的写法
require('zent/lib/zent-umd.js');
// 或者使用 minify 后的版本
require('zent/lib/zent-umd.min.js');
```

### 样式

css 文件的目录变了。

```js
// 2.x 的写法
import 'zent/lib/index.css';

// 请改成 3.x 的写法
import 'zent/css/index.css';
```

### babel-plugin-zent

我们不再维护每个组件单独的包，但是我们提供了一个更加方便的替代方案来达到相同的目的。

这个 babel 插件可以自动重写所有 Zent 的 `import`，自动在打包的时候剔除没有使用的 Zent 组件代码，帮助减小代码体积。

使用说明请看[插件文档](../guides/babel-plugin-zent)。

