---
title: Layout
subtitle: 布局
path: component/layout
group: 基础
---

## Layout 布局

24栅格布局组件

### API

#### Layout

| 属性        | 说明     | 类型     | 默认值      |
| --------- | ------ | ------ | -------- |
| spacing   | 行间距  | `number` | 8 |

#### Row

| 属性        | 说明     | 类型     | 默认值      |
| --------- | ------ | ------ | -------- |
| gutter    | 栅格间距     | `number` | 0 |
| justify   | 水平排列方式：`start` `end` `center` `space-around` `space-between` | `start` |
| align     | 垂直对齐方式：`top` `middle` `bottom` | `top` |
| className | 额外的样式名 | string |          |
| prefix    | UI 前缀  | string | `'zent'` |

#### Col

| 属性        | 说明         | 类型     | 默认值      |
| --------- | ---------- | ------ | -------- |
| span      | 所占的栅格数  | number |          |
| offset    | 左偏移的栅格数 | number |          |
| pull      | 栅格向左移动格数 | number |  0   |
| push      | 栅格向右移动格数 | number | 0   |
| order     | 栅格顺序         | number  | |
| className | 额外的样式名     | string |          |
| prefix    | UI 前缀      | string | `'zent'` |
