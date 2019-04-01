---
order: 5
zh-CN:
	title: 选择模式
	product: 商品
	productName: 商品名
	babyProducts: 母婴商品
	uv: 访问量
	stock: 库存
	sold_num: 销售量
en-US:
	title: Selection
	product: Product
	productName: Product Name
	babyProducts: Baby Products
	uv: UV
	stock: Stock
	sold_num: Sales
---

```js
import { Table, Notify } from 'zent';

const datasets = [
	{
		item_id: '5024217',
		bro_uvpv: '0/0',
		stock_num: '60',
		sold_num: 0,
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
const datasets2 = [
	{
		item_id: '4217',
		bro_uvpv: '0/0',
		stock_num: '60',
		sold_num: 0,
	},
	{
		item_id: '50',
		bro_uvpv: '0/0',
		stock_num: 59,
		sold_num: 0,
	},
	{
		item_id: '13123',
		bro_uvpv: '0/0',
		stock_num: 159,
		sold_num: 0,
	},
];

const columns = [
	{
		title: '{i18n.product}',
		width: 50,
		bodyRender: data => {
			return <div>{data.item_id}</div>;
		},
	},
	{
		title: '{i18n.uv}',
		name: 'bro_uvpv',
		width: 10,
	},
	{
		title: '{i18n.stock}',
		name: 'stock_num',
		width: 20,
	},
	{
		title: '{i18n.sold_num}',
		name: 'sold_num',
		width: 20,
	},
];

class Selection extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			page: {
				pageSize: 3,
				current: 1,
				totalItem: 6,
			},
			datasets: datasets,
			selectedRowKeys: ['5024217', '5024277'],
		};
	}

	onSelect(selectedRowKeys, selectedRows, currentRow) {
		if (selectedRowKeys.length) {
			Notify.success(JSON.stringify(selectedRowKeys));
		}

		this.setState({
			selectedRowKeys,
		});
	}

	getRowConf(rowData, index) {
		return {
			canSelect: index % 2 === 0,
		};
	}

	onChange(conf) {
		this.setState({
			page: {
				pageSize: 3,
				current: conf.current,
				total: 6,
			},
			datasets: conf.current === 1 ? datasets : datasets2,
		});
	}

	render() {
		let self = this;

		return (
			<Table
				columns={columns}
				datasets={this.state.datasets}
				rowKey="item_id"
				getRowConf={this.getRowConf}
				pageInfo={this.state.page}
				paginationType="lite"
				onChange={conf => {
					this.onChange(conf);
				}}
				selection={{
					selectedRowKeys: this.state.selectedRowKeys,
					needCrossPage: true,
					onSelect: (selectedRowKeys, selectedRows, currentRow) => {
						self.onSelect(selectedRowKeys, selectedRows, currentRow);
					},
				}}
			/>
		);
	}
}

ReactDOM.render(<Selection />, mountNode);
```
