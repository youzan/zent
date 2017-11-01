## Upgrade to Zent 2.1.0

We upgraded React to 15.5.x in this version.

### React 15.5.x

All development of Zent will be based on React 15.5.x starting from 2.1.0.

There may be warnings if you use Zent with old version of React.

You can read the [offical React upgrade guide](https://facebook.github.io/react/blog/2017/04/07/react-v15.5.0.html).

We recommend Facebook's [codemod](https://github.com/reactjs/react-codemod) to automate the upgrade.

### Button

`Button`'s default `htmlType` has changed. `htmlType` defaults to `"button"` starting from 2.1.0.

`Button` has an `htmlType` prop，this prop has no default value before 2.1.0, just like the native `button`'s `type` attribute. So if you put a `Button` into a `form`, it will trigger form submition when clicked before 2.1.0.

You may need to add `htmlType="submit"` in your forms if you relied on old behavior.
