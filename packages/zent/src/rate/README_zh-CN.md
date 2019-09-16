---
title: Rate
subtitle: 评分
path: component/rate
group: 数据
---

## Rate 评分

评分组件。

### API

| 属性       | 说明                   | 类型                      | 是否必须 | 默认值                 | 备选值 |
| ---------- | ---------------------- | ------------------------- | -------- | ---------------------- | ------ |
| onChange   | 选择时的回调           | `Function(value: number)` | 是       | -                      |        |
| value      | 当前数，受控值         | `number`                  | 否       | 0                      |        |
| allowClear | 是否允许再次点击后清除 | `boolean`                 | 否       | `true`                 |        |
| allowHalf  | 是否允许半选           | `boolean`                 | 否       | `false`                |        |
| character  | 自定义字符             | `ReactNode`               | 否       | `<Icon type="star" />` |        |
| className  | 自定义样式类名         | `string`                  | 否       | -                      |        |
| count      | `star` 总数            | `number`                  | 否       | 5                      |        |
| disabled   | 禁用，无法进行交互     | `boolean`                 | 否       | `false`                |        |
| readOnly   | 只读，仅用于展示，与 `disabled` 除语义差别外，主要区别是cursor不同，为真时可精确到0.1分显示     | `boolean`  | 否 | `false`  |        |
| style      | 自定义样式对象         | `object`                  | 否       | -                      |        |
| prefix     | 自定义前缀            | `string`                  | 否       | `'zent'`               |        |
