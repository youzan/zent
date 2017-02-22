# zent-radio

Radio 单选框

## 设计

`<RadioGroup />`设计为一个受控组件 ([Controlled Components][controlled-components])，UI永远只受属性控制。

所以如果你只设置了`value`的值而未设置`onChange`回调来处理`value`值的变化，那么将会变成一个只读的组件。

## 使用场景

用于在多个备选项中选中单个状态

## RadioGroup API

| 参数        | 说明         | 类型          | 默认值  | 备选值 |
| --------- | ---------- | ----------- | ---- | --- |
| value     | 用于设置当前选中的值 | any      |      |     |
| onChange  | 选项变化时的回调函数 | func(event) |      |     |
| isValueEqual | 可选参数，判断value值是否相等 | func(a, b) | a === b | |
| className | 自定义额外类名    | string      |      |     |
| prefix    | 自定义前缀      | string      | zent |     | |

## Radio API

| 参数        | 说明                   | 类型          | 默认值  | 备选值 |
| --------- | -------------------- | ----------- | ---- | --- |
| value     | 根据 value 进行比较，判断是否选中 | any      |      |     |
| className | 自定义额外类名              | string      |      |     |
| prefix    | 自定义前缀                | string      | zent |     |

[controlled-components]: https://facebook.github.io/react/docs/forms.html#controlled-components
