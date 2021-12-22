---
title: Loading
subtitle: 加载
path: component/loading
group: 反馈
---

## Loading 加载

展示数据无特定时长的载入状态。

### 建议

- 在对于无法立即执行且只需要短时处理的操作时使用；
- 在检索或刷新少量数据（如状态）时使用。

### 注意

- 不允许一次触发多个项目或操作的加载，除非在初始页面加载或刷新时。

### API

`Loading` 有 3 种类型：`BlockLoading`, `InlineLoading` 以及 `FullScreenLoading`。
3 种类型共享大部分参数，每种类型可能有独有的参数。

#### 通用的参数

| 参数         | 说明                 | 类型      | 是否必填 | 默认值      | 备选值                           |
| ------------ | -------------------- | --------- | -------- | ----------- | -------------------------------- |
| loading      | 显示控制             | `boolean` | 否       | `false`     | `true`                           |
| delay        | 显示延迟时间（毫秒） | number    | 否       | `0`         |                                  |
| icon         | 图标样式             | `string`  | 否       | `'circle'`  | `'youzan'`                       |
| iconSize     | 图标大小             | `number`  | 否       |             |                                  |
| iconText     | 图标文案             | `string`  | 否       |             |                                  |
| colorPreset  | 预设主题色           | `string`  | 否       | `'primary'` | `'grey'`                         |
| textPosition | 文案相对图标的位置   | `string`  | 否       | `'bottom'`  | `'top'` \| `'left'` \| `'right'` |
| textSize     | 文案字体大小         | `number`  | 否       |             |                                  |
| className    | 自定义额外类名       | `string`  | 否       |             |                                  |

#### BlockLoading

块级 `Loading`，可以包裹内容，或者给定一个高度。常用于页面区块的加载。

| 参数     | 说明                                                   | 类型        | 是否必填 | 默认值 | 备选值 |
| -------- | ------------------------------------------------------ | ----------- | -------- | ------ | ------ |
| height   | 如果包裹了组件，默认表现为组件高度；否则将使用默认高度 | `number`    | `160`    |        |        |
| children | 包裹的内容                                             | `ReactNode` | 否       |        |        |

#### InlineLoading

内联 `Loading`，不能包裹内容，行内显示。

#### FullScreenLoading

全屏 `Loading`，不能包裹内容，全屏显示。用于页面级的加载。

| 参数           | 说明                        | 类型     | 是否必填 | 默认值 | 备选值 |
| -------------- | --------------------------- | -------- | -------- | ------ | ------ |
| zIndex         | 蒙层 z-index                | `number` | 否       |        |        |
| showBackground | 是否显示 Loading 底部背景色 | `bool`   | 否       |        |        |
