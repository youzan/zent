# zent-utils

[![npm version](https://img.shields.io/npm/v/zent-utils.svg?style=flat)](https://www.npmjs.com/package/zent-utils) [![downloads](https://img.shields.io/npm/dt/zent-utils.svg)](https://www.npmjs.com/package/zent-utils)

组件库的工具函数／工具组件

## API

### WindowEventHandler

在`window`上绑定全局事件.

| 参数         | 说明           | 类型     | 默认值     |
| ---------- | ------------ | ------ | ------- |
| eventName  | 事件名字         | string |         |
| callback   | 事件的回调函数      | func   | `noop`  |
| useCapture | 是否为capture事件 | bool   | `false` |

### WindowResizeHandler

监听全局的 `resize` 事件.

| 参数       | 说明            | 类型   |
| -------- | ------------- | ---- |
| onResize | resize事件的回调函数 | func |

### DOM 工具函数

#### findPositionedParent

`findPositionedParent(element: Node, inclusive: bool): Node`

搜索DOM树中最近的一个有指定 `position` 属性的节点, `inclusive` 为true时, `element` 也会加入搜索路径中.

#### getViewportSize

`getViewportSize(): { width: number, height: number }`

获取当前viewport的大小, viewport指浏览器的可视空间.

#### localStorage Helpers

- `read(namespace: string, key: string)`
- `write(namespace: string, key: string, value: string)`
- `remove(namespace: string, key: string)`


#### Smooth scroll

`scroll(element: HTMLElement, x: number, y: number, duration?: number)`

#### UUID

`uuid()` generate a UUID.
