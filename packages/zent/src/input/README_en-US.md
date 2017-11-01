---
title: Input
path: component/input
group: Data Entry
---

## Input

A input widget for form, wrapping original input. you can input content through mouse or keyboard

### Usage

- Using Input, with prefix or suffix
- Using with another widget, such as combined into a search box;

### demos

### API

| Property           | Description              | Type            | Default      |      Optional               | Alternative |
| ------------ | --------------- | ------------- | -------- | ----------------------- | ---- |
| className    | a custom CSS class.       | string        | `''`     |                         | 否    |
| prefix       | a custom class prefix         | string        | `'zent'` |                         | 否    |
| type         | content type          | string        | `'text'` | `'number'`、`'password'`、`'textarea'` | 否    |
| defaultValue | default value             | string        |          |                         | 否    |
| value        | input value             | string        |          |                         | 否    |
| readOnly     | 是否只读            | bool          | `false`  |                         | 否    |
| disabled     | 是否禁用            | bool          | `false`  |                         | 否    |
| placeholder  | original placeholder text | string        | `''`     |                         | 否    |
| addonBefore  | suffix tag            | node          |          |                         | 否    |
| addonAfter   | suffix tag            | node          |          |                         | 否    |
| autoFocus    | auto focus          | bool          |          |                         | 否    |
| onChange     | change event        | func(e:Event) |          |                         | 否    |
| onPressEnter | enter event            | func(e:Event) |          |                         | 否    |

_except for the attributes above, Input widget supports all attributes which React support for input_

#### focus

`focus(): function`

Manual focus to the input box

<style>
.zent-input-wrapper {
    width: 200px;
    margin-bottom: 20px;
}
</style>
