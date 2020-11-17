---
title: Radio
path: component/radio
group: Data Entry
---

## Radio

`RadioGroup` is a [controlled-component][https://facebook.github.io/react/docs/forms.html#controlled-components]. There must be a `onChange` callback dealing with changes outside.

### API

#### RadioGroup

| Props        | Description                                               | Type                 | Default             |
| ------------ | --------------------------------------------------------- | -------------------- | ------------------- |
| value        | Used to set the currently selected value                  | `any`                |                     |
| disabled     | Disable the radio group                                   | `boolean`            |                     |
| readOnly     | It specifies the component is read-only                   | `boolean`            |                     |
| onChange     | change callback                                           | `(e: Event) => void` |                     |
| isValueEqual | Optional, a function to determine whether values is equal | `(a, b) => boolean`  | `(a, b) => a === b` |
| className    | custom classname                                          | `string`             |                     |

#### Radio

| Props      | Description                                     | Type                  | Default |
| ---------- | ----------------------------------------------- | --------------------- | ------- |
| value      | Compare according to the, determine if selected | `any`                 |         |
| disabled   | Disable the radio                               | `boolean`             |         |
| readOnly   | It specifies the component is read-only         | `boolean`             |         |
| labelStyle | Label inline style                              | `React.CSSProperties` |         |
| className  | custom classname                                | `string`              |         |
| width      | radio's width                                   | `string` \| `number`  |         |
