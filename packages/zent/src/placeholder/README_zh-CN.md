---
title: Placeholder
subtitle: 占位块
path: component/placeholder
group: 反馈
---

## Placeholder 占位块

占位块，用于区块等待状态时的占位展示。

### 使用指南

- 当区块处于渲染中或者加载异步数据时，可以使用此组件减少用户等待时的焦虑感。
- 提供了可以组合的基础组件，以及常用预设组合。
- 预设组合不满足需求时可以使用提供的基础组件自定义。

### API

预设组合组件包括：`TextBlock` 文本块，以及 `RichTextBlock` 富文本块。

基础组件包括：`TextRow`, `TextRowDashed`, `Circle` 以及 `Rectangle`，当预设组合组件不满足需求时可以使用这些基础组件自定义新的占位块。

### TextBlock

文本块，可以控制行内是否分段。

| 参数         |   说明         | 类型     | 是否必须    | 默认值      | 备选值            |
| ------------ | ------------- | -------- | ---------- | ---------- | ----------------- |
| rows         | 文本块行数     | `number` | 是          |           |         |
| widths       | 文本块宽度池，文本行宽度是从这个数组里循环取的。每个宽度都是百分比 | `number[]` | 否 | 略 | |
| dashed       | 文本行是否分段  | `bool`  | 否          | `true`    | `false` |
| dashSegments | 文本行分段配置池，每段都是百分比或者固定宽度 | `(number | string)[][]` | 否 |略 | |
| lineSpacing  | 顶部间距       | `string` \| `number`    |  否   |  `'0.7em'`   |  |
| style        | 额外样式       | `object`  |  否       | `{}`       |  |
| animate      | 是否开启动画   | `bool`    | 否         |  `true`   | `false`  |
| className    | 额外类名       | `string`  | 否         |  `''`     |   |
| prefix       | 自定义类名前缀  | `string`  | 否         | `'zent'`  |   |

### RichTextBlock

支持所有 `TextBlock` 的参数，以及如下额外参数。

| 参数         |   说明         | 类型     | 是否必须    | 默认值      | 备选值            |
| ------------ | ------------- | -------- | ---------- | ---------- | ----------------- |
| shape        | 图形形状，支持圆形和正方形 | `string` | 否 | `'circle'` | `'rect'` |
| size         | 图形大小       | `number` \| `string` | 否 | `80` | |

### TextRow

文本行，整行显示，无分段。

| 参数         |   说明         | 类型     | 是否必须    | 默认值      | 备选值            |
| ------------ | ------------- | -------- | ---------- | ---------- | ----------------- |
| lineSpacing  | 顶部间距       | `string` \| `number`    |  否   |  `'0.7em'`   |  |
| style        | 额外样式       | `object`  |  否       | `{}`       |  |
| animate      | 是否开启动画   | `bool`    | 否         |  `true`   | `false`  |
| className    | 额外类名       | `string`  | 否         |  `''`     |   |
| prefix       | 自定义类名前缀  | `string`  | 否         | `'zent'`  |   |

### TextRowDashed

分段文本行。

| 参数         |   说明         | 类型     | 是否必须    | 默认值      | 备选值            |
| ------------ | ------------- | -------- | ---------- | ---------- | ----------------- |
| segments     | 分段配置       | `(number | string)[]`  | 否         | 随机生成    |       |
| lineSpacing  | 顶部间距       | `string` \| `number`    |  否   |  `'0.7em'`   |  |
| style        | 额外样式       | `object`  |  否       | `{}`       |  |
| animate      | 是否开启动画   | `bool`    | 否         |  `true`   | `false`  |
| className    | 额外类名       | `string`  | 否         |  `''`     |   |
| prefix       | 自定义类名前缀  | `string`  | 否         | `'zent'`  |   |

### Circle

圆形，可以指定半径。

| 参数         |   说明         | 类型     | 是否必须    | 默认值      | 备选值            |
| ------------ | ------------- | -------- | ---------- | ---------- | ----------------- |
| diameter     | 圆直径         | `number` \| `string`  | 否         | `80`       |   |
| style        | 额外样式       | `object`  |  否       | `{}`       |  |
| animate      | 是否开启动画   | `bool`    | 否         |  `true`   | `false`  |
| className    | 额外类名       | `string`  | 否         |  `''`     |   |
| prefix       | 自定义类名前缀  | `string`  | 否         | `'zent'`  |   |

### Rectangle

矩形，可以指定长宽。

| 参数         |   说明         | 类型     | 是否必须    | 默认值      | 备选值            |
| ------------ | ------------- | -------- | ---------- | ---------- | ----------------- |
| width        | 宽度         | `number` \| `string` | 否         | `80`       |   |
| height       | 高度         | `number` \| `string` | 否         | `80`       |   |
| style        | 额外样式       | `object`  |  否       | `{}`       |  |
| animate      | 是否开启动画   | `bool`    | 否         |  `true`   | `false`  |
| className    | 额外类名       | `string`  | 否         |  `''`     |   |
| prefix       | 自定义类名前缀  | `string`  | 否         | `'zent'`  |   |
