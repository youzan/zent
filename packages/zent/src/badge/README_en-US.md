---
title: Badge
path: component/badge
group: Basics
---

## Badge

The prompt element located in the upper right corner of the main object, indicating the change of the main object

### Guides
#### Suggest
- When the linked page has content or status changes, it is displayed at the entrance to prompt the change;
- When you need to prompt the specific quantity of change (such as order quantity, message quantity), it is recommended to use the badge with numbers;
- When you need to remind the status of changes (such as order status changes), it is recommended to use the red dot badge;
- When you click on the linked page and read the changed content, the badge disappears (or reduces the corresponding number of reads);

#### Forbid
- Entrances at the same level need to have a unified badge style. In principle, there is no mixed use of "digital badge + red dot badge" at the same level of entry.

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
