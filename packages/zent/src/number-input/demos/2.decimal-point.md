---
order: 2
zh-CN:
  title: 指定小数点精度
  placehoder: 请输入数字

en-US:
  title: Specify the decimal point precision
  placehoder: please enter number

---

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
  <div>
    <NumberInput value={2} decimal={2} placeholder="{i18n.placehoder}"/>    
    <NumberInput value={2} showStepper decimal={2} placeholder="{i18n.placehoder}"/>
    <NumberInput value={2} showCounter decimal={2} placeholder="{i18n.placehoder}"/>    
  </div>
  , mountNode
);
```
