---
order: 3
zh-CN:
	title: 分页
	product: 商品
	longName: 听说这样设置一个超长超长的商品名会不换行
	uv: 访问量
	stock: 库存
	babyProducts: 母婴商品
	petProducts: 宠物商品

en-US:
	title: Pagination
	product: Product
	longName: a very very looooooooonnnnng name
	uv: uv
	stock: stock
	babyProducts: Baby Products
	petProducts: Pet Products
---

```jsx
import { Grid } from 'zent';

const columns = [
	{
		title: '{i18n.longName}',
		name: 'name',
		width: 100,
		nowrap: true,
		onCellClick: data => {
			console.log(data, 'data');
		},
	},
	{
		title: '{i18n.uv}',
		name: 'uv',
	},
	{
		title: '{i18n.uv}',
		name: 'stock',
	},
];

// const pageSize = 5;
// const totalItem = 10;

const datasets = [];
const datasets2 = [];

for (let i = 0; i < 5; i++) {
	datasets.push({
		id: `f-${i}`,
		name: `{i18n.babyProducts} ${i}`,
		uv: 20,
		stock: 5,
	});
	datasets2.push({
		id: `s-${i}`,
		name: `{i18n.petProducts} ${i}`,
		uv: 20,
		stock: 5,
	});
}

class PageInfo extends React.Component {
	state = {
		current: 1,
		pageSize: 5,
		total: 10,
		datasets,
	};

	onChange = ({ current, pageSize }) => {
		this.setState({
			current,
			pageSize,
		});
	};

	render() {
		const { current, pageSize, total } = this.state;
		return (
			<Grid
				columns={columns}
				datasets={current === 1 ? datasets : datasets2}
				pageInfo={{
					current: current,
					pageSize: pageSize,
					total: total,
					pageSizeOptions: [5, 10],
				}}
				onChange={this.onChange}
				ellipsis
			/>
		);
	}
}

ReactDOM.render(<PageInfo />, mountNode);
```
