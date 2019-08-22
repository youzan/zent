---
title: NumberInput
subtitle: 数值输入框
path: component/number-input
group: 数据
---

## NumberInput 数值输入框

数字输入组件，通过鼠标或键盘输入内容。
默认值类型是 string，在整数模式下是 number，且有默认上限`Number.MAX_SAFE_INTEGER`，默认下限`Number.MIN_SAFE_INTEGER`。

### 使用指南

- 输入内容仅为数字时，使用数字输入框比普通文本输入框更方便。

### API

| 参数        | 说明                  | 类型                              | 默认值  | 备选值 | 是否必填 |
| ----------- | --------------------- | --------------------------------- | ------- | ------ | -------- |
| value       | 输入值                | integer === true ? number: string |         |        | 否       |
| onChange    | change 事件           | func(value: typeof value)         |         |        | 否       |
| showStepper | 是否开启记步器        | bool                              | `false` |        | 否       |
| showCounter | 是否开启加减号        | bool                              | `false` |        | 否       |
| decimal     | 数值精度              | number                            | `0`     |        | 否       |
| min         | 数值范围最小值        | number                            |         |        | 否       |
| max         | 数值范围最大值        | number                            |         |        | 否       |
| placeholder | 原生 placeholder 文案 | string                            | `''`    |        | 否       |
| disabled    | 是否禁用              | bool                              | `false` |        | 否       |
| className   | 自定义额外类名        | string                            | `''`    |        | 否       |
| width       | 宽度                  | string or number                  |         |        | 否       |
| integer     | 整数模式              | bool                              | false   |        | 否       |

<style>
.zent-number-input {
  width: 200px;
  margin-bottom: 20px;
}
</style>
