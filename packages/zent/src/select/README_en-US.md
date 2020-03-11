---
title: Select
path: component/select
group: Data Entry
---

## Select

Select is a drop-down selection component with variety functions.

### API

| Props             | Description                                                  | Type             | Default              | Required |
| ----------------- | ------------------------------------------------------------ | ---------------- | -------------------- | -------- |
| options           | Option data                                                  | array            | `[]`                 | yes      |
| value             | Selected value, when tags type, can be passed into the array | any              | `null`               | no       |
| disabled          | Disable switch                                               | bool             | `false`              | no       |
| placeholder       | The default prompt text                                      | string           | `'please choose'`    | no       |
| optionPlaceholder | Empty list prompt text                                       | string           | `'No matches found'` | no       |
| onChange          | Select changed callback                                      | function         | `noop`               | no       |
| filter            | Filter conditions, set to open the filter function           | function         | false                |          | no |
| className         | Optional, custom trigger additional classname                | string           | `''`                 | no       |
| width             | input-box's width                                            | string or number |                      | no       |
