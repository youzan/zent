---
title: Dropdown
subtitle: 下拉菜单
path: component/dropdown
group: 导航
---

## Dropdown 下拉菜单

下拉菜单组件，需要配合 `Menu` 组件使用。

### API

请参考 [`Popover` 的 API 文档](popover#api)，`Dropdown` 只是在它的基础上加了一些默认值处理。

`DropdownButton` 支持所有 `Button` 的参数，它的作用是和 `Dropdown` 弹层当前的打开状态做联动。

### 关于下拉菜单弹出位置

建议使用 `Popover` 提供的 `AutoXxxYxx` 定位方式，例如 `AutoBottomLeft` 默认定位在左下角，但是如果超出屏幕的话会自动调整位置。

可选的定位方式请阅读 [`Popover` 的定位文档](popover#position%20api)。

