---
title: Dropdown
subtitle: 下拉菜单
path: component/dropdown
group: 导航
---

## Dropdown 下拉菜单

向下弹出的弹层组件。

我们不提供单独的名为 `Dropdown` 的组件，`Dropdown` 组件的功能是 `Popover` 组件的一个子集，这个文档描述了如何使用 `Popover` 来实现 `Dropdown` 的功能。

### 使用场景

一般用于下拉菜单。

### API

请参考 [`Popover` 的 API 文档](popover#api)。

### 关于下拉菜单弹出位置

建议使用 `Popover` 提供的 `AutoXxxYxx` 定位方式，例如 `AutoBottomLeft` 默认定位在左下角，但是如果超出屏幕的话会自动调整位置。

可选的定位方式请阅读 [`Popover` 的定位文档](popover#position%20api)。

