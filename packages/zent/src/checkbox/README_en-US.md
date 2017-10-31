---
title: Checkbox
path: component/checkbox
group: Data Entry
---

## Checkbox

### Usage

- Checkbox is a [controlled component][https://facebook.github.io/react/docs/forms.html#controlled-components]. You need to set the callback function `onChange` outside the component to handle the changes of `value`.

- `value` supports any type of value, inclueding Referrence Type.

### demos

### API

#### Checkbox API

| Property     |  Description  | Type     | Default  | Alternative |
| ------------- | --------- | ------------- | -------- |
| checked       | Whether the checkbox is selected  | bool | `false`  |
| value         | The value of the components, which is used in `CheckboxGroup` | any |  |
| disabled      | Disable the checkbox | bool          |          |
| indeterminate | 展示部分选中的模式 | bool          | `false`  |
| onChange      | The callback function that is triggered when the checkbox is changed   | func(e:Event) |          |
| className     | The custom classname   | string        |          |
| prefix        | The custom prefix     | string        | `'zent'` |

#### Checkbox Group API

| Property     |  Description  | Type     | Default  | Alternative |
| ------------ | --------------- | ------------------ | --------------- |
| value        | The value when checkbox is checked, which is required | array<any>  | `[]` |
| isValueEqual | 可选，判断value值是否相等 | func(a, b) | `() => a === b` |
| disabled     | Disable the checkbox group  | bool               |                 |
| onChange     | The callback function that is triggered when the checkbox group is changed | func(checkedValueList) |                 |
| className    | The custom classname  | string             |                 |
| prefix       | The custom prefix  | string             | `'zent'`        |

[controlled-components]: https://facebook.github.io/react/docs/forms.html#controlled-components

<style type="text/css">
	.zent-checkbox-doc-p {
		font-size: 12px;
		line-height: 2em;
	}
</style>
