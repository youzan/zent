---
order: 20
zh-CN:
	title: 不同尺寸
	product: 商品
	productName: 商品名
	uv: 访问量
	stock: 库存
en-US:
	title: Different size
	product: Product
	productName: Product Name
	uv: uv
	stock: stock
---

```jsx
import { Grid, Radio } from 'zent';

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

const Demo = () => {
	const [size, setSize] = useState('medium');

	return (<div>
		<Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
			<Radio.Button value="small">small</Radio.Button>
			<Radio.Button value="medium">medium</Radio.Button>
			<Radio.Button value="large">large</Radio.Button>
		</Radio.Group>
		<div style={{height: 20}}></div>
		<Grid
			size={size}
			columns={columns}
			datasets={datasets}
			rowClassName={(data, index) => `${data.id}-${index}`}
			onRowClick={(data, index, event) => { console.log(data, index, event.target, 'simple onRowClick') }}
		/>
	</div>);
}

ReactDOM.render(
		<Demo />
	, mountNode
);

```
