---
title: Input
path: component/input
group: Data Entry
---

## Input

A input widget for buiding forms in React, based on raw input. you can enter content through mouse or keyboard.

### Guides

- Using Input, with prefix or suffix.
- Combining with another widgets, such as combined into a search box.


### API

| Property           | Description              | Type            | Default      |      Alternative               | Required |
| ------------ | --------------- | ------------- | -------- | ----------------------- | ---- |
| className    | a custom CSS class.       | string        | `''`     |                         | no    |
| prefix       | a custom prefix class        | string        | `'zent'` |                         | no    |
| width       | width          | string or number       |   |                         | no   |
| type         | content type          | string        | `'text'` | `'number'`、`'password'`、`'textarea'` | no    |
| defaultValue | default value             | string        |          |                         | no    |
| value        | input value             | string        |          |                         | no    |
| readOnly     | whether is only read or not          | bool          | `false`  |                         | no    |
| disabled     | whether is disable or not            | bool          | `false`  |                         | no    |
| placeholder  | raw placeholder text | string        | `''`     |                         | no    |
| addonBefore  | prefix tag            | node          |          |                         | no    |
| addonAfter   | suffix tag            | node          |          |                         | no    |
| autoFocus    | auto focus          | bool          |          |                         | no    |
| onChange     | change event        | func(e:Event) |          |                         | no    |
| onPressEnter | enter event            | func(e:Event) |          |                         | no    |

_except for the attributes above, input widget supports all attributes that React support for input_

#### focus

`focus(): function`

Manual focus to the input box

<style>
.zent-input-wrapper {
    width: 200px;
    margin-bottom: 20px;
}
</style>
