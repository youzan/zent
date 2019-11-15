---
order: 14
zh-CN:
	title: 批量操作
	product: 商品
	productName: 商品名
	uv: 访问量
	stock: 库存
	babyProducts: 母婴商品
	petProducts: 宠物商品
en-US:
	title: Batch Components
	product: Product
	productName: Product Name
	uv: uv
	stock: stock
	babyProducts: Baby Products
	petProducts: Pet Products
---

```jsx
import { Grid, Notify, Button } from 'zent';

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

for (let i = 0; i < 40; i++) {
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

class Customer extends React.Component {
	onClick = () => {
		Notify.success(`${this.props.data.length} elements was selected`);
	};

	render() {
		return (
			<Button
				key="comp"
				className="child-comps zent-btn"
				onClick={this.onClick}
			>
				Click
			</Button>
		);
	}
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
					selectedRowKeys: this.state.selectedRowKeys,
					onSelect: (selectedRowKeys, selectedRows, currentRow) => {
						this.setState({
              selectedRowKeys,
            });
					},
					getCheckboxProps: data => ({
						disabled: data.name === '{i18n.babyProducts} 1',
					}),
				}}
				rowKey="id"
				onChange={this.onChange}
				batchRender={data => <Customer data={data} /> }
				stickyBatch
			/>
		);
	}
}

ReactDOM.render(<Selection />, mountNode);
```
