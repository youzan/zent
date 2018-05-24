---
title: Popover
path: component/popover
group: Basics
---

## Popover

Common trigger pop widget, you can customize postion、trigger method、display style.

The widget supports nested pop

**The widget do not support style, if you need bubble-like tips component, please use `Pop`.**


### Guides

* If `Pop` widget do not meet your needs, you can achieve custom trigger pop by using `Popover`
* Can be used as `Dropdown`

### API

| Property | Description | Type | Default | Alternative | Required |
|------|------|------|--------|--------|--------|
| position | position way, refer to `Popover.Positon` | Positon | | | Yes |
| cushion | position offset, generally it reserves a space for some icon like array | number | `0` | | No |
| display | the display property specifies the type of box used for an HTML element. | string | `'block'` | all legal `display` value in CSS | No |
| onShow |  the callback after pop shows| func | `noop` | | No |
| onClose | the callback after pop closes | func | `noop` | | No |
| onBeforeShow | the callback before pop opens, only triggered by user's operation, setting `visible` outside will not call | func | `noop` | | No |
| onBeforeClose | the callback after pop closes, only triggered by user's operation, setting `visible` outside will not call | `noop` | | No |
| containerSelector | pop's parent node CSS selector | string | `'body'` | all legal CSS selector | No |
| visible | manual control pop's show or hide, must be used with `onVisibleChange`  | bool | | | No |
| onVisibleChange | the callback when manual control, must be used with `visible`,  only triggered by user's open/close operation | func | | | No |
| onPositionUpdated | callback after position updates, a position update does not imply a position change | func | `noop` | | No |
| onPositionReady | callback after content enter viewport, only called once within the life cycle | func | `noop` |  | No |
| className | custom extra class name | string | `''` |  | No |
| wrapperClassName |  trigger outerline div classname | string | `''` |  | No |
| width | width | string or number |  |  | No |
| prefix | custom prefix  | string | `'zent'` |  | No |

`onBeforeShow` and `onBeforeClose` will return a  `Promise`，`Popover` will open/close after `Promise` resolve，if  `Promise` reject, open/close opreation will stop.

If you do not use `Promise`, `onBeforeShow` and `onBeforeClose` also supports two arguments `callback` and `escapse`, you have to manual call `callback` to open/close in `onBeforeShow` and `onBeforeClose`. manual call `escape` to stop open/close opreation.

`onBeforeShow(callback: ?function, escape: ?escape): ?Promise`

Every kinds of trigger has it's own API to control component behavior, custom trigger can specifies it's parameter.

#### Trigger.Click

| Property        | Description          | Type        | Default           |  Required |
| --------- | ---------------- | -------------------- | ------------- | -------- |
| autoClose | whether to auto close pop when click `outside` | bool  | `true` | No |
| isOutside | to determine a node is `outside` or not, click outside to close pop. default trigger and the node outside pop is `outside` | func: (node, data) => bool | `() => false` | No |

The `data` in isOutside includes two attributes ：`contentNode` and `triggerNode`。

#### Trigger.Hover

| Property        | Description        | Type                   | Default           | Required |
| --------- | ---------------- | -------------------- | ------------- |---------|
| showDelay | the duration before layer open (in milliseconds), during this time, if you move mouse out of layer, pop will not open   | number   | `150`  | No |
| hideDelay | the duration before layer close (in milliseconds), during this time, if you move mouse out of layer, pop will not close  | number    | `150` | No |
| isOutside | to determine a node is `outside` or not. default trigger and the node outside pop is `outside` | func: (node, data) => bool |  | No |
| quirk | quirk mode，in this mode, mouse is not required to move out trigger and layer when close triggers | bool | `false` | No |

The `data` in isOutside includes two attributes：`contentNode` 和 `triggerNode`。

#### Trigger.Focus

Display when it gets focus， close when it loses focus, no params

#### Trigger.Base

All trigger's base class,  implement custom trigger need to inherit this class, you have rewrite `getTriggerProps` method to add trigger event. and you can control pop's open/close in event handle function.

| Property                 | Description                                               | Type                     |
| ------------------ | ------------------------------------------------ | ---------------------- |
| getTriggerNode     | Get trigger's DOM node                               | func: () => node       |
| getContentNode     | Get pop's DOM node                                    | func: () => node       |
| open               | Open pop                                             | func                   |
| close              | Close pop                                             | func                   |
| contentVisible     | Is popover content visible          | bool                   |
| onTriggerRefChange | Callback when ref changes. It is only needed when you rewrite render function | func:(instance) |
| getNodeForTriggerRefChange | Callback to get the actual trigger DOM node when ref changes | (HTMLElement) => HTMLELement |

### Position API

Position is used to position layer. there are 12 kinds of basic positions. You can add custom position algorithms. The `cushion` on Popover affect position. It usually acts as an offset.

```
// Basic positions

                    TopLeft     TopCenter     TopRight

LeftTop                                                             RightTop


LeftCenter                                                          RightCenter


LeftBottom                                                          RightBottom

                BottomLeft     BottomCenter     BottomRight
```

Except for 12 kinds of basic position algorithm, there is 6 position algorithm to automatically determine appropriate position according to the left space in screen: `AutoBottomLeft`，`AutoBottomCenter`, `AutoBottomRight`, `AutoTopLeft`, `AutoTopCenter` and `AutoTopRight`. those algorithm is used for dropdown widget。


Every object in position algorithm has a `locate` function which can be used to implement a combination of positioning algorithms.


```jsx
Popover.Position.create((anchorBoundingBox, containerBoundingBox, contentDimension, options) => {
  if (someCondition) {
	  return Popover.Position.BottomLeft.locate(anchorBoundingBox, containerBoundingBox, contentDimension, options);
  }

  return Popover.Position.TopRight.locate(anchorBoundingBox, containerBoundingBox, contentDimension, options);
});
```

#### Position.create

The factory function, receiving a function as parameter, is used to customize position

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

Anchor means trigger，container is nearst layer's parent node which have it's own position.

`anchorBoundingBox` and `containerBoundingBox` is relative to container's upper-left corner.

`contentDimension` is layer's width and height.

`options` contains another useful arguments:
* `options.cushion` position offset passed by Props
* `options.anchor` anchor's DOM node
* `options.container` container's DOM node
* `options.anchorBoundingBoxViewport` anchor is a coordinate relative to viewport
* `options.containerBoundingBoxViewport` container is a coordinate relative to viewport

#### withPopover high-level component

The high-level component provides some important functions. it can be used to manually close pop in `Content`

| Property             | Description                    | Type               |
| -------------- | --------------------- | ---------------- |
| getTriggerNode | get trigger's DOM node | func: () => node |
| getContentNode | get layer's DOM node        | func: () => node |
| open           | open layer                  | func             |
| close          | close layer                  | func             |

Example：

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

#### `adjustPosition`

You can use this method to update `Popover` position.

You rarely need it. `Popover` will update its position automatically on window scroll and resize.

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
