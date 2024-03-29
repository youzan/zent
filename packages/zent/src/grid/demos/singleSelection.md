---
order: 5
zh-CN:
	title: 单选
	product: 商品
	productName: 商品名
	uv: 访问量
	stock: 库存
	babyProducts: 母婴商品
	petProducts: 宠物商品
	reason: '禁用原因'
en-US:
	title: SingleSelection
	product: Product
	productName: Product Name
	uv: uv
	stock: stock
	babyProducts: Baby Products
	petProducts: Pet Products
	reason: Reason of disabled
---

```jsx
import { Grid, Notify } from 'zent';

const columns = [
	{
		title: '{i18n.productName}',
		name: 'name',
	},
	{
		title: '{i18n.uv}',
		name: 'uv',
	},
	{
		title: '{i18n.stock}',
		name: 'stock',
	},
];

const pageSize = 5;
const totalItem = 10;

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

class Selection extends React.Component {
	state = {
		selectedRowKeys: ['f-0'],
		datasets,
		current: 1,
	};

	onChange = ({ current }) => {
		this.setState({
			current,
			datasets: current === 1 ? datasets : datasets2,
		});
	};

	render() {
		return (
			<Grid
				columns={columns}
				datasets={this.state.datasets}
				pageInfo={{
					pageSize: pageSize,
					total: totalItem,
					current: this.state.current,
				}}
				paginationType="lite"
				selection={{
          isSingleSelection: true,
					selectedRowKeys: this.state.selectedRowKeys,
					onSelect: (selectedRowKeys, selectedRows, currentRow) => {
            Notify.success(`当前选中：${JSON.stringify(currentRow)}
            selectedRows: ${JSON.stringify(selectedRows)}
            `);
            this.setState({
              selectedRowKeys,
            })
					},
					getSelectionProps: data => ({
						disabled: data.name === '{i18n.babyProducts} 1',
						reason: '{i18n.reason}'
					}),
				}}
				rowKey="id"
				onChange={this.onChange}
				size="large"
			/>
		);
	}
}

ReactDOM.render(<Selection />, mountNode);
```
