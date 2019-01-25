---
title: Portal
path: component/portal
group: Basics
---

## Portal

Portal widget

### Guides

Portal provides a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

### API

| Property     | Description     | Type     | Required | Default      | Alternative         |
| --------- | ----------------- | ---------- | ----------- | -------- | -------------------- |
| children  | Only supports one child        | string    | No  |          |                |
| selector  | DOM node to render child    | string or DOM Element | No | `'body'` | legal CSS selector or certain DOM node |
| visible   | Whether to render child    | bool   | No     | `true`   |                |
| onMount   | Callback after child is mounted | func | No | | |
| onUnmount | Callback after child is unmounted | func | No | | |
| layer | The layer curtain tag name | string | No | `div` | |
| useLayerForClickAway | Whether to use a layer for click away from `Portal` | boolean | No | false | |
| onClickAway | The callback when user clicks away from `Portal` | function | No | | |
| onLayerReady | The hook when layer is ready | function | No | | |
| className | The layer class name     | string | No | `''`     |         |
| style | The layer style | object | No | | |
| css      | (Deprecated, use style instead) Extra css style. such as, `{ 'margin-left': '10px' }` | object  | No | `{}`     |     |
| prefix    | Custom prefix        | string   | No   | `'zent'` |     |

`Portal` provides some high-level components(HOC)，including some logics that are generally used in popovers.

#### withESCToClose

Implements close on ESC.

| Property      | Description      | Type  |   Required         |  Default    |
| ------- | --------------- | ---------- | ---- | ------ |
| visible | Is portal visible | bool | Yes | `true` |
| onClose | Callback when portal closes        | func | Yes |  |   |

```jsx
import { Portal as _Portal } from 'zent';
const { withESCToClose } = _Portal;
const Portal = withESCToClose(_Portal);
```

#### withNonScrollable

Disable scroll on body when portal is open.

| Property      | Description         | Type  | Required | Default    |
| ------- | ------------------------- | ---- | ------ | ---- |
| visible | Is Portal visible | bool | Yes | `true` |

```jsx
import { Portal as _Portal } from 'zent';
const { withNonScrollable } = _Portal;
const Portal = withNonScrollable(_Portal);
```

### Principle

- The widget is mainly used to insert it's `child` to given DOM node, and it is removed from DOM when component is unmounted.
- A certain degree of repaint occurs when any props are modified, and `children`, `selector`'s change will trigger component `unmount` to `mount`; when other props is modified, only existing DOM node attributes update.

### Known issues

- Using string `ref` on Portal's `children` throws error, to avoid this question, you can use functional `ref`. the reason is Portal's `chilren` has no owner, if you want to read more detail about this issue, click [ Here](https://github.com/facebook/react/blob/v15.0.2/src/renderers/shared/reconciler/ReactRef.js#L18). Using string `ref` on Portal's `children` is also not encouraged by official react team.

- On `15.0.2` version,  React has a bug that the `context` rely on `state` does not update in some case(refer to example: 02-context), please wait React version updates

## LayeredPortal

Layered portal widget。

### Guides

This component is which `Portal` depends on internally, the difference against `Portal` is that `LayeredPortal` does not contain any pre-defined classNames such as prefix

### LayeredPortal-API

| Property     | Description     | Type     | Required | Default      | Alternative         |
| --------- | ----------------- | ---------- | ----------- | -------- | -------------------- |
| children  | Only supports one child        | string    | No  |          |                |
| render    | Render the content of `LayeredPortal`, prior to children | func | No | | |
| selector  | DOM node to render child    | string or DOM Element | No | `'body'` | legal CSS selector or certain DOM node |
| visible   | Whether to render child    | bool   | No     | `true`   |                |
| onMount   | Callback after child is mounted | func | No | | |
| onUnmount | Callback after child is unmounted | func | No | | |
| layer | The layer curtain tag name | string | No | `div` | |
| useLayerForClickAway | Whether to use a layer for click away from `Portal` | boolean | No | false | |
| onClickAway | The callback when user clicks away from `Portal` | function | No | | |
| onLayerReady | The hook when layer is ready | function | No | | |
| className | The layer class name     | string | No | `''`     |         |
| style | The layer style | object | No | | |
| css      | (Deprecated, use style instead) Extra css style. such as, `{ 'margin-left': '10px' }` | object  | No | `{}`     |     |

## PurePortal

Pure portal widget。

### Guides

Portal behaves like React 16 Portal，which will overwrite all content inside its container.

### PurePortal-API

| Property     | Description     | Type     | Required | Default      | Alternative         |
| --------- | ----------------- | ---------- | ----------- | -------- | -------------------- |
| children  | Only supports one child        | string    | No  |          |                |
| render    | Render the content of `LayeredPortal`, prior to children | func | No | | |
| selector  | DOM node to render child    | string or DOM Element | No | `'body'` | legal CSS selector or certain DOM node |
| onMount   | Callback after child is mounted | func | No | | |
| onUnmount | Callback after child is unmounted | func | No | | |
