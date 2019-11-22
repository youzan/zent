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
	createdTime: 创建时间
en-US:
	title: Batch Components
	product: Product
	productName: Product Name
	uv: uv
	stock: stock
	babyProducts: Baby Products
	petProducts: Pet Products
	createdTime: Created Time
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
	{
		title: '{i18n.createdTime}',
		name: 'createdTime',
		width: 140,
		fixed: 'right',
	}
];

const pageSize = 40;
const totalItem = 40;

const datasets = [];
const datasets2 = [];

for (let i = 0; i < 40; i++) {
	datasets.push({
		id: `f-${i}`,
		name: `{i18n.babyProducts} ${i}`,
		uv: 20,
		stock: 5,
		createdTime: '2019-11-21'
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
				batchRender={data => <Customer data={data} /> }
				stickyBatch
				scroll={{x: 1300}}
			/>
		);
	}
}

ReactDOM.render(<Selection />, mountNode);
```
