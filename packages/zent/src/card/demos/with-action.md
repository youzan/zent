---
order: 3
zh-CN:
	title: 带交互的卡片
	youzan: 有赞
en-US:
	title: Card with Actions
	youzan: Youzan
---

```js
import { Card, Button } from 'zent';

ReactDOM.render(
	<div className="zent-card-example">
		<Card
			style={{ width: 400 }}
			title="Card Title"
			bordered={false}
			action={<Button type="text">{i18n.youzan}</Button>}
		>
			<p>Card item</p>
		</Card>
	</div>
	,
	mountNode
);
```
