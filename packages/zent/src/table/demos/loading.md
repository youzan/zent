---
order: 2
zh-CN:
	title: 支持Loading
	product: 商品
	productName: 商品名
	babyProducts: 母婴商品
	uv: 访问量
	stock: 库存
	sold_num: 销售量
en-US:
	title: Loading Mode
	product: Product
	productName: Product Name
	babyProducts: Baby Products
	uv: UV
	stock: Stock
	sold_num: Sales
---

```js
import { Table } from 'zent';

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

const columns = [
	{
		title: '{i18n.product}',
		bodyRender: data => {
			return <div>{data.item_id}</div>;
		},
	},
	{
		title: '{i18n.uv}',
		name: 'bro_uvpv',
		width: '200px',
	},
	{
		title: '{i18n.stock}',
		name: 'stock_num',
		width: '100px',
		textAlign: 'center',
		isMoney: true,
	},
	{
		width: '6em',
		title: '{i18n.sold_num}',
		name: 'sold_num',
	},
];

class Demo extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
		};
	}

	// 用定时器模拟loading
	componentWillMount() {
		let self = this;
		setTimeout(() => {
			self.setState({
				loading: false,
			});
		}, 3000);
	}

	onChange(conf) {
		this.setState(conf);
	}

	render() {
		return (
			<Table
				columns={columns}
				datasets={datasets}
				onChange={this.onChange.bind(this)}
				loading={this.state.loading}
				rowKey="item_id"
			/>
		);
	}
}

ReactDOM.render(<Demo />, mountNode);
```
