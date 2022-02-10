---
title: Button
path: component/button
group: Basics
---

## Button

Button. Basic style and basic status are provided.

### Guide

- Styles can be set by `type`.
- Size can be set by `size`.
- Button status like `'block'`, `'disabled'` and `'loading'` are supported.
- If `href/target` are provided, Button will be rendered as an a tag while style and status are supported as well.
- Directive mode to allow custom rendering of a button.

### API

#### Button

| Property         | Description                                                                                          | Type   | Default     | Alternative                          |
| ---------------- | ---------------------------------------------------------------------------------------------------- | ------ | ----------- | ------------------------------------ |
| type             | style                                                                                                | string | `'default'` | `'primary'`                          |
| size             | size                                                                                                 | string | `'medium'`  | `'large'`、`'small'`                 |
| htmlType         | button tag native type attribute                                                                     | string | `'button'`  | `submit`、`reset`、`button`          |
| block            | whether to be displayed as a block                                                                   | bool   | `false`     |                                      |
| disabled         | controls status                                                                                      | bool   | `false`     |                                      |
| loading          | controls status                                                                                      | bool   | `false`     |                                      |
| outline          | determines whether the background is transparent                                                     | bool   | `false`     |                                      |
| Other Properties |                                                                                                      |        |             |                                      |
| href             | Optional, the component will be rendered as an a tag instead of a button tag if this property is set | string |             |                                      |
| target           | Optional, used together with href, which is the target property of the a tag                         | string | `''`        | `'_blank'`                           |
| download         | HTML5 download                                                                                       |        |             |
| className        | custom class name                                                                                    | string |             |                                      |
| style            | custom style                                                                                         | object |             |                                      |

#### ButtonDirective

`ButtonDirective` renders button styles onto its child. Use this to make a `react-router` `Link` look like a button, and preserve all of its router functionalities.
