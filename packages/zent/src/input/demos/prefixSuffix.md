---
order: 2
zh-CN:
	title: 带前后缀的输入框
en-US:
	title: Input with prefix or suffix
---

```jsx
import { Input } from 'zent';

ReactDOM.render(
  <div>
    <Input addonBefore="$" />
    <Input addonAfter="%" />
    <Input addonBefore="Buy" addonAfter="Apple" />
  </div>
  , mountNode
);
```
