---
order: 5
zh-CN:
	title: 支持自定义样式
en-US:
	title: Card with custom style
---

```js
import { Card } from 'zent';

ReactDOM.render(
  <Card style={{ width: 400 }} bodyStyle={{ background: '#e5e5e5'}}>
		<p>Custom background</p>
  </Card>
  , mountNode
);
```
