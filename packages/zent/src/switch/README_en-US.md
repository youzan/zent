---
title: Switch
path: component/switch
group: Data Entry
---

## Switch

Switch is a switching selector。

### Guides

-  Switch is recommended to be used when you need to indicate the switch between two status.
-  itching `Switch` will trigger the status change directly.

### API

| Property     |  Description  | Type     | Default  | Alternative |
| ----------- | ------------ | --------- | --------- | --------- |
| checked       | The current status  | bool    |         |           |
| onChange      | The callback function that is triggered when the value of `checked` is changed. | func(checked: bool) | `noop`      |           |
| disabled      | Disable the switch  | bool   | `false`     |   `true`    |
| checkedText   | The text to show when the switch is on. | string   |`'On'`| |
| uncheckedText | The text to show when the switch is off.| string | `'Off'`| |
| loading| The status of loading | bool| `false`     |  `true`         |
| size | The size of the switch | string | `'default'` | `'small'` |
| className     | The custom classname | string  | `''`        |  |
| prefix        | The custom prefix  | string  | `'zent'`    |     |
