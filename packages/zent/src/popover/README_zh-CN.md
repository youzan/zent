---
title: Popover
subtitle: 弹层
path: component/popover
group: 基础
---

## Popover 弹层

通用的触发式弹层组件, 可以自定义定位算法、触发方式以及弹层显示方式。

组件支持自身多层嵌套。

**这个组件不提供样式, 气泡提示组件请使用 `Pop`。**

### 使用场景

* 如果 `Pop` 组件提供的功能无法满足你的需求，需要实现自定义的触发式弹层时可以使用 `Popover` 来简化开发。
* 可以当做 `Dropdown` 使用。

### API

| 参数 | 说明 | 类型 | 默认值 | 备选值 | 是否必须 |
|------|------|------|--------|--------|-------|
| position | 定位的方式, 参见 `Popover.Position` | Positon | | | 是 |
| cushion | 定位的偏移量, 通常用来预留空间给小箭头等东西 | number | `0` | | 否 |
| onShow | 弹层显示后的回调函数 | func | `noop` | | 否 |
| onClose | 弹层关闭后的回调函数 | func | `noop` | | 否 |
| onBeforeShow | 弹层打开前的回调函数, 只有用户触发的打开操作才会调用, 外部设置 `visible` 不会调用 | func | `noop` | | 否 |
| onBeforeClose | 弹层关闭后的回调函数, 只有用户触发的关闭操作才会调用, 外部设置 `visible` 不会调用 | func | `noop` | | 否 |
| containerSelector | 弹层的父节点CSS selector | string | `'body'` | 所有合法的CSS selector | 否 |
| visible | 手动控制弹层的显示隐藏, 必须和 `onVisibleChange` 一起使用 | bool | | | 否 |
| onVisibleChange | 手动控制时的回调函数, 必须和`visible`一起使用, 只有用户手动触发的打开／关闭操作才会调用 | func | | | 否 |
| onPositionUpdated | 位置更新时的回调，不保证调用这个函数时位置一定变化 | func | `noop` |  | 否 |
| onPositionReady | content 在第一次屏幕内可见时的回调，组件生命周期内只调用一次 | func | `noop` |  | 否 |
| className | 弹层的自定义类名 | string | `''` |  | 否 |
| style | 弹层的自定义样式 | `CssProperties` |  |  | 否 |

`onBeforeShow` 和 `onBeforeClose` 可以返回一个 `Promise`，`Popover` 会在 `Promise` resolve 后打开/关闭，如果 `Promise` reject 的话打开/关闭操作终止。

如果你不使用 `Promise`，`onBeforeShow` 和 `onBeforeClose` 也提供两个可选的参数 `callback` 以及 `escapse`，如果有这两参数的话，你必须在 `onBeforeShow` 和 `onBeforeClose` 里面手动调用 `callback` 才会打开/关闭，如果要终止打开/关闭操作需要手动调用 `escape`。

`onBeforeShow(callback: ?function, escape: ?escape): ?Promise`

每种 trigger 都有特有的 API 来控制组件行为, 自定义 trigger 可以按需指定 trigger 的参数.

#### Trigger.Click

| 参数        | 说明             | 类型             | 默认值     | 是否必须 |
| --------- | ----------------- | --------------- | ------------- | ---- |
| closeOnClickOutside | 是否点击‘外面’自动关闭弹层     | boolean   | `true`    | 否  |
| toggle | 开关模式 ｜ boolean | `false` | 否 |
| getElement  | 自定义 trigger 的 DOM 节点 | (node: Element | Text | null) => Element| Text | null | findDOMNode 的结果 | 否 |

#### Trigger.Hover

