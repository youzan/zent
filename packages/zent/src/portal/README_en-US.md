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
| children  | 必填参数, 只支持一个child        | string         |          |                |
| selector  | 可选参数, 渲染child的DOM节点     | string or DOM Element | `'body'` | 合法的CSS selector或者某个DOM节点 |
| visible   | 可选参数, 是否渲染child    | bool         | `true`   |                |
| className | 可选参数, 自定义额外类名      | string                | `''`     |         |
| css      | 可选参数, 额外的css样式. 例如, `{ 'margin-left': '10px' }` | object  | `{}`     |     |
| prefix    | 可选参数, 自定义前缀        | string       | `'zent'` |     |


`Portal` provides some high-level component(HOC)，including some logic are generally used in popover 

#### withESCToClose

package logic to close by using enter ESC

| Property      | Description                        | Type   | Default    |
| ------- | ------------------------- | ---- | ------ |
| visible | 必填参数, 注意这个属性原始的Portal是可选的 | bool | `true` |
| onClose | 必填参数, ESC按下是的回调函数         | func |    |   |

```jsx
import { Portal as _Portal } from 'zent';
const { withESCToClose } = _Portal;
const Portal = withESCToClose(_Portal);
```

#### withNonScrollable

package logic to disable scroll container 

| Property      | Description                        | Type   | Default    |
| ------- | ------------------------- | ---- | ------ |
| visible | 必填参数, 注意这个属性原始的Portal是可选的 | bool | `true` |

```jsx
import { Portal as _Portal } from 'zent';
const { withNonScrollable } = _Portal;
const Portal = withNonScrollable(_Portal);
```

### principle

- The widget is mainly used to insert it's `child` to given DOM node, and it is removed from DOM when component is `unmount`.
- A certain degree of repaint occurs when any props are modified, and `children`, `selector`'s change will trigger component `unmount` to `mount`; when other props is modified, only existing DOM node attributes update.

### known issues

-  在 Portal 的 `children` 上使用字符串形式的 `ref` 会报错, 可以使用函数形式的 `ref` 绕过这个问题. 其原因是 Portal 的 `children` 没有owner, 使用函数形式的`ref`可以绕过这个问题的原因参见[ Here](https://github.com/facebook/react/blob/v15.0.2/src/renderers/shared/reconciler/ReactRef.js#L18). 此外官方也不鼓励使用字符串形式的 `ref`.

-  `15.0.2` 版本的 React 有个 bug 会导致某些情况下依赖 `state` 的 `context` 不更新 (参考 example: 02-context), 请等待 React 版本的统一升级.
