---
title: NumberInput
path: component/number-input
group: Data Entry
---

## NumberInput

A input widget for entering number through mouse or keyboard.
Default value type is string. Under integer mode, value type is number, with default max value `Number.MAX_SAFE_INTEGER` and default min value `Number.MIN_SAFE_INTEGER`.

### Guides

- When you enter number, using numberInput is more convenient

### API

| Property    | Description                | Type                              | Default | Alternative | Required |
| ----------- | -------------------------- | --------------------------------- | ------- | ----------- | -------- |
| value       | Input value                | integer === true ? number: string |         |             | No       |
| onChange    | Change event               | func(value: typeof value)         |         |             | No       |
| showStepper | Show stepper               | bool                              | `false` |             | No       |
| showCounter | Show counter               | bool                              | `false` |             | No       |
| decimal     | Decimal                    | number                            | `0`     |             | No       |
| step        | Step used in stepper       | number                            |         |             | No       |
| min         | Minimum value in the range | number                            |         |             | No       |
| max         | Maximum value in the range | number                            |         |             | No       |
| placeholder | Placeholder text           | string                            | `''`    |             | No       |
| disabled    | Disable input              | bool                              | `false` |             | No       |
| className   | Extra class name           | string                            | `''`    |             | No       |
| width       | Input width                | string or number                  |         |             | No       |
| integer     | Integer mode               | bool                              | false   |             | No       |

<style>
.zent-number-input {
  width: 200px;
  margin-bottom: 20px;
}
</style>
