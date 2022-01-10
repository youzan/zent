---
title: DropdownNav
subtitle: 下拉导航
path: component/dropdown-nav
group: 导航
---

## DropdownNav 下拉导航

当页面上的链接过多时，用此组件可以收纳这些链接。

仅在特定情况下使用，如果不满足使用条件，可以使用dropdown自行封装。



### API

| 参数           | 说明                            | 类型     | 默认值      |
| ------------ | ----------------------------- | ------ | -------- |
| trigger        | 触发方式                      | `hover` `click`   | `hover`     |
| list     | nav的数组 | `Array<{key: string, label: string}>`   | `[]`   |
| onItemClick      | item点击回调函数                     | `(event, key) => void`   | `noop`   |
