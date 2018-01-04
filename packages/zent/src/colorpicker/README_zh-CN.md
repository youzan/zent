---
title: ColorPicker
subtitle: 颜色选择器
path: component/colorpicker
group: 数据
---

## ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

### API

#### ColorPicker

| 参数            | 说明               | 类型                |  默认值   | 可选值 |
| ------------- | ------------------- | ------------------- | ----------- | --------- |
| color         | 颜色选择器的颜色      | string              |          |   `'#5197FF'` 或  `'rgba(81, 151, 255, 0.6)'`  |
| showAlpha     | 是否显示透明度选择    | bool                | `false`  |   `true/false`     |
| type          | 颜色选择器类型       | string              | `'default'`   |   `'default'`、`'simple'`      |
| presetColors  | 简化版自定义颜色数组  | array | [`'#FFFFFF'`, `'#F8F8F8'`, `'#F2F2F2'`, `'#999999'`, `'#444444'`, `'#FF4444'`, `'#FF6500'`, `'#FF884D'`, `'#FFCD00'`, `'#3FBD00'`, `'#3FBC87'`, `'#00CD98'`, `'#5197FF'`, `'#BADCFF'`, `'#FFEFB8'`] |         |
| onChange      | 颜色变化时回调函数    | func(color)         | `noop`   |         |
| className     | 可选，自定义类名      | string              | `''`     |         |
| wrapperClassName | 可选，自定义trigger包裹节点的类名 | string | `''`    |         |
| prefix        | 可选，自定义前缀      | string              | `'zent'` |         |

#### ColorBoard

| 参数            | 说明               | 类型                |  默认值   | 可选值 |
| ------------- | ------------------- | ------------------- | ----------- | --------- |
| color         | 颜色选择器的颜色      | string              |          |   `'#5197FF'` 或  `'rgba(81, 151, 255, 0.6)'`  |
| showAlpha     | 是否显示透明度选择    | bool                | `false`  |   `true/false`     |
| onChange      | 颜色变化时回调函数    | func(color)         | `noop`   |         |
| className     | 可选，自定义类名      | string              | `''`     |         |
| prefix        | 可选，自定义前缀      | string              | `'zent'` |         |
