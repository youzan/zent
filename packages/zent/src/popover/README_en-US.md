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
| position | Position way, refer to `Popover.Positon` | Positon | | | Yes |
| cushion | Position offset, generally it reserves a space for some icon like arrow | number | `0` | | No |
| onShow |  Callback after pop shows| func | `noop` | | No |
| onClose | Callback after pop closes | func | `noop` | | No |
| onBeforeShow | Callback before pop opens, only triggered by user's operation, setting `visible` outside will not call | func | `noop` | | No |
| onBeforeClose | Callback after pop closes, only triggered by user's operation, setting `visible` outside will not call | `noop` | | No |
| containerSelector | Pop's parent node CSS selector | string | `'body'` | all legal CSS selector | No |
| visible | Manually control pop's show or hide, must be used with `onVisibleChange`  | bool | | | No |
| onVisibleChange | Callback when manual control, must be used with `visible`,  only triggered by user's open/close operation | func | | | No |
| onPositionUpdated | Callback after position updates, a position update does not imply a position change | func | `noop` | | No |
| onPositionReady | Callback after content enters viewport, only called once within the life cycle | func | `noop` |  | No |
| className | Custom extra content class name | string | `''` |  | No |
| style | Custom content styles | `CssProperties` |  |  | 否 |

`onBeforeShow` and `onBeforeClose` will return a  `Promise`，`Popover` will open/close after `Promise` resolve，if  `Promise` reject, open/close opreation will stop.

If you do not use `Promise`, `onBeforeShow` and `onBeforeClose` also supports two arguments `callback` and `escapse`, you have to manual call `callback` to open/close in `onBeforeShow` and `onBeforeClose`. manual call `escape` to stop open/close opreation.

`onBeforeShow(callback: ?function, escape: ?escape): ?Promise`

Every kinds of trigger has it's own API to control component behavior, custom trigger can specifies it's parameter.

#### Trigger.Click

| Property        | Description          | Type        | Default           |  Required |
| --------- | ---------------- | -------------------- | ------------- | -------- |
| closeOnClickOutside | whether to auto close pop when click `outside` | bool  | `true` | No |
| toggle | Toggle mode ｜ boolean | `false` | No |
| getElement  | Customize trigger DOM node | (node: Element | Text | null) => Element| Text | null | findDOMNode | No |

#### Trigger.Hover

| Property        | Description        | Type                   | Default           | Required |
| --------- | ---------------- | -------------------- | ------------- |---------|
| showDelay | the duration before layer open (in milliseconds), during this time, if you move mouse out of layer, pop will not open   | number   | `150`  | No |
| hideDelay | the duration before layer close (in milliseconds), during this time, if you move mouse out of layer, pop will not close  | number    | `150` | No |
| getElement  | Customize trigger DOM node | (node: Element | Text | null) => Element| Text | null | findDOMNode | No |
| anchorOnly | Don't open/close when mouse enter/leave | boolean | `false` | No  |

#### Trigger.Focus

Display when it gets focus， close when it loses focus.

| Property        | Description          | Type        | Default           |  Required |
| --------- | ---------------- | -------------------- | ------------- | -------- |
| getElement  | Customize trigger DOM node | (node: Element | Text | null) => Element| Text | null | findDOMNode | No |

#### Trigger.Base(Deprecated)

Please use `PopoverAnchor` to implement custom trigger, checkout `ClickTrigger` source code.

Custom trigger needs to inherit this class, you have rewrite `getTriggerProps` method to add trigger event.

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

#### Custom position

A position function is just a normal pure function.

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

Anchor is trigger，container is the nearest positioned parent node in the DOM tree.

- `relativeRect` anchor's position relative to container, this is what you want when calculating positions in most cases
- `cushion` position offset
- `anchor` anchor DOM node
- `container` container DOM node
- `content` content DOM node
- `anchorRect` anchor's position/size relative to viewport
- `containerRect` container's position/size relative to viewport
- `contentRect` content's position/size relative to viewport

#### withPopover high-level component

The high-level component provides some important functions. it can be used to manually close pop in `Content`

| Property             | Description                    | Type               |
| -------------- | --------------------- | ---------------- |
| open           | Open content                  | `() => void`             |
| close          | Close content                  | `() => void`             |
| adjustPosition | Reposition content | `() => void` |

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
