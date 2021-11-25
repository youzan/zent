---
order: 6
zh-CN:
	title: 支持自定义样式
en-US:
	title: Card with custom style
---

```js
import { Card } from 'zent';

ReactDOM.render(
  <Card 
		title="Card Title"
		style={{ width: 400 }} 
		bodyStyle={{ background: '#f7f7f7', height: '80px'}} 
	/>
  , mountNode
);
```
