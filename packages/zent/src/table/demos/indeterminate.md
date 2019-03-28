---
order: 10
zh-CN:
	title: 支持半选状态
	product: 商品
	productName: 商品名
	babyProducts: 母婴商品
	uv: 访问量
	stock: 库存
	sold_num: 销售量
en-US:
	title: Support indeterminate status
	product: Product
	productName: Product Name
	babyProducts: Baby Products
	uv: UV
	stock: Stock
	sold_num: Sales
---

```jsx
import { Table } from 'zent';

const datasets = [
	{
		item_id: '5024217',
		bro_uvpv: '0/0',
		stock_num: 0,
		sold_num: 1,
	},
	{
		item_id: '5024277',
		bro_uvpv: '0/0',
		stock_num: 59,
		sold_num: 0,
	},
	{
		item_id: '13213123',
		bro_uvpv: '0/0',
		stock_num: 159,
		sold_num: 0,
	},
];

const columns = [
	{
		title: '{i18n.product}',
		name: 'item_id',
	},
	{
		title: '{i18n.uv}',
		name: 'bro_uvpv',
	},
	{
		title: '{i18n.stock}',
		name: 'stock_num',
	},
	{
		title: '{i18n.sold_num}',
		name: 'sold_num',
	}
];

class Indeterminate extends React.Component {
	state = {
		page: {
			pageSize: 3,
			current: 1,
			total: 3,
		},
		datasets,
		selectedRowKeys: ['5024217'],
		indeterminateRowKeys: ['5024277'],
	};

	onSelect = (selectedRowKeys) => {
		console.log('selectedRowKeys: ', selectedRowKeys);
		this.setState({
			selectedRowKeys,
		});
	}

	render() {
		return (
			<Table
				rowKey="item_id"
				columns={columns}
				datasets={this.state.datasets}
				pageInfo={this.state.page}
				selection={{
					selectedRowKeys: this.state.selectedRowKeys,
					indeterminateRowKeys: this.state.indeterminateRowKeys,
					onSelect: (selectedRowKeys, selectedRows, currentRow) => {
						this.onSelect(selectedRowKeys, selectedRows, currentRow);
					}
				}}
			/>
		);
	}
}

ReactDOM.render(<Indeterminate />, mountNode);
```
