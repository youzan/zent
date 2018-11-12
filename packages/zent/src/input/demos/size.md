---
order: 9
zh-CN:
	title: 三种不同的大小
en-US:
	title: Three sizes
---

```jsx
import { Input } from 'zent';

ReactDOM.render(
  <div>
			<Input defaultValue="Blah" size="large" addonAfter="$" />
			<Input defaultValue="Foobar" size="normal" />
			<Input defaultValue="42" size="small" addonBefore="$" />
  </div>
  , mountNode
);
```
