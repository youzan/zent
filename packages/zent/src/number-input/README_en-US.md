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

| Property           | Description              | Type            | Default      | Alternative  | Required |
| ------------ | --------------- | ------------- | -------- | ----------------------- | ---- |
| value        | input value             | number        |          |      |  No    |
| onChange     | change event        | func(e:Event) |          |      |  No    |
| showStepper  | whether stepper is open         | bool        | `false` |     |  No    |
| showCounter  | whether counter is open         | bool        | `false` |     |  No    |
| decimal      | number decimal           | number        |          |      |  No    |
| min      | the minimum value in the range        | number        |          |      |  No    |
| max      | the maximum value in the range       | number        |          |      |  No    |
| placeholder  | raw placeholder text | string        | `''`     |      |  No    |
| disabled     | whether is disable or not            | bool          | `false`  |      |  No    |
| className    | custom extra class name        | string        | `''`     |      |  No    |
| width    | width    | string or number        |      |      |  No   |
| prefix       | custom class prefix         | string        | `'zent'` |      |  No    |

<style>
.zent-number-input-wrapper {
  width: 200px;
  margin-bottom: 20px;
}
</style>
