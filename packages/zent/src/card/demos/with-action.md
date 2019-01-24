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
import { Card } from 'zent';

ReactDOM.render(
	<Card
		style={{ width: 400 }}
		title="Card Title"
		action={
			<a className="zent-link" target="_blank" href="//www.youzan.com">
				{i18n.youzan}
			</a>
		}
	>
		<p>Card item</p>
	</Card>,
	mountNode
);
```
