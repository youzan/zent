---
order: 16
zh-CN:
	title: ColumnProvider
	product: 商品
	productName: 商品名
	uv: 访问量
	stock: 库存
en-US:
	title: ColumnProvider
	product: Product
	productName: Product Name
	uv: uv
	stock: stock
---

```jsx
import { Grid, GridColumnProvider } from 'zent';

const columns = [
	{
		title: '{i18n.productName}',
		name: 'name',
		className: 'name',
	},
	{
		title: '{i18n.uv}',
		name: 'uv',
	},
	{
		title: '{i18n.stock}',
		name: 'stock',
		defaultText: 'column default'
	},
];

const datasets = [];

for (let i = 0; i < 3; i++) {
	datasets.push({
		id: `id-${i}`,
		name: `{i18n.product} ${i}`,
		uv: i > 1 ? 20 : '',
		stock: i > 1 ? 5 : null,
	});
}

ReactDOM.render(
	<GridColumnProvider
		value={{
			defaultText: 'provider default',
			isValueEmpty: value => value == null || value === '',
		}}
	>
		<Grid
			disableHoverHighlight
			columns={columns}
			datasets={datasets}
			rowClassName={(data, index) => `${data.id}-${index}`}
		/>
	</GridColumnProvider>,
	mountNode
);
```
