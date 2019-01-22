---
title: Layout
subtitle: 布局
path: component/layout
group: 基础
---

## Layout 布局

基于 `flex` 的 24 栅格布局组件。

### API

#### Layout

| 属性        | 说明     | 类型     | 默认值      |
| --------- | ------ | ------ | -------- |
| className   | 自定义类名  | `string` |  |

#### Row

| 属性        | 说明     | 类型     | 默认值      |
| --------- | ------ | ------ | -------- |
| justify   | 水平排列方式：`start` `end` `center` `space-around` `space-between` | `start` |
| align     | 垂直对齐方式：`top` `middle` `bottom` | `top` |
| className | 额外的样式名 | string |          |

#### Col

| 属性        | 说明         | 类型     | 默认值      |
| --------- | ---------- | ------ | -------- |
| span      | 所占的栅格数  | number |          |
| offset    | 左偏移的栅格数 | number |          |
| order     | 栅格顺序         | number  | |
| className | 额外的样式名     | string |          |
