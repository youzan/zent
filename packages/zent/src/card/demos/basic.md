---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```js
import { Card } from 'zent';

ReactDOM.render(
	<div className="zent-card-example">
		<Card className="zent-card-example__card" style={{ width: 400 }}>
			<p>Card item</p>
		</Card>
		<Card
			className="zent-card-example__card"
			style={{ width: 400 }}
			bordered={false}
		>
			<p>Card item</p>
		</Card>
	</div>,
	mountNode
);
```

<style>
	.zent-card-example {
		padding: 20px;
		background: #f7f7f7;
	}
	.zent-card-example--flex {
		display: flex;
	}
	.zent-card-example__card {
		margin-bottom: 16px;
		margin-right: 16px;
	}
</style>
