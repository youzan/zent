---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```js
import { Layout } from 'zent';

const { Row, Col } = Layout

ReactDOM.render(
	<div className="layout-demo-basic">
		<Row>
			<Col span={24}>Col 24</Col>
		</Row>

		<Row>
			<Col span={8}>Col 8</Col>
			<Col span={8}>Col 8</Col>
			<Col span={8}>Col 8</Col>
		</Row>

		<Row>
			<Col span={8}>Col 8</Col>
			<Col span={8} offset={8}>Col 8, Offset 8</Col>
		</Row>

		<Row>
			<Col span={4}>Col 4</Col>
			<Col span={4} offset={4}>Col 4, Offset 4</Col>
			<Col span={4} offset={4}>Col 4, Offset 4</Col>
		</Row>	
	</div>
	, mountNode
);
```

<style type="text/css">
	.layout-demo-basic .zent-row {
	    background: -webkit-linear-gradient(left, #F5F5F5 4.16666667%, rgba(0, 0, 0, 0) 4.16666667%, rgba(0, 0, 0, 0) 8.33333333%, #F5F5F5 8.33333333%, #F5F5F5 12.5%, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 0) 16.66666667%, #F5F5F5 16.66666667%, #F5F5F5 20.83333333%, rgba(0, 0, 0, 0) 20.83333333%, rgba(0, 0, 0, 0) 25%, #F5F5F5 25%, #F5F5F5 29.16666667%, rgba(0, 0, 0, 0) 29.16666667%, rgba(0, 0, 0, 0) 33.33333333%, #F5F5F5 33.33333333%, #F5F5F5 37.5%, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 0) 41.66666667%, #F5F5F5 41.66666667%, #F5F5F5 45.83333333%, rgba(0, 0, 0, 0) 45.83333333%, rgba(0, 0, 0, 0) 50%, #F5F5F5 50%, #F5F5F5 54.16666667%, rgba(0, 0, 0, 0) 54.16666667%, rgba(0, 0, 0, 0) 58.33333333%, #F5F5F5 58.33333333%, #F5F5F5 62.5%, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 66.66666667%, #F5F5F5 66.66666667%, #F5F5F5 70.83333333%, rgba(0, 0, 0, 0) 70.83333333%, rgba(0, 0, 0, 0) 75%, #F5F5F5 75%, #F5F5F5 79.16666667%, rgba(0, 0, 0, 0) 79.16666667%, rgba(0, 0, 0, 0) 83.33333333%, #F5F5F5 83.33333333%, #F5F5F5 87.5%, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 91.66666667%, #F5F5F5 91.66666667%, #F5F5F5 95.83333333%, rgba(0, 0, 0, 0) 95.83333333%);
	    background: linear-gradient(90deg, #F5F5F5 4.16666667%, rgba(0, 0, 0, 0) 4.16666667%, rgba(0, 0, 0, 0) 8.33333333%, #F5F5F5 8.33333333%, #F5F5F5 12.5%, rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 0) 16.66666667%, #F5F5F5 16.66666667%, #F5F5F5 20.83333333%, rgba(0, 0, 0, 0) 20.83333333%, rgba(0, 0, 0, 0) 25%, #F5F5F5 25%, #F5F5F5 29.16666667%, rgba(0, 0, 0, 0) 29.16666667%, rgba(0, 0, 0, 0) 33.33333333%, #F5F5F5 33.33333333%, #F5F5F5 37.5%, rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 0) 41.66666667%, #F5F5F5 41.66666667%, #F5F5F5 45.83333333%, rgba(0, 0, 0, 0) 45.83333333%, rgba(0, 0, 0, 0) 50%, #F5F5F5 50%, #F5F5F5 54.16666667%, rgba(0, 0, 0, 0) 54.16666667%, rgba(0, 0, 0, 0) 58.33333333%, #F5F5F5 58.33333333%, #F5F5F5 62.5%, rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 0) 66.66666667%, #F5F5F5 66.66666667%, #F5F5F5 70.83333333%, rgba(0, 0, 0, 0) 70.83333333%, rgba(0, 0, 0, 0) 75%, #F5F5F5 75%, #F5F5F5 79.16666667%, rgba(0, 0, 0, 0) 79.16666667%, rgba(0, 0, 0, 0) 83.33333333%, #F5F5F5 83.33333333%, #F5F5F5 87.5%, rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 0) 91.66666667%, #F5F5F5 91.66666667%, #F5F5F5 95.83333333%, rgba(0, 0, 0, 0) 95.83333333%);
	}
	.layout-demo-basic .zent-row > div {
	    padding: 40px 0;
	    background: rgba(0, 0, 222, 0.5);
	    color: #fff;
	    text-align: center;
	}
	.layout-demo-basic .zent-row > div:nth-child(even) {
	    background: rgba(0, 0, 222, 0.6);
	}
</style>

