---
order: 8
zh-CN:
	title: 水平滚动
	product: 商品
	productName: 商品名
	uv: 访问量
	stock: 库存
	soldNumber: 销量
	createdTime: 创建时间
en-US:
	title: Horizontal scroll
	product: Product
	productName: Product Name
	uv: uv
	stock: stock
	soldNumber: Number of sold products
	createdTime: Created Time
---

```jsx
import { Grid, NumberInput } from 'zent';

const columns = [
	{
		title: '{i18n.productName}',
		name: 'name',
		width: 100,
		fixed: true,
	},
	{
		title: '{i18n.uv}',
		name: 'uv',
		width: 100,
		fixed: true,
	},
	{
		title: '{i18n.stock}',
		name: 'stock',
	},
	{
		title: '{i18n.soldNumber}',
		name: 'sold_num',
	},
	{
		title: '{i18n.createdTime}',
		name: 'created_time',
		width: 100,
		fixed: 'right',
	},
];

const datasets = [];

for (let i = 0; i < 3; i++) {
	datasets.push({
		id: i,
		name: `{i18n.product} ${i}`,
		uv: 20,
		stock: 5,
		sold_num: 5,
		created_time: '2017-09-20',
	});
}

function App() {
	const [x, setX] = React.useState(1300);
	return (
		<div>
			<NumberInput value={x} onChange={setX} integer addonAfter="px" style={{ marginBottom: 16 }} />
			<Grid columns={columns} datasets={datasets} scroll={{ x }} />
		</div>
	);
}

ReactDOM.render(
	<App />,
	mountNode
);
```
