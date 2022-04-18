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
| value       | Input value                | `integer === true ? number : string` |         |             | No       |
| onChange    | Value change callback      | `(value: typeof value) => void`         |         |             | No       |
| onInput     | User input callback        | `(value: string) => void`         |         |             | No       |
| showStepper | Show stepper               | `boolean`                              | `false` |             | No       |
| showCounter | Show counter               | `boolean`                              | `false` |             | No       |
| showTooltip 		| Show pop    							 | `boolean`                              | `false` |        | 否       |
| integer     | Integer mode               | `boolean`                              | `false`   |             | No       |
| decimal     | Decimal                    | `number`                            | `0`     |             | No       |
| step        | Step used in stepper       | `number`                            |         |             | No       |
| dynamicDecimal | show decimal as input      |    `boolean`           |  `false`   |        |   No    |
| min         | Minimum value in the range | `number`                            |         |             | No       |
| max         | Maximum value in the range | `number`                            |         |             | No       |
| placeholder | Placeholder text           | `string`                            | `''`    |             | No       |
| disabled    | Disable input              | `boolean`                              | `false` |             | No       |
| className   | Extra class name           | `string`                            | `''`    |             | No       |
| width       | Input width                | `string` &vert; `number`                  |         |             | No       |

#### `onChange` vs `onInput`

- `onChange` and `onInput` behave differently because `NumberInput` supports number formats
- You should use `onChange` most of the time, only use `onInput` if you want to get realtime user input
- `onChange` and `onInput` may see different values
  - In decimal mode with two digits precision after zero, if we type `1.0`, `onInput` gets a value of `'1.0'` but `onChange` get a value of `'1.00'`
  - In integer mode, if we type `2.0`, `onInput` gets a value of `'2.0'`, but `onChange` gets a value of `2`. Note the type different.

#### when `decimal` is -1

It represents the number of decimal places to take the number of decimal places actually entered by the user

<style>
.zent-number-input {
  width: 200px;
  margin-bottom: 20px;
}
</style>
