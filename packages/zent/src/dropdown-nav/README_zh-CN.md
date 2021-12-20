---
title: DropdownNav
subtitle: 下拉导航
path: component/dropdown-nav
group: 导航
---

## DropdownNav 下拉导航

当页面上的链接过多时，用此组件可以收纳这些链接。

### API

| 参数           | 说明                            | 类型     | 默认值      |
| ------------ | ----------------------------- | ------ | -------- |
| navTitle        | 下拉按钮文字                     | string   | `下拉导航`     |
| trigger        | 触发方式                      | `hover` `click`   | `hover`     |
| navList     | nav的数组 | `Array<{key: string, label: string}>`   | `[]`   |
| onItemClick      | item点击回调函数                     | `(event, key) => void`   | `noop`   |
