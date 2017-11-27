---
order: 3
zh-CN:
  title: 控制可输入的数字范围
  placehoder: 请输入数字
en-US:
  title: Enter number in a range
  placehoder: please enter number
---

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
  <div>
    <NumberInput
      value={3}
      min={-2}
      max={6}
      decimal={2}
      placeholder="{i18n.placehoder}"
    />
    <NumberInput
      value={3}
      showStepper
      min={2}
      max={6}
      decimal={2}
      placeholder="{i18n.placehoder}"
    />
    <NumberInput
      value={3}
      showCounter
      min={2}
      max={6}
      decimal={2}
      placeholder="{i18n.placehoder}"
    />
  </div>
  , mountNode
);
```
