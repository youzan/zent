## babel-plugin-zent

Pay what you use for Zent.

This plugin can reduce your bundle size by importing only the parts of zent you use in your project.

### Prerequisite

This plugin requires Zent >= 3.0.0.

### Features

- Smaller bundle size
- Automatic component JavaScript import rewrite
- Automatically import styles for the components you use

### Usage

`yarn add babel-plugin-zent -D`

Configuration example:

```js
// In your .babelrc
{
	"plugins": [
		["zent"]
	]
}
```

In your component Javascript files, use zent like this: `import { Button, Dialog } from 'zent'`, the plugin will take care of the rest.

### Options

- `noModuleRewrite`: disable JavaScript module import rewrite，use with bundle tool's tree-shaking feature.
- `useESM`: Rewrite `import` using esm
- `automaticStyleImport`: `true` to enable styles imports for component.
- `useRawStyle`: should be used with `automaticStyleImport`, imports postcss source files if set to `true`. **Requires Zent >= 3.8.1**

```js
// defaults
{
	noModuleRewrite: false,
	useESM: false,
	automaticStyleImport: false,
	useRawStyle: false
}
```
