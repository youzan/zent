---
order: 1
zh-CN:
  title: 基础用法
en-US:
  title: Basic Usage
---

```js
import { Layout } from 'zent';

const { Row, Col, Grid, ConfigProvider } = Layout;

ReactDOM.render(
	<ConfigProvider value={{ rowGutter: 16, colGutter: 0 }}>
		<Grid className="layout-demo-basic">
			<Row>
				<Col span={24}>col-24</Col>
			</Row>

			<Row>
				<Col span={8}>col-8</Col>
				<Col span={8}>col-8</Col>
				<Col span={8}>col-8</Col>
			</Row>

			<Row>
				<Col span={8} order={3}>col-8 order-3</Col>
				<Col span={8} order={2}>col-8 order-2</Col>
				<Col span={8} order={1}>col-8 order-1</Col>
			</Row>

			<Row>
				<Col span={8}>col-8</Col>
				<Col span={8} offset={8}>
					col-8 offset-8
				</Col>
			</Row>

			<Row justify="center">
				<Col span={4}>col-4</Col>
				<Col span={4} offset={4}>
					col-4 offset-4
				</Col>
				<Col span={4} offset={4}>
					col-4 offset-4
				</Col>
			</Row>
		</Grid>
	</ConfigProvider>,
	mountNode
);
```

<style type="text/css">
	.layout-demo-basic .zent-col {
	    background: rgba(0, 0, 222, 0.5);
	    color: #fff;
	    text-align: center;
			line-height: 64px;
	}
</style>
