---
title: Tooltip
subtitle: 文字提示
path: component/tooltip
group: 展示
---

## Tooltip
- 多种触发方式：点击，鼠标移入，获得输入焦点，默认为hover时触发
- 只单纯做展示提示同`HTML title`属性，不承载过多的复杂操作
- api和pop组件一致

### API

| 参数        |   说明       | 类型     | 是否必须    | 默认值      | 备选值     |
| ------------| ----------- | -------- | ---------- | ---------- | ---------- |
| title | 弹层的提示文字 | node | 是 | | |
| trigger | 触发方式 | string | 否 | `'hover'` | `'click'`, `'hover'`, `'focus'`, `'none'` |
| position | 弹出框的位置，命名规则：相对触发元素的位置+箭头相对于Tooltip的位置。接受函数形式，参考 `Popover.Position.create` | string \| func | 否 | `'top-center'` |  |
| centerArrow | 是否按小箭头居中对齐trigger来定位 | bool | 否 | `false` |  |
| cushion | 与 Popover 中的`cushion`含义（定位的偏移量）相同，通常为弹框边缘与 trigger 元素之间的距离 | number | 否 | `10` |  |
| containerSelector | 弹层渲染加载到的父节点CSS selector | string | 否 | `'body'` | 所有合法的CSS selector |
| className | 自定义类名 | string | 否 | `''` |  |
| prefix | 自定义前缀 | string | 否 | `'zent'` |  |
| visible | 外部维护 `Tooltip` 的显示状态，此时外部拥有 `Tooltip` 的控制权 | bool | 否 |  | |
| onVisibleChange | 必须和 `visible` 一起使用 | func | 否 | | |

#### 触发方式的额外API

根据 `trigger` 值的不同, `Tooltip` 提供了一些额外的控制参数，同`Pop`组件.

#### Click

| 参数 | 说明 | 类型 | 是否必须 | 默认值 |
|------|------|------|--------|-------|
| closeOnClickOutside | 点击弹层和trigger节点外部时自动关闭 | bool | 否 | `true` |
| isOutside | 用来判断点击目标是否在外面的可选函数 | func | 否 | |

#### Hover

| 参数 | 说明 | 类型 | 是否必须 | 默认值 |
|------|------|------|--------|-------|
| mouseEnterDelay | hover打开的延迟（单位：毫秒） | number | 否 | `160` |
| mouseLeaveDelay | 关闭的的延迟（单位：毫秒） | number | 否 | `160` |
| isOutside | 用来判断点击目标是否在外面的可选函数 | func | 否 | |
| quirk | 开启 Tooltip 的 quirk 模式，该模式下判断关闭条件时不需要先从内部移动出去 | bool | 否 | `true` |

#### None

这种模式下 需要使用者自己在回调中控制 `visible` 来关闭 `Tooltip`.
