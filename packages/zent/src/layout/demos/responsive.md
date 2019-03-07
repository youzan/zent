---
order: 2
zh-CN:
  title: 响应式
en-US:
  title: Responsive
---

```js
import {
	LayoutRow as Row,
	LayoutCol as Col,
	LayoutGrid as Grid,
	LayoutConfigProvider as ConfigProvider,
} from 'zent';

ReactDOM.render(
	<ConfigProvider
		value={{
			rowGutter: 8,
			colGutter: { fallback: 8, xxl: 48, xl: 24, lg: 16, md: 8, sm: 8, xs: 0 },
		}}
	>
		<Grid className="layout-demo-basic">
			<Row>
				<Col span={24}>
					<div className="layout-demo-cell">col-24</div>
				</Col>
			</Row>

			<Row>
				<Col span={{ fallback: 8, xxl: 8, xl: 6, lg: 5, md: 4, sm: 3, xs: 2 }}>
					<div className="layout-demo-cell">col-x</div>
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
		</Grid>
	</ConfigProvider>,
	mountNode
);
```
