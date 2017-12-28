---
order: 8
zh-CN:
	title: 垂直滚动
	product: 商品
	productName: 商品名
	uv: 访问量
	stock: 库存
en-US:
	title: Vertical scroll
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
		width: 150
	}, {
		title: '{i18n.uv}',
		name: 'uv',
		width: 150
	}, {
		title: '{i18n.stock}',
		name: 'stock'
	}
];

const datasets = [];

for (let i = 0; i < 5; i++) {
	datasets.push({
		id: `id-${i}`,
		name: `{i18n.product} ${i}`,
		uv: 20,
		stock: 5
	})
}

ReactDOM.render(
		<Grid
			columns={columns}
			datasets={datasets}
			scroll={{ y: 200 }}
			rowClassName={(data, index) => `${data.id}-${index}`}
			onRowClick={(data, index, event) => { console.log(data, index, event.target, 'simple onRowClick') }}
		/>
	, mountNode
);

```
