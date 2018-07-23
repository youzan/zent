---
title: Pop
subtitle: 气泡提示
path: component/pop
group: 反馈
---

## 气泡提示 Pop

气泡提示组件

### 使用指南

- 多种触发方式：点击，鼠标移入，获得输入焦点
- 支持 Tooltip 的使用方式
- 支持对浮层上的元素进行操作, 可以承载相对复杂的内容, 比如链接、按钮等


### API

| 参数 | 说明 | 类型 | 是否必须 |默认值 | 备选值 |
|------|------|------|--------|--------|-----|
| content | 弹层的内容 | node | 是 | | |
| trigger | 触发方式 | string | 否 | `'none'` | `'click'`, `'hover'`, `'focus'` |
| position | 弹出框的位置，命名规则：相对触发元素的位置+箭头相对于Pop的位置 | string | 否 | `'top-center'` |  |
| centerArrow | 是否按小箭头居中对齐trigger来定位 | bool | 否 | `false` |  |
| header | 用户可以自定义头部 | node | 否  | | |
| block | 弹层在文档流里是否以块级元素出现 | bool | 否 |  `false` |  |
| onShow | 弹层打开后的回调函数 | func | 否 | `noop` | |
| onClose | 弹层关闭后的回调函数 | func | 否 | `noop` | |
| onBeforeShow | 弹层打开前的回调函数，只有用户触发的打开操作才会调用，外部设置`visible`不会调用 | func | 否 | `noop` | |
| onBeforeClose | 弹层关闭前的回调函数, 只有用户触发的关闭操作才会调用，外部设置`visible`不会调用 | func |否 |  `noop` | |
| onConfirm | 用户自定义回调，设置以后pop 表现为confirm | func | 否 |  |  |
| onCancel | 用户使用 confirm 的时候可自定义取消的回调 | func | 否  |  |  |
| confirmText | 用户自定义按钮名 | string | 否 | `'确定'` |  |
| cancelText | 用户自定义取消按钮 | string | 否 | `'取消'` |  |
| type | 影响确定按钮的样式 | string | 否  | `'primary'` | `'default'`, `'danger'`, `'success'` |
| visible | 外部维护 `Pop` 的显示状态，此时外部拥有 `Pop` 的全部控制权，必须和 `onVisibleChange` 一起使用 | bool | 否 |  | |
| onVisibleChange | 和 `visible` 一起使用 | func | 否 | | |
| onPositionUpdated | 位置更新时的回调，不保证调用这个函数时位置一定变化 | func | 否 | `noop` | |
| onPositionReady | 位置进入窗口时的回调，生命周期内只调用一次 | func | 否 | `noop` | |
| containerSelector | 弹层的父节点CSS selector | string | 否 | `'body'` | 所有合法的CSS selector | |
| className | 自定义类名 | string | 否 | `''` |  |
| wrapperClassName | 自定义trigger包裹节点的类名 | string | 否 | `''` |  |
| prefix | 自定义前缀 | string | 否 | `'zent'` |  |

根据 `trigger` 值的不同, `Pop` 提供了一些额外的控制参数.

#### Click

| 参数 | 说明 | 类型 | 是否必须 | 默认值 |
|------|------|------|--------|-------|
| closeOnClickOutside | 点击弹层和trigger节点外部时自动关闭 | bool | 否 | `true` |
| isOutside | 用来判断点击目标是否在外面的可选函数 | func | 否 | |

#### Hover

| 参数 | 说明 | 类型 | 是否必须 | 默认值 |
|------|------|------|--------|-------|
| mouseEnterDelay | hover打开的延迟（单位：毫秒） | number | 否 | `200` |
| mouseLeaveDelay | 关闭的的延迟（单位：毫秒） | number | 否 | `200` |
| isOutside | 用来判断点击目标是否在外面的可选函数 | func | 否 | |
| quirk | 开启 Popover 的 quirk 模式，该模式下判断关闭条件时不需要先从内部移动出去 | bool | 否 | `true` |

#### None

这种模式下 `onConfirm` 和 `onCancel` 不会自动关闭 `Pop`, 需要使用者自己在回调中控制 `visible` 来关闭 `Pop`.

#### withPop 高阶组件

这个高阶组件暴露了 `Pop` 内部的几个重要方法, 可能的使用场景: 在 `content` 内部手动关闭弹层.

| 参数            | 说明                    | 类型               |
| -------------- | ---------------------   | ------------------ |
| open           | 打开 Pop                 | func             |
| close          | 关闭 Pop                 | func             |

#### `adjustPosition` 方法

用于手动调整 `Pop` 位置。

#### `getWrappedPopover` 方法

用于获取内部的 `Popover` 实例。

### FAQ

#### centerArrow

默认情况下, `Pop` 根据 `position` 对齐的是弹层和trigger的边缘, 除了 `postion` 为 `'*-center'` 的情况下, 弹层上的小箭头和弹层边缘的间距是固定的, 因而在 trigger 特别小的情况下箭头会对齐到 trigger 外部. 这种情况下可以设置 `centerArrow` 为 `true`, 不管trigger大小如何, 箭头永远对齐在trigger中间, 弹层再相对箭头做定位.

#### onConfirm 和 onCancel

支持异步响应，此时按钮会变成loading状态。

- 如果返回 `Promise`, `Pop` 会在 `Promise` `resolve` 后关闭.
- 也支持参数形式的异步响应, 此时接受一个参数 `close`, 需要在函数内手动调用 `close` 函数.

