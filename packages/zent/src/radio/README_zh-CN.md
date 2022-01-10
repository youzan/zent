---
title: Radio
subtitle: 单选
path: component/radio
group: 基础控件
---

## Radio 单选

`RadioGroup` 是一个[受控组件][https://facebook.github.io/react/docs/forms.html#controlled-components], 必须要设置 `onChange` 回调方法在组件外部处理 `value` 变化.

### API

#### Radio

| 参数       | 说明                              | 类型                  | 默认值 |
| ---------- | --------------------------------- | --------------------- | ------ |
| value      | 根据 value 进行比较，判断是否选中 | `any`                 |        |
| disabled   | 使组件不可用                      | `boolean`             |        |
| readOnly   | 使组件只读                        | `boolean`             |        |
| labelStyle | label 的内联样式                  | `React.CSSProperties` |        |
| className  | 自定义额外类名                    | `string`              |        |
| width      | 宽度                              | `string` \| `number`  |        |
