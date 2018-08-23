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
| position | 定位的方式, 参见 `Popover.Positon` | Positon | | | 是 |
| cushion | 定位的偏移量, 通常用来预留空间给小箭头等东西 | number | `0` | | 否 |
| display | 在文档流里的出现形式 | string | `'block'` | 所有CSS中合法的 `display` 值 | 否 |
| onShow | 弹层显示后的回调函数 | func | `noop` | | 否 |
| onClose | 弹层关闭后的回调函数 | func | `noop` | | 否 |
| onBeforeShow | 弹层打开前的回调函数, 只有用户触发的打开操作才会调用, 外部设置 `visible` 不会调用 | func | `noop` | | 否 |
| onBeforeClose | 弹层关闭后的回调函数, 只有用户触发的关闭操作才会调用, 外部设置 `visible` 不会调用 | func | `noop` | | 否 |
| containerSelector | 弹层的父节点CSS selector | string | `'body'` | 所有合法的CSS selector | 否 |
| visible | 手动控制弹层的显示隐藏, 必须和 `onVisibleChange` 一起使用 | bool | | | 否 |
| onVisibleChange | 手动控制时的回调函数, 必须和`visible`一起使用, 只有用户手动触发的打开／关闭操作才会调用 | func | | | 否 |
| onPositionUpdated | 位置更新时的回调，不保证调用这个函数时位置一定变化 | func | `noop` |  | 否 |
| onPositionReady | content 位置进入窗口时的回调，生命周期内只调用一次 | func | `noop` |  | 否 |
| className | 自定义额外类名 | string | `''` |  | 否 |
| wrapperClassName | trigger外层包裹div的类名 | string | `''` |  | 否 |
| width | 宽度 | string or number |  |  | 否 |
| prefix | 自定义前缀 | string | `'zent'` |  | 否 |

`onBeforeShow` 和 `onBeforeClose` 可以返回一个 `Promise`，`Popover` 会在 `Promise` resolve 后打开/关闭，如果 `Promise` reject 的话打开/关闭操作终止。

如果你不使用 `Promise`，`onBeforeShow` 和 `onBeforeClose` 也提供两个可选的参数 `callback` 以及 `escapse`，如果有这两参数的话，你必须在 `onBeforeShow` 和 `onBeforeClose` 里面手动调用 `callback` 才会打开/关闭，如果要终止打开/关闭操作需要手动调用 `escape`。

`onBeforeShow(callback: ?function, escape: ?escape): ?Promise`

每种 trigger 都有特有的 API 来控制组件行为, 自定义 trigger 可以按需指定 trigger 的参数.

#### Trigger.Click

| 参数        | 说明             | 类型             | 默认值     | 是否必须 |
| --------- | ----------------- | --------------- | ------------- | ---- |
| autoClose | 是否点击‘外面’自动关闭弹层     | bool    | `true`    | 否  |
| isOutside | 判断一个节点是否在‘外面’, 点击在外面会关闭弹层。默认trigger和弹层以外的节点都是‘外面’ | func: (node, data) => bool | `() => false` | 否 |

isOutside 的 `data` 包含两个属性：`contentNode` 和 `triggerNode`。

#### Trigger.Hover

| 参数        | 说明        | 类型                   | 默认值           | 是否必须 |
| --------- | ------------ | -------------------- | ------------- |---------|
| showDelay | 打开弹层前的延迟（单位毫秒）, 如果在这段时间内鼠标移出弹层范围, 弹层不会打开   | number   | `150`  | 否 |
| hideDelay | 关闭弹层前的延迟（单位毫秒）, 如果在这段时间内鼠标重新移入弹层范围, 弹层不会关闭 | number    | `150` | 否 |
| isOutside | 判断一个节点是否在‘外面’。默认 trigger 和弹层以外的节点都是‘外面’  | func: (node, data) => bool |  | 否 |
| quirk | quirk 模式，该模式下触发关闭时不要求鼠标先从 trigger 和弹层里面出去 | bool | `false` | 否 |

isOutside 的 `data` 包含两个属性：`contentNode` 和 `triggerNode`。

#### Trigger.Focus

当获取焦点时显示，失去焦点时关闭，没有参数。

#### Trigger.Base

所有trigger的基类, 实现自定义 trigger 需继承这个类, 继承时一般需要重写 `getTriggerProps` 方法给 trigger 添加事件, 然后在事件处理函数控制弹层的开/闭。

| 参数                 | 说明                                               | 类型                     |
| ------------------ | ------------------------------------------------ | ---------------------- |
| getTriggerNode     | 获取 trigger 的 DOM node                               | func: () => node       |
| getContentNode     | 获取弹层的 DOM node         | func: () => node       |
| open               | 打开弹层                             | func                   |
| close              | 关闭弹层                         | func                   |
| contentVisible     | 弹层当前是否打开                          | bool                   |
| onTriggerRefChange | trigger的ref改变的时候需要调用的回掉函数, 只有在重写 render 函数的时候需要这个函数 | func:(instance) |
| getNodeForTriggerRefChange | 当 ref 改变时获取实际 trigger DOM 节点的回调函数 | (HTMLElement) => HTMLELement |

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

每个定位算法的对象上都有一个 `locate` 函数，通过这个函数可以实现定位算法的组合。

```jsx
Popover.Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
  if (someCondition) {
	  return Popover.Position.BottomLeft.locate(anchorBoundingBox, containerBoundingBox, contentDimension, options);
  }

  return Popover.Position.TopRight.locate(anchorBoundingBox, containerBoundingBox, contentDimension, options);
});
```

#### Position.create

通过这个工厂函数创建自定义的 position, 这个函数接受一个函数作为参数，示例：

```jsx
// a bounding box is an object with these fields: {top, left, right, bottom, width, height}
const position = Popover.Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
  return {
    getCSSStyle() {
      return {
        position: 'fixed',
        left: 0,
        top: 0,
        opacity: 0
      };
    },

    name: 'position-example'
  };
});
```

anchor 是指 trigger，container 是指离弹层最近的有定位的父节点。

`anchorBoundingBox` 和 `containerBoundingBox` 是相对于 container 左上角的坐标。

`contentDimension` 是弹层的宽高.

`options` 包含了其它可能有用的参数:
* `options.cushion` Props 上传进来的定位偏移量
* `options.anchor` anchor 的 DOM 节点
* `options.container` container 的 DOM 节点
* `options.anchorBoundingBoxViewport` anchor 相对于 viewport 的坐标
* `options.containerBoundingBoxViewport` container 相对于 viewport 的坐标

#### withPopover 高阶组件

这个高阶组件暴露了 `Popover` 内部的几个重要方法, 可能的使用场景: 在 `Content` 内部手动关闭弹层.

| 参数             | 说明                    | 类型               |
| -------------- | --------------------- | ---------------- |
| getTriggerNode | 获取 trigger 的 DOM node | func: () => node |
| getContentNode | 获取弹层的 DOM node        | func: () => node |
| open           | 打开弹层                  | func             |
| close          | 关闭弹层                  | func             |

示例：

```jsx
// 点击close按钮可以关闭弹层
const HoverContent = withPopover(function HoverContent({ popover }) {
  return (
    <div>
      <div>popover content</div>
      <button onClick={popover.close}>close</button>
    </div>
  );
});

<Popover position={Popover.Position.RightTop} display="inline">
  <Popover.Trigger.Hover showDelay={500} hideDelay={200}>
    <button style={{ marginLeft: 100 }}>hover on me</button>
  </Popover.Trigger.Hover>
  <PopoverContent>
    <HoverContent />
  </PopoverContent>
</Popover>
```

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
