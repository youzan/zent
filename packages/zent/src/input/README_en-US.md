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
| autoFocus    | auto focus          | bool          |  `false`        |                    | no  |
| autoSelect    | auto select          | bool          |  `false`        |                  | no  |
| initSelectionStart    | The 0-based index of the first selected character  | number        |         |    | no  |
| initSelectionEnd    | The 0-based index of the character after the last selected character  | number        |         |    | no  |
| onChange     | change event        | func(e:Event) |          |                         | no    |
| onPressEnter | enter event            | func(e:Event) |          |                         | no    |

_except for the attributes above, input widget supports all attributes that React support for input_

#### focus

`focus(): void`

Manual focus to the input box

### select
`select(): void`

Manual select to the input box

`select(selectionStart?: number, selectionEnd?: number): void`

Manual select the content between selectionStart and selectionEnd

<style>
.zent-input-wrapper {
    width: 200px;
    margin-bottom: 20px;
}
</style>
