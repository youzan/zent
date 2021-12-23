---
title: Collapse
path: component/collapse
group: Data Display
scatter: true
---

## Collapse

A panel that supports folding and expanding

### Suggestion

- Group and hide more information to improve page reading efficiency and aesthetics;
- When multiple groups of information structure is unified, such as multiple groups of titles + multiple lines of text/graphic structure;

### Note

- The folding panel is not applicable when the number of information groups is less than 2 or the information structure is only one level.
- Folding panels nested inside panels is not allowed

### Demos

<!-- demo-slot-3 -->
<!-- demo-slot-2 -->
<!-- demo-slot-5 -->

### API

#### Collpase

| Property              | Description                               | Type      | Required  | Default     | Alternative |
| --------------------- | ----------------------------------------- | --------- | --------- | ----------- | ----------- | --- |
| onChange              | Callback when active panel changes        | `func`    | Yes       |             |             |
| activeKey             | Active panel id                           | `string   | string[]` | No          |             |     |
| accordion             | Accodion mode, one active panel at a time | `bool`    | No        | `false`     | `true`      |
| bordered              | Bordered                                  | `bool`    | No        | `true`      | `false`     |
| panelTitleBackground  | Panel background                          | `string`  | No        | `'default'` | `'none'`    |
| showContentBackground | Show Panel Content Background             | `boolean` | No        | `'false'`   | `'true'`    |
| className             | Custom class names                        | `string`  | No        |             |             |

#### Collpase.Panel

| Property  | Description                                                               | Type        | Required | Default | Alternative |
| --------- | ------------------------------------------------------------------------- | ----------- | -------- | ------- | ----------- |
| key       | Panel id, [React Keys](https://reactjs.org/docs/lists-and-keys.html#keys) | `ReactText` | Yes      |         |             |
| title     | Panel title                                                               | `node`      | Yes      |         |             |
| extra     | Title custom content                                                      | `node`      | No       |         |             |
| disabled  | Disable panel                                                             | `bool`      | No       | `false` | `true`      |
| showArrow | Show arrow in the title                                                   | `bool`      | No       | `true`  | `false`     |
| style     | Custom styles                                                             | `object`    | No       |         |             |
| className | Custom class names                                                        | `string`    | No       |         |             |

#### The following functions is obsolete in the new design system and is only used as a reference for the old version

<!-- demo-slot-1 -->
<!-- demo-slot-4 -->
