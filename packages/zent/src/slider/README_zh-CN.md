---
title: Slider
subtitle: 滑动条
path: component/slider
group: 数据
---

## Slider 滑动输入条

通过拖动、点击 `Slider` 组件选择数值

### 使用指南

- 可设置单滑块或者双滑块
- 可与 `Input` 输入框配合使用

### API

| 参数           | 说明              | 类型            | 默认值      | 备选值                     | 是否必填 |
| ------------ | --------------- | ------------- | -------- | ----------------------- | ---- |
| value        | 输入值    | [number,array] |    0      |    [0,0]    | 是    |
| onChange     | change 事件        | func(e:Event) |          |                         | 否    |
| range        | 是否选择范围    | bool          |     false     |                         | 否    |
| max          | 最大范围     | number     | 100 | 50 | 否    |
| min          | 最小范围     | number     |  0  |   -100        | 否    |
| step         | 间隔 | number        |  1     |                 | 否    |
| withInput    | 是否带输入框            | bool          |       true   |                  | 否    |
| dots         | 是否只能在标签值中选择     | bool |       true   |                         | 否    |
| marks        | 标签值     | object |          |                         | 否    |
| disabled     | 是否禁用            | bool          | `false`  |                         | 否    |
| className    | 自定义额外类名         | string        | `''`     |                         | 否    |
| width    | 宽度         | string or number       |     |                         | 否    |
| prefix       | 自定义类前缀          | string        | `'zent'` |                         | 否    |

⚠️注意：`range` 属性设置了必须给一个 `value` 值，且一定为一个长度为2的数组，数组项必须为数字。`dots` 属性配合 `marks` 属性使用。
