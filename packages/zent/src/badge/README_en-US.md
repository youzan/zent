---
title: Badge
path: component/badge
group: Data Display
---

## Badge

Badge normally appears in the upper right corner of the notification or avatar with eye-catching appeal, which is typically used to display the number of unread messages.

### Guides

- Badge is used to prompt for new messages, which is placed in the upper right corner or right side of the text or icon.
- Badge can display the specific number of new messages.

### API

| Property     |  Description  | Type     |  Required  | Default  | Alternative |
| ---------| ----------------- | ------  | -------------|----------------- |
| count | The number of messages to show | `number` | No | `0` | |
| maxCount | Max count to show | `number` | No | `99`  |                  |
| dot | Whether to show red dot without number | `bool` | No | `false` | `true`, `false` |
| showZero | Whether to show badge when count is zero | `bool` | No |  `false` | `true`, `false`  |
| offset   | Badge offset, `[x, y]` | `array` | No | | |
| style    | Custom style | `object` | No | | |
| className| The custom classname | `string`   | No | `''` |   |
| prefix | The custom prefix | `string`   | No | `'zent'` |  |
