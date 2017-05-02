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

`yarn add babel-plugin-zent -D`

webpack2 configuration example:

```js
var ZentPlugin = require('babel-plugin-zent');

module.exports = {
	entry: 'index.js',
	output: {
		filename: 'bundle.js'
	},
	plugins: [
		new ZentPlugin({
			moduleMappingFile: require.resolve('zent/lib/module-mapping.json'),
			automaticStyleImport: true
		})
	]
};
```

In your component Javascript files, use zent like this: `import { Button, Dialog } from 'zent'`, the plugin will take care of the rest.

### Options

```js
// defaults
{
	moduleMappingFile: '',
	automaticStyleImport: false
}
```

`moduleMapppingFile`: absolute path of module mapping config for zent. Use `require.resolve('zent/lib/module-mapping.json')` to get the path in your webpack config.

If `automaticStyleImport` is `true`, import styles for component.


### JavaScript Transformation

A module mapping file is required for these transformations to work. Use `scripts/generate-module-config.js` to generate the mapping file.

```js
// in
import { Button, Loading } from 'zent';

// out
import Button from 'zent/lib/button';
import Loading from 'zent/lib/loading';
```

```js
// in
var Zent = require('zent');
import * as Zent from 'zent';
import Button from 'zent-button';
import Button from 'zent/button';

// out
// Error: require('zent') is not allowed, use ES6 import instead.
// Error: namespace import is not allowed for zent, specify the components you need.
// Error: zent-button is no longer maintained, use `import { Button } from 'zent'` instead.
// Error: zent/button is no longer supported, use `import { Button } from 'zent'` instead.
```

There will be a mapping between components and folders. This mapping can be generated from `packages/zent/src/index.js`.

### Automatic CSS Import

In order to make this work, we need these:

- Component dependency graph
- Component style mapping

All of these can be generated from the source code in `packages/zent`.

```js
import { Dialog } from 'zent';
```

```js
// Use Dialog as an example
function findComponentStyles(component) {
	return moduleMapping[component].css;
}

// Before inserting into AST, we must first find all styles and remove duplicates.
unique(
	flatten(
		allComponentsInThisModule.map(findComponentStyles)
	)
).forEach(insertStyleImportIntoModule);
```
