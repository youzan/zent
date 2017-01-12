# zent-checkbox

Checkbox 多选框

[![version][version-image]][download-url]
[![download][download-image]][download-url]

## 设计

`<Checkbox />`设计为一个受控组件 ([Controlled Components][controlled-components])，UI永远只受属性控制。

所以如果你只设置了`checked`的值而未设置`onChange`回调来处理`checked`值的变化，那么将会变成一个只读的组件。

`Checkbox`的`value`可以是任意类型的值，这一点和HTML原生的组件不一样。

## 使用场景

在一组可选项中进行多项选择时


## Checkbox API

| 参数            | 说明               | 类型             | 默认值      | 备选值      |
| ---------     | ----------------    | --------------  | -------- | -------- |
| checked       | 指定当前是否选中       | bool            | false    |          |
| value         | 组件对应的值          | any             |          |         |
| disabled      | 使组件不可用          | bool            |          |          |
| readOnly      | 使组件只读            | bool            |          |          |
| indeterminate | 展示部分选中的模式     | bool            | false     |          |
| onChange      | 变化时回调函数         | func(e:Event)   |          |          |
| className     | 自定义额外类名         | string          |          |          |
| prefix        | 自定义前缀            | string          |  zent     |          |

## Checkbox Group API

| 参数        | 说明                 | 类型                 | 默认值      | 备选值    |
| --------- | ----------------      | --------------     | --------    | -------- |
| value     | 必填，指定选中的选项          | array<any>          |    []       |          |
| isValueEqual | 可选，判断value值是否相等  | func(a, b)          |   a === b   |          |
| disabled  | 使组件不可用            | bool               |              |         |
| readOnly  | 使组件只读              | bool               |             |          |
| onChange  | 变化时回调函数          | func(checkedValue)  |             |          |
| className | 自定义额外类名          | string              |             |          |
| prefix    | 自定义前缀              | string             | zent        |           |


[version-image]: http://npm.qima-inc.com/badge/v/@youzan/zent-checkbox.svg?style=flat-square
[download-image]: http://npm.qima-inc.com/badge/d/@youzan/zent-checkbox.svg?style=flat-square
[download-url]: http://npm.qima-inc.com/package/@youzan/zent-checkbox
[controlled-components]: https://facebook.github.io/react/docs/forms.html#controlled-components
