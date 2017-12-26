---
title: Portal
path: component/portal
group: Basics
---

## Portal

Portal widget

### Guides

Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

### API

| Property        | Description                | Type                    | Default      | Alternative              |
| --------- | ----------------- | --------------------- | -------- | ------------------------ |
| children  | required parameter, only supports one child        | string         |          |                |
| selector  | optional parameter, render child DOM node     | string or DOM Element | `'body'` | legal CSS selector or certain DOM node |
| visible   | optional parameter, whether to render child    | bool         | `true`   |                |
| className | optional parameter, custom extra class name      | string                | `''`     |         |
| css      | optional parameter, extra css style. such as, `{ 'margin-left': '10px' }` | object  | `{}`     |     |
| prefix    | optional parameter, custom prefix        | string       | `'zent'` |     |


`Portal` provides some high-level component(HOC)，including some logic are generally used in popover 

#### withESCToClose

Package logic to close by using enter ESC

| Property      | Description                        | Type   | Default    |
| ------- | ------------------------- | ---- | ------ |
| visible | required, the Portal's original attribute is selectable| bool | `true` |
| onClose | required, callback is trigger when ESC enter         | func |    |   |

```jsx
import { Portal as _Portal } from 'zent';
const { withESCToClose } = _Portal;
const Portal = withESCToClose(_Portal);
```

#### withNonScrollable

Package logic to disable scroll container 

| Property      | Description                        | Type   | Default    |
| ------- | ------------------------- | ---- | ------ |
| visible | required, the Portal's original attribute is selectable | bool | `true` |

```jsx
import { Portal as _Portal } from 'zent';
const { withNonScrollable } = _Portal;
const Portal = withNonScrollable(_Portal);
```

### Principle

- The widget is mainly used to insert it's `child` to given DOM node, and it is removed from DOM when component is `unmount`.
- A certain degree of repaint occurs when any props are modified, and `children`, `selector`'s change will trigger component `unmount` to `mount`; when other props is modified, only existing DOM node attributes update.

### Known issues

- Using string `ref` on Portal's `children` throws error, to avoid this question, you can use functional `ref`. the reason is Portal's `chilren` has no owner, if you want to read more detail about this issue, click [ Here](https://github.com/facebook/react/blob/v15.0.2/src/renderers/shared/reconciler/ReactRef.js#L18). Using string `ref` on Portal's `children` is also not encouraged by official react team.

- On `15.0.2` version,  React has a bug that the `context` rely on `state` does not update in some case(refer to example: 02-context), please wait React version updates
