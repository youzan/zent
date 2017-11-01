## Upgrade to 3.x from 2.x

### Javascript Components

Starting from Zent 3.x, we no longer publish separate npm packages for each component.

So there're some usages we no longer support.

```js
// These are no longer supported(Button as an example)
import Button from 'zent-button';
import Button from 'zent/button';

// Instead, you can use this
import { Button } from 'zent';
```

That is to say, only `import { Button } from 'zent';` is supported starting from now on.

### UMD

The UMD bundle location has changed.

```js
// 2.x
require('zent/dist/main.js');

// Instead, you write
require('zent/lib/zent-umd.js');

// Or if you prefer the minified version
require('zent/lib/zent-umd.min.js');
```

### Styles

CSS location has changed.

```js
// 2.x
import 'zent/lib/index.css';

// Instead, you write
import 'zent/css/index.css';
```

### babel-plugin-zent

Since we no longer maintain separate packages for each component, here is an alternative solution to achieve the same goal.

`babel-plugin-zent` can rewrite all Zent `imports` on the fly, you only pay what you use in your project.

Read the [documentation](../guides/babel-plugin-zent).

