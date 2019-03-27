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
| layer | The layer curtain tag name | string | No | `div` | |
| useLayerForClickAway | Whether to use a layer for click away from `Portal` | boolean | No | false | |
| onClickAway | The callback when user clicks away from `Portal` | function | No | | |
| onLayerReady | The hook when layer is ready | function | No | | |
| className | The layer class name     | string | No | `''`     |         |
| style | The layer style | object | No | | |
| css      | (Deprecated, use style instead) Extra css style. such as, `{ 'margin-left': '10px' }` | object  | No | `{}`     |     |

### Principle

- The widget is mainly used to insert it's `child` to given DOM node, and it is removed from DOM when component is unmounted.
- A certain degree of repaint occurs when any props are modified, and `children`, `selector`'s change will trigger component `unmount` to `mount`; when other props is modified, only existing DOM node attributes update.

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
| withEscToClose | Enable withEscToClose to close | bool | No |  | |
| onClose | Callback when portal closes        | func | No |  |   |
| append | Should append content to the container, if false, the container will be cleaned | bool | No | false | |
