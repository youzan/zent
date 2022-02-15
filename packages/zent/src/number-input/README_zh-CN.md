---
title: NumberInput
subtitle: 步进器
path: component/number-input
group: 信息录入
---

## NumberInput 步进器

数字输入组件，通过鼠标或键盘输入内容。
默认值类型是 string，在整数模式下是 number，且有默认上限`Number.MAX_SAFE_INTEGER`，默认下限`Number.MIN_SAFE_INTEGER`。

### 使用指南

- 输入内容仅为数字时，使用数字输入框比普通文本输入框更方便。

### API

| 参数        | 说明                  | 类型                              | 默认值  | 备选值 | 是否必填 |
| ----------- | --------------------- | --------------------------------- | ------- | ------ | -------- |
| value       | 输入值                | `integer === true ? number : string` |         |        | 否       |
| onChange    | 值改变的回调函数          | `(value: typeof value) => void`         |         |        | 否       |
| onInput     | 用户输入的回调函数 | `(value: string) => void` |  |  |  否  |
| showStepper | 是否开启记步器        | `boolean`                            | `false` |        | 否       |
| showCounter | 是否开启加减号        | `boolean`                            | `false` |        | 否       |
| showTooltip			| 超出大小是否pop提示    | `boolean`                              | `false` |        | 否       |
| integer     | 整数模式              | `boolean`                             | `false`   |        | 否       |
| decimal     | 数值精度              | `number`                            | `0`     |        | 否       |
| step        | 步进                 | `number`                         | 整数模式为 `1`，小数模式根据精度而定 |  |  否 |
| min         | 数值范围最小值        | `number`                            |         |        | 否       |
| max         | 数值范围最大值        | `number`                            |         |        | 否       |
| placeholder | 原生 placeholder 文案 | `string`                            | `''`    |        | 否       |
| disabled    | 是否禁用              | `boolean`                              | `false` |        | 否       |
| className   | 自定义额外类名        | `string`                            | `''`    |        | 否       |
| width       | 宽度                  | `string` &vert; `number`                |         |        | 否       |

#### `onChange` 和 `onInput` 的区别

- 由于 `NumberInput` 可以设置数字的格式，所以它的 `onChange` 和 `onInput` 行为是有区别的，这点和普通的 `Input` 不同
- 绝大部分时候应该使用 `onChange`，当需要实时获取用户输入的内容时才需要使用 `onInput`，且 `onInput` 的参数类型永远是 `string`
- `onInput` 和 `onChange` 的参数值可能不一致
  - 小数模式下设置精度为小数点后两位，当输入 `1.0` 的时候，在 `onInput` 中获取的参数是 `'1.0'`，而在 `onChange` 中获取的参数是 `'1.00'`
  - 整数模式下，当输入是 `2.00` 时，`onInput` 的参数是 `'2.00'`，但是 `onChange` 的参数是 `2`，注意不仅值不同，类型也是不一样的

<style>
.zent-number-input {
  width: 200px;
  margin-bottom: 20px;
}
</style>
