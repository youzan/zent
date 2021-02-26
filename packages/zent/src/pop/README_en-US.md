---
title: Pop
path: component/pop
group: Feedback
---

## Pop

A floating card opened by clicking, hovering or focusing.

### Guides

- Triggers: click, hover and focus
- Can be used as tooltip
- Supports arbitary content in popup


### API

| Property | Description | Type | Required | Default | Alternative |
|------|------|------|--------|--------|-------|
| content | Pop content | `node` | Yes | | |
| trigger | Trigger method | string | No | `'none'` | `'click'`, `'hover'`, `'focus'` |
| position | Pop content position, naming rule: content position relative to trigger + arrow position relative to Pop. Can be a placement function, see `Popover.Position.create` | string \| func | No | `'top-center'` |  |
| centerArrow | Always center arrow to trigger | bool | No | `false` |  |
| cushion | Same as the `cushion` in Popover, which is usually the distance between the edge of the Pop and the trigger element | number | No | `10` |  |
| header | Pop header | node | No | | |
| block | Is trigger a block element | bool | No | `false` |  |
| onShow | Callback after Pop has opened | func | No | `noop` | |
| onClose | Callback after Pop has closed | func | No | `noop` | |
| onBeforeShow | Callback before Pop has opened, only user actions can trigger this callback, setting `visible` won't trigger this callback | func | No | `noop` | |
| onBeforeClose | Callback before Pop has closed, only user actions can trigger this callback, setting `visible` won't trigger this callback | func | No | `noop` | |
| onConfirm | Confirm callback | func | No | |  |
| onCancel | Cancel callback | func | No | |  |
| confirmText | Confirm button text | string | No | `'Confirm'` |  |
| cancelText | Cancel button text | string | No | `'Cancel'` |  |
| type | Confirm button type | string | No | `'primary'` | `'default'`, `'danger'`, `'success'` |
| visible | Pop switch to controlled mode if this prop is set, must be used with `onVisibleChange` | bool | No | | |
| onVisibleChange | Must be used with `visible` | func | No | | |
| onPositionUpdated | callback after position updates, a position update does not imply a position change | func | No | `noop` | |
| onPositionReady | callback after content enter viewport, only called once within the life cycle | func | No | `noop` | |
| containerSelector | pop's parent node CSS selector | string | No | `'body'` | all legal CSS selector | |
| className | Custom content class name | string | No |  |  |
| style | Custom content style | `CSSProperties` | No |  |  |

`Pop` has some additional props depends on different triggers.

#### Click

| Property | Description | Type | Required |  Default |
|------|------|------|--------|--------|
| closeOnClickOutside | Close Pop when click outside trigger and content | bool | No | `true` |

#### Hover

| Property | Description | Type | Required | Default |
|------|------|------|--------|---------|
| mouseEnterDelay | Hover open delay(in ms) | number | No | `200` |
| mouseLeaveDelay | Hover close delay(in ms) | number | No | `200` |
| anchorOnly | Only use trigger as hot area | boolean | No | `false` |
| fixTooltipOnDisabledChildren | Fix the tooltip on disabled children | boolean | No | `false` |

**PS:**`fixTooltipOnDisabledChildren` is only effective on Zent Components.

Why

- [Mouse events don't trigger on disabled button](https://github.com/react-component/tooltip/issues/18)

Workaround

- Wrap the disabled button/input in another element.
- Then add {pointer-events: none} style to the disabled button/input.


#### None

When using this trigger, `onConfirm` and `onCancel` will not close `Pop` automatically, you are responsible for controlling `visible` to close `Pop`.

#### withPop HOC

This HOC exposes some useful `Pop` methods.

Possible senario: close `Pop` within its content.

| Property       | Description      | Type             |
| -------------- | ---------------- | ---------------- |
| open           | Open Pop         | func             |
| close          | Close Pop        | func             |

#### `adjustPosition`

Use this function to manually adjust `Pop` position.

#### `getWrappedPopover`

Use this function to get the internal `Popover` instance.

### FAQ

#### centerArrow

`Pop` aligns edges of its content and trigger by default, the distance between the arrow and content edge is fixed except when `position` is set to `'*-center'`. The arrow will appear outside of trigger's edge when trigger size is small. When this happens you can set `centerArrow` to `true` to always align arrow to trigger's center.

#### onConfirm and onCancel

These two callbacks supports asynchronous mode, buttons will change into loading state when pending on result.

- If return value is a `Promise`, `Pop` will close on `Promise` `resolve`.
- If callback has parameters, it will be called with a `close` argument, `Pop` will not close until you call `close`.
