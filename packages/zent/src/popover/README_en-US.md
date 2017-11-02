---
title: Popover
path: component/popover
group: Basics
---

## Popover

common trigger pop widget, you can customize postion、trigger method、display style.

the widget supports nested pop

**the widget do not support style, if you need bubble-like tips component, please use `Pop`.**


### Guides

* if `Pop` widget do not meet your needs, you can achieve custom trigger pop by using `Popover` 
* can be used as `Dropdown`

### API

| Property | Description | Type | Default | Alternative |
|------|------|------|--------|--------|
| position | position way, refer to `Popover.Positon` | Positon | | |
| cushion | optional, position offset, generally it reserves a space for some icon like array | number | `0` | |
| display | optional, the display property specifies the type of box used for an HTML element. | string | `'block'` | all legal `display` value in CSS |
| onShow |  optional, the callback after pop shows| func | `noop` | |
| onClose | optional, the callback after pop closes | func | `noop` | |
| onBeforeShow | optional, the callback before pop opens, only triggered by user's operation, setting `visible` outside will not call | func | `noop` | |
| onBeforeClose | optional, the callback after pop closes, only triggered by user's operation, setting `visible` outside will not call | `noop` | |
| containerSelector | optional, pop's parent node CSS selector | string | `'body'` | 所有合法的CSS selector |
| visible | optional, manual control pop's show or hide, must be used with `onVisibleChange`  | bool | | |
| onVisibleChange | optional, the callback when manual control, must be used with `visible`,  only triggered by user's open/close operation | func | | |
| className | optional, custom extra class name | string | `''` |  |
| wrapperClassName |  optional, trigger outerline div classname | string | `''` |  |
| prefix | optional, custom prefix  | string | `'zent'` |  |

`onBeforeShow` and `onBeforeClose` will return a  `Promise`，`Popover` will open/close after `Promise` resolve，if  `Promise` reject, open/close opreation will stop.

if you do not use `Promise`, `onBeforeShow` and `onBeforeClose` also supports two arguments `callback` and `escapse`, you have to manual call `callback` to open/close in `onBeforeShow` and `onBeforeClose`. manual call `escape` to stop open/close opreation.


`onBeforeShow(callback: ?function, escape: ?escape): ?Promise`


every kinds of trigger has it's own API to control component behavior, custom trigger can specifies it's parameter.

#### Trigger.Click

| Property        | Description                                               | Type                   | Default           |
| --------- | ------------------------------------------------ | -------------------- | ------------- |
| autoClose | optional, whether to auto close pop when click `outside`                               | bool                 | `true`        |
| isOutside | optional, to determine a node is `outside` or not, click outside to close pop. default trigger and the node outside pop is `outside` | func: (node, data) => bool | `() => false` |

the `data` in isOutside includes two attributes ：`contentNode` and `triggerNode`。

#### Trigger.Hover

| Property        | Description        | Type                   | Default           |
| --------- | ---------------------------------------- | -------------------- | ------------- |
| showDelay | optional, the duration before layer open (in milliseconds), during this time, if you move mouse out of layer, pop will not open   | number   | `150`  |
| hideDelay | optional, the duration before layer close (in milliseconds), during this time, if you move mouse out of layer, pop will not close  | number    | `150` |
| isOutside | optional,to determine a node is `outside` or not. default trigger and the node outside pop is `outside` | func: (node, data) => bool |  |
| quirk | optional，quirk mode，in this mode, mouse is not required to move out trigger and layer when close triggers | bool | `false` |

the `data` in isOutside includes two attributes：`contentNode` 和 `triggerNode`。

#### Trigger.Focus

display when it gets focus， close when it loses focus, no params

#### Trigger.Base

all trigger's base class,  implement custom trigger need to inherit this class, you have rewrite `getTriggerProps` method to add trigger event. and you can control pop's open/close in event handle function.

| Property                 | Description                                               | Type                     |
| ------------------ | ------------------------------------------------ | ---------------------- |
| getTriggerNode     | get trigger's DOM node                               | func: () => node       |
| getContentNode     | get pop's DOM node                                    | func: () => node       |
| open               | open pop                                             | func                   |
| close              | close pop                                             | func                   |
| contentVisible     | whether ccurent pop is opened or not                                          | bool                   |
| onTriggerRefChange | trigger的ref改变的时候需要调用的回掉函数, 只有在重写 render 函数的时候需要这个函数 | func:(instance) |

### Position API

Position is used to position layer. there is 12 kinds of basic positions. and you can add custom position algorithm. the `cushion` on Popover affect position. it usually provides offset.


```
                    TopLeft     TopCenter     TopRight

LeftTop                                                             RightTop


LeftCenter                                                          RightCenter


LeftBottom                                                          RightBottom

                BottomLeft     BottomCenter     BottomRight
```

except for 12 kinds of basic position algorithm, there is 6 position algorithm to automatically determine appropriate position according to the left space in screen: `AutoBottomLeft`，`AutoBottomCenter`, `AutoBottomRight`, `AutoTopLeft`, `AutoTopCenter` and `AutoTopRight`. those algorithm is used for dropdown widget。


every object in position algorithm has a `locate` function which can be used to implement a combination of positioning algorithms.


```jsx
Popover.Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
  if (someCondition) {
	  return Popover.Position.BottomLeft.locate(anchorBoundingBox, containerBoundingBox, contentDimension, options);
  }

  return Popover.Position.TopRight.locate(anchorBoundingBox, containerBoundingBox, contentDimension, options);
});
```

#### Position.create

the factory function, receiving a function as parameter, is used to customize position

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

`anchorBoundingBox` and `containerBoundingBox` is relative to container's 左上角的坐标。

`contentDimension` 是弹层的宽高.

`options` 包含了其它可能有用的参数:
* `options.cushion` Props 上传进来的定位偏移量
* `options.anchor` anchor 的 DOM 节点
* `options.container` container 的 DOM 节点
* `options.anchorBoundingBoxViewport` anchor 相对于 viewport 的坐标
* `options.containerBoundingBoxViewport` container 相对于 viewport 的坐标

#### withPopover 高阶组件

这个高阶组件暴露了 `Popover` 内部的几个重要方法, 可能的使用场景: 在 `Content` 内部手动关闭弹层.

| Property             | Description                    | Type               |
| -------------- | --------------------- | ---------------- |
| getTriggerNode | get trigger's DOM node | func: () => node |
| getContentNode | get layer's DOM node        | func: () => node |
| open           | open layer                  | func             |
| close          | close layer                  | func             |

example：

```jsx
// click close button to close layer
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
