---
title: Loading
subtitle: 等待
path: component/loading
group: 反馈
---

## Loading 等待

等待，用于页面或者区块的等待状态。

### 使用指南

- 当页面处于渲染中或者加载异步数据时，可以使用此组件减少用户等待时的焦虑感

### API

`Loading` 有 3 种类型：`BlockLoading`, `InlineLoading` 以及 `FullScreenLoading`。
3 种类型共享大部分参数，每种类型可能有独有的参数。

#### 通用的参数

| 参数         | 说明                 | 类型   | 是否必填 | 默认值     | 备选值                           |
| ------------ | -------------------- | ------ | -------- | ---------- | -------------------------------- |
| loading      | 显示控制             | bool   | 否       | `false`    | `true`                           |
| delay        | 显示延迟时间（毫秒） | number | 否       | `0`        |                                  |
| icon         | 图标样式             | string | 否       | `'youzan'` | `'circle'`                       |
| iconSize     | 图标大小             | number | 否       |            |                                  |
| iconText     | 图标文案             | string | 否       |            |                                  |
| textPosition | 文案相对图标的位置   | string | 否       | `'bottom'` | `'top'` \| `'left'` \| `'right'` |
| className    | 自定义额外类名       | string | 否       |            |                                  |

#### BlockLoading

块级 `Loading`，可以包裹内容，或者给定一个高度。常用于页面区块的加载。

| 参数     | 说明                                                   | 类型   | 是否必填 | 默认值 | 备选值 |
| -------- | ------------------------------------------------------ | ------ | -------- | ------ | ------ |
| height   | 如果包裹了组件，默认表现为组件高度；否则将使用默认高度 | number | `160`    |        |        |
| children | 包裹的内容                                             | node   | 否       |        |        |

#### InlineLoading

内联 `Loading`，不能包裹内容，行内显示。

#### FullScreenLoading

全屏 `Loading`，不能包裹内容，全屏显示。用于页面级的加载。

| 参数   | 说明         | 类型   | 是否必填 | 默认值 | 备选值 |
| ------ | ------------ | ------ | -------- | ------ | ------ |
| zIndex | 蒙层 z-index | number | 否       |        |        |
