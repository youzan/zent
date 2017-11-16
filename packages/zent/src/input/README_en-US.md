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
| className    | a custom CSS class.       | string        | `''`     |                         | No    |
| prefix       | a custom prefix class        | string        | `'zent'` |                         | No    |
| width       | width          | string or number       |   |                         | No   |
| type         | content type          | string        | `'text'` | `'number'`、`'password'`、`'textarea'` | No    |
| defaultValue | default value             | string        |          |                         | No    |
| value        | input value             | string        |          |                         | No    |
| readOnly     | whether is only read or not          | bool          | `false`  |                         | No    |
| disabled     | whether is disable or not            | bool          | `false`  |                         | No    |
| placeholder  | raw placeholder text | string        | `''`     |                         | No    |
| addonBefore  | prefix tag            | node          |          |                         | No    |
| addonAfter   | suffix tag            | node          |          |                         | No    |
| autoFocus    | auto focus          | bool          |  `false`        |                    | No  |
| autoSelect    | auto select          | bool          |  `false`        |                  | No  |
| initSelectionStart    | The 0-based index of the first selected character  | number        |         |    | No  |
| initSelectionEnd    | The 0-based index of the character after the last selected character  | number        |         |    | No  |
| onChange     | change event        | func(e:Event) |          |                         | No    |
| onPressEnter | enter event            | func(e:Event) |          |                         | No    |

_except for the attributes above, input widget supports all attributes that React support for input_

#### focus

`focus(): void`

Manual focus to the input box

### select
`select(): void`

Select all text in input

`select(selectionStart?: number, selectionEnd?: number): void`

Select the content between selectionStart and selectionEnd

<style>
.zent-input-wrapper {
    width: 200px;
    margin-bottom: 20px;
}
</style>
