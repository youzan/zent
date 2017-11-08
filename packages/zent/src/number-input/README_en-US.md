---
title: NumberInput
path: component/number-input
group: Data Entry
---

## NumberInput

A input widget for entering number through mouse or keyboard

### Guides

- When you enter number, using numberInput is more convenient

### API

| Property           | Description              | Type            | Default      | Alternative                     | Required |
| ------------ | --------------- | ------------- | -------- | ----------------------- | ---- |
| value        | input value             | number        |          |                         | no    |
| onChange     | change event        | func(e:Event) |          |                         | no    |
| showStepper  | whether stepper is open         | bool        | `false` |                        | no    |
| decimal      | number decimal           | number        |          |                         | no    |
| min      | the minimum value in the range            | number        |          |                         | no    |
| max      | the maximum value in the range            | number        |          |                         | no    |
| placeholder  | raw placeholder text | string        | `''`     |                         | no    |
| disabled     | whether is disable or not            | bool          | `false`  |                         | no    |
| className    | custom extra class name        | string        | `''`     |                         | no    |
| width    | width    | string or number        |      |                         | no   |
| prefix       | custom class prefix         | string        | `'zent'` |                         | no    |

<style>
.zent-number-input-wrapper {
	width: 200px;
	margin-bottom: 20px;
}
</style>
