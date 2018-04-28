---
order: 11
zh-CN:
	title: 空列表
	product: 商品
	productName: 商品名
	uv: 访问量
	stock: 库存
en-US:
	title: Empty grid
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
		className: 'name'
	}, {
		title: '{i18n.uv}',
		name: 'uv'
	}, {
		title: '{i18n.stock}',
		name: 'stock'
	}
];

ReactDOM.render(
		<Grid
			columns={columns}
			datasets={[]}
			rowClassName={(data, index) => `${data.id}-${index}`}
			onRowClick={(data, index, event) => { console.log(data, index, event.target, 'simple onRowClick') }}
		/>
	, mountNode
);
```
