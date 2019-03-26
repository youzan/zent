---
order: 1
zh-CN:
  title: 基础用法
en-US:
  title: Basic Usage
---

```js
import { LayoutRow as Row, LayoutCol as Col, LayoutGrid as Grid } from 'zent';

ReactDOM.render(
	<Grid className="layout-demo-basic">
		<Row>
			<Col span={24}>
				<div className="layout-demo-cell">col-24</div>
			</Col>
		</Row>

		<Row>
			<Col span={8}>
				<div className="layout-demo-cell">col-8</div>
			</Col>
			<Col span={8}>
				<div className="layout-demo-cell">col-8</div>
			</Col>
			<Col span={8}>
				<div className="layout-demo-cell">col-8</div>
			</Col>
		</Row>

		<Row>
			<Col span={8} order={3}>
				<div className="layout-demo-cell">col-8 order-3</div>
			</Col>
			<Col span={8} order={2}>
				<div className="layout-demo-cell">col-8 order-2</div>
			</Col>
			<Col span={8} order={1}>
				<div className="layout-demo-cell">col-8 order-1</div>
			</Col>
		</Row>

		<Row>
			<Col span={8}>
				<div className="layout-demo-cell">col-8</div>
			</Col>
			<Col span={8} offset={8}>
				<div className="layout-demo-cell">col-8 offset-8</div>
			</Col>
		</Row>

		<Row justify="center">
			<Col span={4}>
				<div className="layout-demo-cell">col-4</div>
			</Col>
			<Col span={4} offset={4}>
				<div className="layout-demo-cell">col-4 offset-4</div>
			</Col>
			<Col span={4} offset={4}>
				<div className="layout-demo-cell">col-4 offset-4</div>
			</Col>
		</Row>
	</Grid>,
	mountNode
);
```

<style type="text/css">
	.layout-demo-cell {
	    background: #155bd4;
			opacity: 0.8;
	    color: #fff;
	    text-align: center;
			line-height: 64px;
	}
</style>
