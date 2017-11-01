## babel-plugin-zent

这个插件通过自动化代码和样式的引入来帮助减小打包体积。

### 使用须知

这个插件需要配合 Zent >= 3.0.0 使用。

### 特性

- 减小打包体积
- JavaScript 代码按需引入
- 样式按需引入

### 使用

`yarn add babel-plugin-zent -D`

配置示例:

```js
// In your .babelrc
{
	"plugins": [
		["zent"]
	]
}
```

在 JavaScript 代码中通过 `import { Button, Dialog } from 'zent'` 这种方式去引入 Zent 组件，插件会自动引入用到的组件代码。

### 配置

- `moduleMapppingFile`: Zent 模块映射文件的绝对路径，默认是当前项目下的 Zent 安装目录。
- `automaticStyleImport`: 设置为 `true` 启用样式自动引入。
- `useRawStyle`: 配合 `automaticStyleImport` 使用, 设置为 `true` 自动引入样式源文件(PostCSS). **需要 Zent >= 3.8.1**

```js
// 默认值
{
	moduleMappingFile: 'zent/lib/module-mapping.json',
	automaticStyleImport: false,
	useRawStyle: false
}
```
