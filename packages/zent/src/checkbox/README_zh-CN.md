---
title: Checkbox
subtitle: 多选
path: component/checkbox
group: 数据
---

## Checkbox 多选

### 使用指南

- Checkbox 表现为一个[受控组件][https://facebook.github.io/react/docs/forms.html#controlled-components], 需要设置 `onChange` 回调在组件外部处理其 `value` 属性的变化.

- `value` 支持任意类型的值, 包括引用类型.

### API

#### Checkbox API

| 参数            | 说明        | 类型            | 默认值      |
| ------------- | --------- | ------------- | -------- |
| checked       | 指定当前是否选中  | bool          | `false`  |
| value         | 组件对应的值，在`CheckboxGroup`中使用    | any           |          |
| disabled      | 使组件不可用    | bool          |          |
| readOnly      | 使组件只读           | bool               |                 |
| indeterminate | 展示部分选中的模式 | bool          | `false`  |
| onChange      | 变化时回调函数   | func(e:Event) |          |
| className     | 自定义额外类名   | string        |          |
| prefix        | 自定义前缀     | string        | `'zent'` |

#### Checkbox Group API

| 参数           | 说明              | 类型                 | 默认值             |
| ------------ | --------------- | ------------------ | --------------- |
| value        | 必填，指定选中的选项      | array<any>         | `[]`            |
| isValueEqual | 可选，判断value值是否相等 | func(a, b)         | `() => a === b` |
| disabled     | 使组件不可用          | bool               |                 |
| readOnly     | 使组件只读           | bool               |                 |
| onChange     | 变化时回调函数         | func(checkedValueList) |                 |
| className    | 自定义额外类名         | string             |                 |
| prefix       | 自定义前缀           | string             | `'zent'`        |

[controlled-components]: https://facebook.github.io/react/docs/forms.html#controlled-components
