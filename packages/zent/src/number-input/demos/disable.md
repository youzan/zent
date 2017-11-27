---
order: 4
zh-CN:
  title: disable状态
en-US:
  title: Disable status
---

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
  <div>
    <NumberInput value={3} disabled />
    <NumberInput value={3} disabled showStepper />
    <NumberInput value={3} disabled showCounter/>
  </div>
  , mountNode
);
```
