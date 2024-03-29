---
title: Slider
subtitle: 滑动条
path: component/slider
group: 信息录入
scatter: true
---

## Slider 滑动输入条

通过拖动、点击 `Slider` 组件选择数值

### 使用指南

- 可设置单滑块或者双滑块
- 可与 `Input` 输入框配合使用

<!-- demo-slot-1 -->
<!-- demo-slot-3 -->
<!-- demo-slot-6 -->
<!-- demo-slot-7 -->

### API

| 参数      | 说明                   | 类型             | 默认值  | 备选值 | 是否必填 |
| --------- | ---------------------- | ---------------- | ------- | ------ | -------- |
| value     | 输入值                 | [number,array]   | 0       | [0,0]  | 否       |
| onChange  | change 事件            | func(e:Event)    |         |        | 否       |
| range     | 是否选择范围           | bool             | false   |        | 否       |
| max       | 最大范围               | number           | 100     | 50     | 否       |
| min       | 最小范围               | number           | 0       | -100   | 否       |
| step      | 间隔                   | number           | 1       |        | 否       |
| withInput | 是否带输入框           | bool             | true    |        | 否       |
| dots      | 是否只能在标签值中选择 | bool             | false   |        | 否       |
| marks     | 标签值                 | object           |         |        | 否       |
| disabled  | 是否禁用               | bool             | `false` |        | 否       |
| className | 自定义额外类名         | string           | `''`    |        | 否       |
| width     | 宽度                   | string or number |         |        | 否       |

⚠️ 注意：`range` 属性设置了必须给一个 `value` 值，且一定为一个长度为 2 的数组，数组项必须为数字。`dots` 属性配合 `marks` 属性使用。


#### 以下功能新版设计语言已废弃，仅作为老版使用的参考

<!-- demo-slot-2 -->
<!-- demo-slot-4 -->
<!-- demo-slot-5 -->

