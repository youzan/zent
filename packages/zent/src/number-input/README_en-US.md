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

| Property    | Description                    | Type                              | Default | Alternative | Required |
| ----------- | ------------------------------ | --------------------------------- | ------- | ----------- | -------- |
| value       | input value                    | integer === true ? number: string |         |             | No       |
| onChange    | change event                   | func(value: typeof value)         |         |             | No       |
| showStepper | whether stepper is open        | bool                              | `false` |             | No       |
| showCounter | whether counter is open        | bool                              | `false` |             | No       |
| decimal     | number decimal                 | number                            | `0`     |             | No       |
| min         | the minimum value in the range | number                            |         |             | No       |
| max         | the maximum value in the range | number                            |         |             | No       |
| placeholder | raw placeholder text           | string                            | `''`    |             | No       |
| disabled    | whether is disable or not      | bool                              | `false` |             | No       |
| className   | custom extra class name        | string                            | `''`    |             | No       |
| width       | width                          | string or number                  |         |             | No       |
| integer     | integer mode                   | bool                              | false   |             | No       |

<style>
.zent-number-input {
  width: 200px;
  margin-bottom: 20px;
}
</style>
