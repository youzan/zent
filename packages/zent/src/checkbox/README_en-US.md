---
title: Checkbox
path: component/checkbox
group: Data Entry
---

## Checkbox

### Guides

- Checkbox is a [controlled component][https://facebook.github.io/react/docs/forms.html#controlled-components]. You need to set the callback function `onChange` outside the component to handle the changes of `value`.

- `value` supports any type of value, inclueding Referrence Type.

### API

#### Checkbox API

| Property      | Description                                                          | Type                  | Default  | Alternative |
| ------------- | -------------------------------------------------------------------- | --------------------- | -------- | ----------- |
| checked       | Whether the checkbox is selected                                     | `boolean`             | `false`  |
| value         | The value of the components, which is used in `CheckboxGroup`        | `any`                 |          |
| disabled      | Disable the checkbox                                                 | `boolean`             |          |
| readOnly      | It specifies the component is read-only                              | `boolean`             |          |
| indeterminate | Show style of partially selection                                    | `boolean`             | `false`  |
| onChange      | The callback function that is triggered when the checkbox is changed | `(e:Event) => void`   |          |
| labelStyle    | Label inline style                                                   | `React.CSSProperties` |          |
| className     | The custom classname                                                 | `string`              |          |

#### Checkbox Group API

| Property     | Description                                                                | Type                                | Default         | Alternative |
| ------------ | -------------------------------------------------------------------------- | ----------------------------------- | --------------- | ----------- |
| value        | The value when checkbox is checked, which is required                      | `any[]`                             | `[]`            |
| isValueEqual | The funtion to judge whether the value is equal                            | `(a: any, b: any) => boolean`       | `() => a === b` |
| disabled     | Disable the checkbox group                                                 | `boolean`                           |                 |
| readOnly     | It specifies the component is read-only                                    | `boolean`                           |                 |
| onChange     | The callback function that is triggered when the checkbox group is changed | `(checkedValueList: any[]) => void` |                 |
| className    | The custom classname                                                       | `string`                            |                 |

[controlled-components]: https://facebook.github.io/react/docs/forms.html#controlled-components
