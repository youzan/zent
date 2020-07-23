---
title: Alert
path: component/alert
group: Data Display
---

## Alert

Alert is used to provide eye-catching information.

### Guide

- Content should be as simple as possible to make it easier to be read.
- The number of buttons should be less than 2 in order to keep logic simple.

### API

#### Alert

| Property     | Description                                         | Type      | Default  | Alternative                                            |
| ------------ | --------------------------------------------------- | --------- | -------- | ------------------------------------------------------ |
| className    | custom extra class name                             | string    |          |                                                        |
| type         | style of the Alert                                  | string    | `'info'` | `'info'`, `'success'`, `'warning'`, `'error'`,`'hint'` |
| loading      | determines whether the Alert use loading icon       | bool      | `false`  | `true`, `false`                                        |
| outline      | determines whether the Alert use outline mode style | bool      | `false`  | `true`, `false`                                        |
| closable     | determines whether the Alert can be closed or not   | bool      | `false`  | `true`, `false`                                        |
| closed       | determines whether the Alert is closed              | bool      |          |                                                        |
| onClose      | callback for click close trigger                    | func      |          |                                                        |
| closeContent | close trigger content                               | ReactNode |          |                                                        |
| extraContent | extra content on the right of Alert                 | ReactNode |          |                                                        |
| title        | Alert content title                                 | ReactNode |          |                                                        |
| description  | Alert content description                           | ReactNode |          |                                                        |

#### ScrollAlert

##### ScrollAlert only supports equal-height children

| Property       | Description                                         | Type   | Default  | Alternative                                             |
| -------------- | --------------------------------------------------- | ------ | -------- | ------------------------------------------------------- |
| className      | custom extra class name                             | string |          |                                                         |
| type           | style of the Alert                                  | string | `'info'` | `'info'`, `'success'`, `'warning'`, `'error'`, `'hint'` |
| scrollInterval | custom scroll interval (unit: ms)                   | number | 5000     | greater than 1000                                       |
| loading        | determines whether the Alert use loading icon       | bool   | `false`  | `true`, `false`                                         |
| outline        | determines whether the Alert use outline mode style | bool   | `false`  | `true`, `false`                                         |
| onClose        | callback for close all AlertItem                    | func   |          |                                                         |
| closed         | determines whether the ScrollAlert is closed        | bool   |          |                                                         |

#### AlertItem

| Property     | Description                                                  | Type      | Default | Alternative     |
| ------------ | ------------------------------------------------------------ | --------- | ------- | --------------- |
| closable     | determines whether the Alert can be closed or not            | bool      | `false` | `true`, `false` |
| closeContent | close trigger content                                        | ReactNode |         |                 |
| extraContent | extra content on the right of Alert                          | ReactNode |         |                 |
| title        | Alert content title                                          | ReactNode |         |                 |
| description  | Alert content description                                    | ReactNode |         |                 |
| onClose      | callback for close current AlertItem (when closable is true) | func      |         |                 |
