---
order: 1
zh-CN:
  title: 基础用法
  placehoder: 请输入数字
en-US:
  title: Basic usage
  placehoder: please enter number
---

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
  <div>
    <NumberInput value={2} placeholder="{i18n.placehoder}"/>
    <NumberInput value={2} showStepper placeholder="{i18n.placehoder}"/>
    <NumberInput value={2} showCounter placeholder="{i18n.placehoder}"/>
  </div>
  , mountNode
);

```
