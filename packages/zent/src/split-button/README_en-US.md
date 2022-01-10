---
title: GroupButton
path: component/split-button
group: Basics
scatter: true
---

## SplitButton

SplitButton a button with a dropdown menu
<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-3 -->
<!-- demo-slot-4 -->

## RadioButton

<!-- demo-slot-5 -->

### API

| 参数             | 说明                                                                                                       | 类型   | 默认值               | 备选值                               |
| ---------------- | ---------------------------------------------------------------------------------------------------------- | ------ | -------------------- | ------------------------------------ |
| type             | button style                                                                                               | string | `'default'`          | `'primary'`、`'text'`                        |
| disabled         | is the button disabled                                                                                     | bool   | `false`              | `true`、`false`                      |
| loading          | is show loading icon                                                                                       | bool   | `false`              | `true`, `false`                      |
| size             | button size                                                                                                | string | `'medium'`           | `'large'`、`'medium'`、`'small'`     |
| dropdownTrigger  | trigger for dropdown menu                                                                                  | string | `'click'`            | `'click'`、`'hover'`                 |
| dropdownData     | data for dropdown menu                                                                                     | array  | []                   |                                      |
| dropdownValue    | custom options value's corresponding key, e.g. `{ id: 1, name: 'Doc' }` needs `optionValue="id"`           | string | `'value'`            |                                      |
| dropdownText     | custom options display text's corresponding key, e.g. `{ id: 1, name: 'Doc' }` needs `dropdownText="name"` | string | `'text'`             |                                      |
| dropdownIcon		 | custom icon																																																| string | `'down'`							| icon type
| dropdownPosition | the position of dropodown menu                                                                             | string | `'auto-bottom-left'` | same as position in Pop              |
| onClick          | the click callback for left button                                                                         | func   |                      |                                      |
| onSelect         | the select callback for the right dropdown menu                                                            | func   |                      |                                      |
| className        | custom classname                                                                                           | string | `''`                 |                                      |

### onSelect

the param in callback is dropdownValue

#### RadioGroup

| Props        | Description                                               | Type                 | Default             |
| ------------ | --------------------------------------------------------- | -------------------- | ------------------- |
| value        | Used to set the currently selected value                  | `any`                |                     |
| disabled     | Disable the radio group                                   | `boolean`            |                     |
| readOnly     | It specifies the component is read-only                   | `boolean`            |                     |
| onChange     | change callback                                           | `(e: Event) => void` |                     |
| isValueEqual | Optional, a function to determine whether values is equal | `(a, b) => boolean`  | `(a, b) => a === b` |
| className    | custom classname                                          | `string`             |                     |
