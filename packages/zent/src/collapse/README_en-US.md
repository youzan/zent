---
title: Collapse
path: component/collapse
group: Data Display
---

## Collapse

Collapse/expand contents.

### Guides

- Group and hide contents in complex areas
- Accordion is a special type of `Collpase`, it only allows one active panel at a time.

### API

#### Collpase

| Property             | Description                               | Type     | Required | Default     | Alternative |
| -------------------- | ----------------------------------------- | -------- | -------- | ----------- | ----------- |
| onChange             | Callback when active panel changes        | `func`   | Yes      |             |             |
| activeKey            | Active panel id                           | `string` | No       |             |             |
| accordion            | Accodion mode, one active panel at a time | `bool`   | No       | `false`     | `true`      |
| bordered             | Bordered                                  | `bool`   | No       | `true`      | `false`     |
| panelTitleBackground | Panel background                          | `string` | No       | `'default'` | `'none'`    |
| className            | Custom class names                        | `string` | No       |             |             |
| prefix               | Custom class prefix                       | `string` | No       |             |             |

#### Collpase.Panel

| Property  | Description             | Type     | Required | Default | Alternative |
| --------- | ----------------------- | -------- | -------- | ------- | ----------- |
| key       | Panel id                | `string` | Yes      |         |             |
| title     | Panel title             | `node`   | Yes      |         |             |
| disabled  | Disable panel           | `bool`   | No       | `false` | `true`      |
| showArrow | Show arrow in the title | `bool`   | No       | `true`  | `false`     |
| style     | Custom styles           | `object` | No       |         |             |
| className | Custom class names      | `string` | No       |         |             |
| prefix    | Custom class prefix     | `string` | No       |         |             |
