---
title: NumberInput
subtitle: 数值输入框
path: component/number-input
group: 数据
---

## NumberInput 数值输入框

数字输入组件，通过鼠标或键盘输入内容。

### 使用指南

- 输入内容仅为数字时，使用数字输入框比普通文本输入框更方便。

### API

| 参数           | 说明              | 类型            | 默认值      | 备选值 | 是否必填 |
| ------------ | --------------- | ------------- | -------- | ----------------------- | ---- |
| value        | 输入值             | number        |          |    | 否    |
| onChange     | change事件        | func(e:Event) |          |     | 否    |
| showStepper  | 是否开启记步器         | bool        | `false` |    | 否    |
| showCounter  | 是否开启加减号         | bool        | `false` |    | 否    |
| decimal      | 数值精度            | number        |          |     | 否    |
| min      | 数值范围最小值            | number        |          |     | 否    |
| max      | 数值范围最大值            | number        |          |     | 否    |
| placeholder  | 原生placeholder文案 | string        | `''`     |     | 否    |
| disabled     | 是否禁用            | bool          | `false`  |     | 否    |
| className    | 自定义额外类名        | string        | `''`     |     | 否    |
| width    | 宽度        | string or number        |      |     | 否    |
| prefix       | 自定义类前缀         | string        | `'zent'` |     | 否    |

<style>
.zent-number-input-wrapper {
  width: 200px;
  margin-bottom: 20px;
}
</style>