| 参数        | 说明        | 类型                   | 默认值           | 是否必须 |
| --------- | ------------ | -------------------- | ------------- |---------|
| showDelay | 打开弹层前的延迟（单位毫秒）, 如果在这段时间内鼠标移出弹层范围, 弹层不会打开   | number   | `150`  | 否 |
| hideDelay | 关闭弹层前的延迟（单位毫秒）, 如果在这段时间内鼠标重新移入弹层范围, 弹层不会关闭 | number    | `150` | 否 |
| getElement  | 自定义 trigger 的 DOM 节点 | (node: Element | Text | null) => Element| Text | null | findDOMNode 的结果 | 否 |
| anchorOnly | 仅考虑 Trigger 作为触发区域 | boolean | `false` | 否  |
| fixMouseEventsOnDisabledChildren | 兼容禁用 Input/Button 的鼠标事件 | boolean | `false` | 否 |

关于禁用元素的鼠标事件问题请参考 https://github.com/youzan/zent/issues/142

#### Trigger.Focus

当获取焦点时显示，失去焦点时关闭。

| 参数        | 说明        | 类型                   | 默认值           | 是否必须 |
| --------- | ------------ | -------------------- | ------------- |---------|
| getElement  | 自定义 trigger 的 DOM 节点 | (node: Element | Text | null) => Element| Text | null | findDOMNode 的结果 | 否 |

#### Trigger.Base(已废弃)

请使用 `PopoverAnchor` 实现自定义的 trigger，请参考 `ClickTrigger` 的源码。

### Position API

Positon用于给弹层提供定位的, 内置12种基础定位, 可以添加自定义定位算法. Popover 上的 `cushion` 参数会影响定位, 通常用来提供一定量的偏移量。

```
// 基础定位

                    TopLeft     TopCenter     TopRight

LeftTop                                                             RightTop


LeftCenter                                                          RightCenter


LeftBottom                                                          RightBottom

                BottomLeft     BottomCenter     BottomRight
```

除了这12种基础定位算法外，还提供了6个会自动根据屏幕剩余空间自动判断合适位置的定位算法: `AutoBottomLeft`，`AutoBottomCenter`, `AutoBottomRight`, `AutoTopLeft`, `AutoTopCenter` 以及 `AutoTopRight`，这些算法适用于下拉式组件。

#### 自定义定位

定位函数是个纯函数，示例：

```ts
const TopCenter: IPositionFunction = (options) => {
	const { contentRect, relativeRect, cushion } = options;
  const { right, left, top } = relativeRect;
  const middle = (left + right) / 2;
  const x = middle - contentRect.width / 2;
  const y = top - contentRect.height - cushion;

  return {
    style: {
      position: 'absolute',
      left: x,
      top: y,
    },

    className: prefix('position-top-center'),
  };
};
```

anchor 是指 trigger，container 是指离弹层最近的有定位的父节点。

`options` 的重要属性说明：

- `relativeRect` 是 anchor 相对于 container 为原点的坐标系的坐标，一般计算位置都是相对于这个做的
- `cushion` 定位的偏移量
- `anchor` anchor 的 DOM 节点
- `container` container 的 DOM 节点
- `content` content 的 DOM 节点
- `anchorRect` anchor 相对于 viewport 的坐标、大小信息
- `containerRect` container 相对于 viewport 的坐标、大小信息
- `contentRect` content 相对于 viewport 的坐标、大小信息

#### withPopover 高阶组件

这个高阶组件暴露了 `Popover` 内部的几个重要方法, 可能的使用场景: 在 `Content` 内部手动关闭弹层.

| 参数             | 说明                    | 类型               |
| -------------- | --------------------- | ---------------- |
| open           | 打开弹层                  | `() => void`             |
| close          | 关闭弹层                  | `() => void`             |
| adjustPosition | 重新定位弹层 | `() => void` |

#### `adjustPosition` 方法

可以通过这个方法调整 `Popover` 的位置。

一般是用于某些特殊场合，`Popover` 无法自动更新位置时手动调用。

<style>
.zent-doc-popover {
	border: 1px solid #e5e5e5;
	padding: 10px;
	border-radius: 4px;
	background: #fff;
	font-size: 14px;
}

.zent-doc-popover-container {
	.zent-popover-wrapper {
		margin-right: 10px;
	}
}
</style>
