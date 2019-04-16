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
| layer | 遮罩的标签名 | string | 否 | `div` | |
| useLayerForClickAway | 是否使用遮罩来触发 `Portal` 关闭 | bool | 否 | `false` | |
| onLayerReady | 遮罩准备好时的hook | (node: HTMLElement) => void | 否 | |
| closeOnClickOutside | 点击到 `Portal` 外部时关闭 | function | 否 | |
| closeOnESC | 按下 ESC 键时关闭 | bool | 否 | `false` |  |
| onClose | 关闭时回调函数 | (e: Event) => void | 否 |  | 
| blockPageScroll | 打开时禁止页面滚动 | bool | 否 | `false` | |
| className | 遮罩的className      | string | 否 |     |         |
| style | 遮罩的style | object | 否 | | |
| css      | (已废弃, 请使用style)额外的css样式. 例如, `{ 'margin-left': '10px' }` | object  | 否 | `{}`     |     |

`Portal` 实例上有一个 `contains` 方法可以用来判断一个 DOM 节点是否是它的子节点，这个方法对嵌套的 `Portal` 内的子节点一样有效。 

### 组件原理

- 组件的主要功能是把其 `child` 插入到一个给定的 DOM node中, 并且在组件被 `unmount` 的时候将其 `child` 属性对应的 DOM 节点删除.
- 任意 props 被修改后会触发一定程度的重绘, `children`, `selector`被修改会导致组件 `unmount` 再 `mount`；其它props被修改仅更新现有 DOM node 的属性.

## PurePortal 覆盖式传送门

覆盖式传送门组件。

### 使用场景

纯粹的Portal，行为同 React 16 的Portal相同，会将容器中的所有内容覆盖掉。

### PurePortal-API

| 参数        | 说明             | 类型       | 是否必须    | 默认值      | 备选值              |
| --------- | ----------------- | ---------- | ----------- | -------- | ------------------- |
| children  | 只支持一个child        | string         |  否   |     |                |
| selector  | 渲染 child 的 DOM 节点     | string or DOM Element | 是 | `'body'` | 合法的CSS selector 或者某个 DOM 节点 |
| append | 是否在将内容添加到容器中，如果是 false 会覆盖容器的内容 | bool | 否 | false |  |
