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
	<div className="zent-card-example">
		<Card 
			className="zent-card-example__card" 
			style={{ width: 400 }} 
			bordered={false}
			bodyStyle={{ background: '#f7f7f7', height: '80px'}} 
		/>
		<Card 
			title="Card Title"
			style={{ width: 400 }} 
			bordered={false}
			bodyStyle={{ background: '#f7f7f7', height: '80px'}} 
		/>
	</div>
  , mountNode
);
```
