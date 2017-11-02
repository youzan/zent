---
order: 4
zh-CN:
	title: 支持自定义样式
en-US:
	title: Card with Custom Style
---

```js
import { Card } from 'zent';

ReactDOM.render(
  <Card style={{ width: 400 }} bodyStyle={{ background: '#eee'}}>
      <p>card item</p>
  </Card>
  , mountNode
);
```
