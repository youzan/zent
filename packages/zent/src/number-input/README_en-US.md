---
title: NumberInput
path: component/number-input
group: Data Entry
---

## NumberInput

A input widget for entering number through mouse or keyboard

### Usage

- When you enter number, using numberInput is more convenient

### demos

### API

| Property           | Description              | Type            | Default      | Alternative                     | 是否必填 |
| ------------ | --------------- | ------------- | -------- | ----------------------- | ---- |
| value        | input value             | number        |          |                         | 否    |
| onChange     | change event        | func(e:Event) |          |                         | 否    |
| showStepper  | 是否开启记步器         | bool        | `false` |                        | 否    |
| decimal      | number decimal           | number        |          |                         | 否    |
| min      | 数值范围最小值            | number        |          |                         | 否    |
| max      | 数值范围最大值            | number        |          |                         | 否    |
| placeholder  | 原生placeholder文案 | string        | `''`     |                         | 否    |
| disabled     | 是否禁用            | bool          | `false`  |                         | 否    |
| className    | 自定义额外类名        | string        | `''`     |                         | 否    |
| prefix       | 自定义类前缀         | string        | `'zent'` |                         | 否    |

<style>
.zent-number-input-wrapper {
	width: 200px;
	margin-bottom: 20px;
}
</style>
