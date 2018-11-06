---
order: 10
zh-CN:
	title: 支持半选状态
en-US:
	title: Support indeterminate status
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
		title: 'Product',
		name: 'item_id',
	},
	{
		title: 'PV',
		name: 'bro_uvpv',
	},
	{
		title: 'Stock',
		name: 'stock_num',
	},
	{
		title: 'Sales',
		name: 'sold_num',
	}
];

class Indeterminate extends React.Component {
	state = {
		page: {
			pageSize: 3,
			current: 0,
			totalItem: 3,
		},
		datasets,
		selectedRowKeys: ['5024217'],
		indeterminatedRowKeys: ['5024277'],
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
					indeterminatedRowKeys: this.state.indeterminatedRowKeys,
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
