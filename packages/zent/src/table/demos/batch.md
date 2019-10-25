---
order: 8
zh-CN:
	title: 支持批量操作
	product: 商品
	productName: 商品名
	babyProducts: 母婴商品
	uv: 访问量
	stock: 库存
	sold_num: 销售量
en-US:
	title: Batch Operation
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
		width: '150px',
		bodyRender: data => {
			return <div>{data.item_id}</div>;
		},
	},
	{
		title: '{i18n.uv}',
		name: 'bro_uvpv',
		width: '100px',
	},
	{
		title: '{i18n.stock}',
		name: 'stock_num',
		width: '100px',
	},
	{
		title: '{i18n.sold_num}',
		name: 'sold_num',
	},
];

class Customer extends React.Component {
	onClick = () => {
		Notify.success(`${this.props.data.length} elements was selected`);
	};

	render() {
		return (
			<button
				key="comp"
				className="child-comps zent-btn"
				onClick={this.onClick}
			>
				Click
			</button>
		);
	}
}

class BatchCompsClass extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			datasets,
			page: {
				pageSize: 3,
				current: 1,
				totalItem: 6,
			},
			selectedRowKeys: [],
		};
	}

	getRowConf(data, index) {
		return {
			canSelect: true,
		};
	}

	onSelect = selectedRowkeys => {
		this.setState({ selectedRowKeys: selectedRowkeys });
	};

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
		return (
			<Table
				columns={columns}
				datasets={this.state.datasets}
				onChange={this.onChange.bind(this)}
				getRowConf={this.getRowConf}
				pageInfo={this.state.page}
				rowKey="item_id"
				batchComponents={[
					<span key="pure" className="child-comps">
						This is a DOM element.{' '}
					</span>,
					data => {
						return (
							<span
								key="func"
								className="child-comps"
								style={{ color: 'blueviolet' }}
							>
								{' '}
								This is a function, {data.length} elements was selected.{' '}
							</span>
						);
					},
					Customer,
				]}
				selection={{
					selectedRowKeys: this.state.selectedRowKeys,
					onSelect: (selectedRowkeys, selectedRows, currentRow) => {
						this.onSelect(selectedRowkeys);
					},
					needCrossPage: true,
				}}
			/>
		);
	}
}

ReactDOM.render(<BatchCompsClass />, mountNode);
```
