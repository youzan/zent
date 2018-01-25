---
order: 4
zh-CN:
	title: 嵌套卡片
	outerCardTitle: 外层卡片
	innerCardTitle: 内层卡片
en-US:
	title: Nested cards
	outerCardTitle: Outer card
	innerCardTitle: Nested card
---

```js
import { Card } from 'zent';

ReactDOM.render(
	<Card style={{ width: 400 }} title="{i18n.outerCardTitle}">
		<p style={{ marginBottom: 10 }}>Card content</p>

		<Card type="nested" title="{i18n.innerCardTitle}">
			<p>Nested card content</p>
		</Card>
	</Card>
	, mountNode
);
```
