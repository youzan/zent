---
title: Tooltip
path: component/tooltip
group: FIXME group name here
---

## Tooltip

- Triggers: click, hover and focus
- Only display prompt like `HTML title`,no more operation
- API like Pop

### API

| Property | Description | Type | Required | Default | Alternative |
|------|------|------|--------|--------|-------|
| title | Tooltip content | `node` | Yes | | |
| trigger | Trigger method | string | No | `'hover'` | `'click'`, `'hover'`, `'focus'` |
| position | Tooltip content position, naming rule: content position relative to trigger + arrow position relative to Tooltip. Can be a placement function, see `Popover.Position.create` | string \| func | No | `'top-center'` |  |
| centerArrow | Always center arrow to trigger | bool | No | `false` |  |
| cushion | Same as the `cushion` in Popover, which is usually the distance between the edge of the Tooltip and the trigger element | number | No | `10` |  |
| containerSelector | tooltip's parent node CSS selector | string | No | `'body'` | all legal CSS selector | |
| className | Custom class name | string | No | `''` |  |
| prefix | Custom class name prefix | string | No | `'zent'` |  |
| visible | Tooltip switch to controlled mode if this prop is set | bool | No | | |
| onVisibleChange | Must be used with `visible` | func | No | | |

#### Extra API to trigger

`Tooltip` has some additional props depends on different triggers. Like `Pop`.

#### Click

| Property | Description | Type | Required |  Default |
|------|------|------|--------|--------|
| closeOnClickOutside | Close Tooltip when click outside trigger and content | bool | No | `true` |
| isOutside | Callback to determine if click is outside of Tooltip | func | No | |

#### Hover

| Property | Description | Type | Required | Default |
|------|------|------|--------|---------|
| mouseEnterDelay | Hover open delay(in ms) | number | No | `200` |
| mouseLeaveDelay | Hover close delay(in ms) | number | No | `200` |
| isOutside | Callback to determine if mouse is outside of Tooltip | func | No | |
| quirk | Switch to quirk mode, you don't have to move from inside to outside to trigger a close in quirk mode | bool | No | `true` |

#### None

When using this trigger, `onConfirm` and `onCancel` will not close `Tooltip` automatically, you are responsible for controlling `visible` to close `Tooltip`.

