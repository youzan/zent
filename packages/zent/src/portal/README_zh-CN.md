---
title: Portal
subtitle: 传送门
path: component/portal
group: 基础
---

## Portal 传送门

传送门组件。

### 使用场景

这个组件不提供样式，但它是所有弹层组件的基石。使用 `Portal` 的好处是不需要自己管理动态插入的节点，防止内存泄露。

### API

| 参数        | 说明             | 类型       | 是否必须    | 默认值      | 备选值              |
| --------- | ----------------- | ---------- | ----------- | -------- | ------------------- |
| children  | 只支持一个child        | string         |  否   |     |                |
| selector  | 渲染child的DOM节点     | string or DOM Element | 否 | `'body'` | 合法的CSS selector或者某个DOM节点 |
| visible   | 是否渲染child    | bool         | 否 | `true`   |                |
| onMount   | `children` 被 mount 之后的回调函数 | func | 否 | | |
| onUnmount | `children` 被 unmount 之后的回调函数 | func | 否 | | |
| layer | 遮罩的标签名 | string | 否 | `div` | |
| useLayerForClickAway | 是否使用遮罩来触发`Portal`关闭 | boolean | 否 | false | |
| onClickAway | 点击到非`Portal`处的回调 | function | 否 | | |
| onLayerReady | 遮罩准备好时的hook | function | 否 | | |
| className | 遮罩的className      | string | 否 | `''`     |         |
| style | 遮罩的style | object | 否 | | |
| css      | (已废弃, 请使用style)额外的css样式. 例如, `{ 'margin-left': '10px' }` | object  | 否 | `{}`     |     |
| prefix    | 自定义前缀        | string       | 否 | `'zent'` |     |

`Portal` 另外还提供了几个高阶组件(HOC)，提供了一些弹层常用的逻辑。

#### withESCToClose

封装了按ESC关闭的逻辑.

| 参数      | 说明                        | 类型   | 是否必须 | 默认值    |
| ------- | ------------------------- | ---- | ------ | ---- |
| visible | 注意这个属性原始的Portal是可选的 | bool | 是 | `true` |
| onClose | ESC按下是的回调函数         | func |  是 |   |   |

```jsx
import { Portal as _Portal } from 'zent';
const { withESCToClose } = _Portal;
const Portal = withESCToClose(_Portal);
```

#### withNonScrollable

封装了禁止container滚动的逻辑.

| 参数      | 说明                        | 类型   | 是否必须 | 默认值    |
| ------- | ------------------------- | ---- | ------ |
| visible | 注意这个属性原始的Portal是可选的 | bool | 是 | `true` |

```jsx
import { Portal as _Portal } from 'zent';
const { withNonScrollable } = _Portal;
const Portal = withNonScrollable(_Portal);
```

### 组件原理

- 组件的主要功能是把其 `child` 插入到一个给定的 DOM node中, 并且在组件被 `unmount` 的时候将其 `child` 属性对应的 DOM 节点删除.
- 任意 props 被修改后会触发一定程度的重绘, `children`, `selector`被修改会导致组件 `unmount` 再 `mount`；其它props被修改仅更新现有 DOM node 的属性.

### 已知问题

-  在 Portal 的 `children` 上使用字符串形式的 `ref` 会报错, 可以使用函数形式的 `ref` 绕过这个问题. 其原因是 Portal 的 `children` 没有owner, 使用函数形式的`ref`可以绕过这个问题的原因参见[ Here](https://github.com/facebook/react/blob/v15.0.2/src/renderers/shared/reconciler/ReactRef.js#L18). 此外官方也不鼓励使用字符串形式的 `ref`.

-  `15.0.2` 版本的 React 有个 bug 会导致某些情况下依赖 `state` 的 `context` 不更新 (参考 example: 02-context), 请等待 React 版本的统一升级.

## LayeredPortal 遮罩传送门

遮罩传送门组件。

### 使用场景

这个组件是`Portal`依赖的内部实现，与`Portal`不同的地方在于`LayeredPortal`没有预设的任何样式，例如prefix等。

### LayeredPortal-API

| 参数        | 说明             | 类型       | 是否必须    | 默认值      | 备选值              |
| --------- | ----------------- | ---------- | ----------- | -------- | ------------------- |
| children  | 只支持一个child        | string         |  否   |     |                |
| render    | 返回传送门需要渲染的内容，优先级高于children | func | 否 | | |
| selector  | 渲染child的DOM节点     | string or DOM Element | 否 | `'body'` | 合法的CSS selector或者某个DOM节点 |
| visible   | 是否渲染child    | bool         | 否 | `true`   |                |
| onMount   | `children` 被 mount 之后的回调函数 | func | 否 | | |
| onUnmount | `children` 被 unmount 之后的回调函数 | func | 否 | | |
| layer | 遮罩的标签名 | string | 否 | `div` | |
| useLayerForClickAway | 是否使用遮罩来触发`Portal`关闭 | boolean | 否 | false | |
| onClickAway | 点击到非`Portal`处的回调 | function | 否 | | |
| onLayerReady | 遮罩准备好时的hook | function | 否 | | |
| className | 遮罩的className      | string | 否 | `''`     |         |
| style | 遮罩的style | object | 否 | | |

## PurePortal 覆盖式传送门

覆盖式传送门组件。

### 使用场景

纯粹的Portal，行为同 React 16 的Portal相同，会将容器中的所有内容覆盖掉。

### PurePortal-API

| 参数        | 说明             | 类型       | 是否必须    | 默认值      | 备选值              |
| --------- | ----------------- | ---------- | ----------- | -------- | ------------------- |
| children  | 只支持一个child        | string         |  否   |     |                |
| render    | 返回传送门需要渲染的内容，优先级高于children | func | 否 | | |
| selector  | 渲染child的DOM节点     | string or DOM Element | 是 | `'body'` | 合法的CSS selector或者某个DOM节点 |
| onMount   | `children` 被 mount 之后的回调函数 | func | 否 | | |
| onUnmount | `children` 被 unmount 之后的回调函数 | func | 否 | | |
