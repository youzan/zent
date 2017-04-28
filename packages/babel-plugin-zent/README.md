## babel-plugin-zent

Pay what you use for Zent.

This plugin can reduce your bundle size by importing only the parts of zent you use in your project.

### Prerequisite

This plugin requires Zent version >= 3.0.0.

### Transformation

```js
// in
import { Button, Loading } from 'zent';

// out
import Button from 'zent/lib/button';
import Loading from 'zent/lib/loading';
```

```js
// in
import * as Zent from 'zent';

// out
ERROR
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
	// Find all dependencies for Dialog in component dependency graph
	// ['Icon', 'Portal', 'Button']
	const dependencies = findComponentDependencies(component);

	// Get style file from component style mappping
	// Some components do not have styles, e.g. Portal
	const styles = dependencies.reduce((s, d) => {
		if (hasStyle(d)) {
			s.push(getStyle(d));
		}

		return s;
	}, []);

	// ['zent/css/button', 'zent/css/icon']
	return styles;
}

// Before inserting into AST, we must first find all styles and remove duplicates.
unique(
	flatten(
		allComponentsInThisModule.map(findComponentStyles)
	)
).forEach(insertStyleImportIntoModule);
```

### Options

```js
// defaults
{
	allowLegacyImport: false,
	allowRequireZent: false,
	automaticStyleImport: false
}
```

If `allowLegacyImport` is `true`, error on imports like this. If `allowLegacyImport` is `false`, do not check these imports.

```js
import Button from 'zent-button';
import Button from 'zent/button';
```

If `allowRequireZent` is `true`, error on `var Zent = require('zent')`; ignore if set to `false`.

If `automaticStyleImport` is `true`, import styles for component.
