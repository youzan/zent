---
title: Waypoint
subtitle: 航点
path: component/waypoint
group: 基础
---

## Waypoint

当滚动到某个 DOM 元素时执行一个函数，支持任意可滚动的容器。

**常见使用场景：**

- 懒加载图片
- 无限滚动
- 固钉

### API

| 参数               | 说明                                                          | 类型                                    | 是否必须 | 默认值  | 备选值 |
| ------------------ | ------------------------------------------------------------- | --------------------------------------- | -------- | ------- | ------ |
| onEnter            | 元素滚动到屏幕内时的回调函数                                  | `(data: IWaypointCallbackData) => void` | 否       |         |        |
| onLeave            | 元素滚动到屏幕外时的回调函数                                  | `(data: IWaypointCallbackData) => void` | 否       |         |        |
| onPositionChange   | 元素位置变化时的回调函数                                      | `(data: IWaypointCallbackData) => void` | 否       |         |        |
| topOffset          | 距离容器顶部的距离                                            | `number` \| `string`                    | 否       | `0px`   |        |
| bottomOffset       | 距离容器底部的距离                                            | `number` \| `string`                    | 否       | `0px`   |        |
| horizontal         | 是否使用水平滚动模式                                          | `boolean`                               | 否       | `false` | `true` |
| scrollableAncestor | 指定滚动容器的 DOM 元素，一般当外层有多个滚动容器时才需要使用 | `Element`                               | 否       |         |        |
| fireOnRapidScroll  | 当快速滚动时是否触发 `onEnter` 和 `onLeave`                   | `boolean`                               | 否       | `true`  |        |
| children           | 待追踪的元素，不传时可以认为是追踪屏幕内一条线                | `ReactNode`                             | 否       |         |        |

**几点说明**

- [`IWaypointCallbackData` 的定义](../../apidoc/interfaces/iwaypointcallbackdata.html)
- 快速滚动顾名思义就是滚动速度非常快，元素可能进入屏幕后立刻又出了屏幕
- `topOffset` 和 `bottomOffset` 可正可负，正负数效果和 `margin` 一样，正数往屏幕内偏移，负数往屏幕外偏移
- `topOffset` 和 `bottomOffset` 可以是一个百分比，这个百分比是相对滚动容器大小的
- 开启 `horizontal` 后，`topOffset` 其实是 `leftOffset`，而 `bottomOffset` 其实是 `rightOffset`，参数名特意没有变
- `children` 只能是**一个**元素，这个元素必须是原生组件、`React.forwardRef` 包装过的自定义组件，或者是接受一个 `innerRef` 参数的自定义组件，其中自定义组件必须把 `ref` 设置到需要跟踪位置的 DOM 元素上
