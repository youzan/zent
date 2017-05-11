## babel-plugin-zent

Pay what you use for Zent.

This plugin can reduce your bundle size by importing only the parts of zent you use in your project.

### Prerequisite

This plugin requires Zent version >= 3.0.0.

### Features

- Smaller bundle size
- Automatic component JavaScript import rewrite
- Automatically import styles for the components you use

### Usage

`yarn add zent babel-plugin-zent -D`

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

```js
// defaults
{
	moduleMappingFile: 'zent/lib/module-mapping.json',
	automaticStyleImport: false
}
```

`moduleMapppingFile`: absolute path of module mapping config for zent.

If `automaticStyleImport` is `true`, import styles for component.
