---
order: 4
zh-CN:
	title: 多选
	hide: 隐藏选择框
	show: 显示选择框
	toSingle: 切换单选
	toMultiple: 切换多选
	errorTips: 你最多选择两个
	product: 商品
	productName: 商品名
	uv: 访问量
	stock: 库存
	babyProducts: 母婴商品
	petProducts: 宠物商品
	reason: '禁用原因'
en-US:
	title: Selection
	hide: Hide
	show: Show
	toSingle: To single mode
	toMultiple: To multiple mode
	errorTips: You can choose up to two
	product: Product
	productName: Product Name
	uv: uv
	stock: stock
	babyProducts: Baby Products
	petProducts: Pet Products
	reason: Reason of disabled
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
		showSelection: true,
		isSingle: false,
	};

	onChange = ({ current }) => {
		this.setState({
			current,
			datasets: current === 1 ? datasets : datasets2,
		});
	};

	toggleSelection = () => {
		this.setState({
			showSelection: !this.state.showSelection,
		});
	};

	toggleSelectionMode = () => {
		this.setState({
			isSingle: !this.state.isSingle,
			selectedRowKeys: [this.state.selectedRowKeys[0]],
		});
	};

	render() {
		return (
			<>
				<Button onClick={this.toggleSelection} style={{ marginBottom: 12 }}>
					{this.state.showSelection ? '{i18n.hide}' : '{i18n.show}'}
				</Button>
				{this.state.showSelection && (
					<Button onClick={this.toggleSelectionMode} style={{ marginBottom: 12 }}>
						{ this.state.isSingle ? '{i18n.toMultiple}' : '{i18n.toSingle}' }
					</Button>
				)}
				<Grid
					columns={columns}
					datasets={this.state.datasets}
					pageInfo={{
						pageSize: pageSize,
						total: totalItem,
						current: this.state.current,
					}}
					paginationType="lite"
					selection={
						this.state.showSelection
							? {
									selectedRowKeys: this.state.selectedRowKeys,
									isSingleSelection: this.state.isSingle,
									onSelect: (selectedRowKeys, selectedRows, currentRow) => {
										if (selectedRowKeys.length > 2) {
											Notify.error('{i18n.errorTips}');
											this.setState({
												selectedRowKeys: [].concat(this.state.selectedRowKeys),
											});
										} else {
											this.setState({
												selectedRowKeys,
											});
										}
									},
									getSelectionProps: data => ({
											disabled: data.name === '{i18n.babyProducts} 1',
											indeterminate: data.id === 'f-2' && this.state.selectedRowKeys.includes('f-2'),
											reason: '{i18n.reason}',
									}),
							  }
							: undefined
					}
					rowKey="id"
					onChange={this.onChange}
					size="large"
				/>
			</>
		);
	}
}

ReactDOM.render(<Selection />, mountNode);
```
