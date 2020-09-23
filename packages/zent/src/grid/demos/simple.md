---
order: 1
zh-CN:
	title: 基础用法
	product: 商品
	productName: 商品名
	uv: 访问量
	stock: 库存
en-US:
	title: Simple
	product: Product
	productName: Product Name
	uv: uv
	stock: stock
---

```jsx
import { Grid } from 'zent';

const columns = [
	{
		title: '{i18n.productName}',
		name: 'name',
		className: 'name',
		textAlign: 'center',
		colSpan: 2,
	}, {
		title: '{i18n.uv}',
		name: 'uv',
		colSpan: 0,
	}, {
		title: '{i18n.stock}',
		name: 'stock',
		defaultText: 0
	}
];

const datasets = [];

for (let i = 0; i < 3; i++) {
	datasets.push({
		id: `id-${i}`,
		name: `{i18n.product} ${i}`,
		uv: 20,
		stock: i > 1 ? 5 : null
	})
}

ReactDOM.render(
		<Grid
			columns={columns}
			datasets={datasets}
			rowClassName={(data, index) => `${data.id}-${index}`}
			onRowClick={(data, index, event) => { console.log(data, index, event.target, 'simple onRowClick') }}
		/>
	, mountNode
);

```
