---
order: 2
zh-CN:
	title: 带标题的卡片
en-US:
	title: Card with Title
---

```js
import { Card } from 'zent';

ReactDOM.render(
	<div className="zent-card-example zent-card-example--flex">
		<Card 
			className="zent-card-example__card" 
			style={{ width: 400 }} 
			title="Card Title"
		>
			<p>Card item</p>
			<p>Card item</p>
			<p>Card item</p>
		</Card>
		<Card 
			className="zent-card-example__card" 
			style={{ width: 400 }} 
			title="Card Title"
			bordered={false}
		>
			<p>Card item</p>
			<p>Card item</p>
			<p>Card item</p>
		</Card>
	</div>
  , mountNode
);
```


