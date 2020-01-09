---
title: Affix
path: component/affix
group: Navigation
---

## Affix

Pin element in a specific position.

### API

| Property             | Description                          | Type         | Default | Alternative |
| -------------------- | ------------------------------------ | ------------ | ------- | ----------- |
| offsetTop            | Offset to the top of the viewport    | `number`     |         |             |
| offsetBottom         | Offset to the bottom of the viewport | `number`     |         |             |
| onPin                | Callback when affix pins             | `() => void` |         |             |
| onUnpin              | Callback when affix unpins           | `() => void` |         |             |
| zIndex               | Pin `z-index`                        | `number`     | 10      |             |
| className            | Extra class name                     | `string`     | `''`    |             |
| placeholderClassName | Placeholder container class name     | `string`     | `''`    |             |

Note: at least one of `offsetTop` and `offsetBottom` must be set; you can set both at the same time but you're warned of bizarre things that may happen if window height is too small.
