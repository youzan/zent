---
title: Button
path: component/button
group: Data Entry
---

## Button

Button. Basic style and basic status are provided.

### Guide

-   Style can be set by `type`.
-   Size can be set by `size`.
-   Decorate statuses like `'block'`, `'disabled'` and `'loading'` are supported.
- If `href/target` are provided, Button will be rendered as an a tag while style and status are supported as well.

### API

#### Button

| Property        | Description                          | Type     | Default         | Alternative                                |
| --------- | --------------------------- | ------ | ----------- | ---------------------------------- |
| type      | style                          | string | `'default'` | `'primary'`、`'danger'`、`'success'` |
| size      | size                          | string | `'medium'`  | `'large'`、`'small'`                |
| htmlType  | button tag native type attribute          | string | `'button'`  |  `submit`、`reset`、`button`           |
| block     | whether to be displayed as a block                | bool   | `false`     |                                    |
| disabled  | controls status                        | bool   | `false`     |                                    |
| loading   | controls status                        | bool   | `false`     |                                    |
| outline   | determines whether the background is transparent               | bool   | `false`     |                              |
| bordered  | determines whether the border is displayed                      | bool   | `true`      |                                    |
| Other Properties      |                             |        |             |                                    |
| component | custom component tag type                   | string\|func |             |                                    |
| href      | Optional, the component will be rendered as an a tag instead of a button tag if this property is set    | string |             |                           |
| target    | Optional, used together with href, which is the target property of the a tag | string | `''`        | `'_blank'`                  |
| className | custom class name                       | string |             |                                    |
| style     | custom style                      | object |             |                                    |
| prefix    | custom prefix                       | string | `'zent'`    |                                    |

#### Button.Group

| Property        | Description                          | Type     | Default         | Alternative                                |
| --------- | --------------------------- | ------ | ----------- | ---------------------------------- |
| className | custom class name                       | string |             |                                    |
| style     | custom style                      | object |             |                                    |
| prefix    | custom prefix                       | string | `'zent'`    |                                    |
