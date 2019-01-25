---
order: 13
zh-CN:
	title: 表头分组
	product: 商品
	productName: 商品名
	productInfo: 商品信息
	type: 类型
	supplier: 供货商
	company: 公司
	phone: 电话
	stock: 库存
	createdTime: 创建时间
en-US:
	title: Header Group
	product: Product
	productName: Product Name
	productInfo: Product Info
	type: Type
	supplier: Supplier
	company: Company
	phone: Phone
	stock: Stock
	createdTime: Created Time
---

```jsx
import { Grid } from 'zent';

const datasets = [];

for (let i = 0; i < 19; i++) {
	datasets.push({
		id: `id-${i}`,
		name: `{i18n.product} ${i}`,
		type: `type-${i}`,
		company: `company-${i}`,
		phone: `123342345${i}`,
		stock: 5,
		createdTime: '2018-12-11'
	});
}

class HeaderGroup extends React.Component {
	state = {
		datasets
	}

	getColumns = () => {
		return [
			{
				title: '{i18n.productName}',
				name: 'name',
				className: 'name',
				width: 100,
				fixed: true,
			},
			{
				title: '{i18n.productInfo}',
				name: 'productInfo',
				children: [
					{
						title: '{i18n.type}',
						name: 'type',
						width: 200,
					},
					{
						title: '{i18n.supplier}',
						name: 'supplier',
						children: [
							{
								title: '{i18n.company}',
								name: 'company',
								width: 300,
							},
							{
								title: '{i18n.phone}',
								name: 'phone',
								width: 300,
							},
						]
					},
				],
			},
			{
				title: '{i18n.stock}',
				name: 'stock',
				defaultText: 0,
			},
			{
				title: '{i18n.createdTime}',
				name: 'createdTime',
				width: 100,
				needSort: true,
				fixed: 'right',
			}
		];
	}

	onChange = conf => {
    console.log(conf, 'conf');
    this.setState({
      ...conf
    });
  };

	render() {
		const { sortBy, sortType } = this.state;
		return (
			<Grid
				columns={this.getColumns()}
				datasets={this.state.datasets}
				rowClassName={(data, index) => `${data.id}-${index}`}
				bordered
				scroll={{ x: 1400, y: 400 }}
				sortBy={sortBy}
				sortType={sortType}
				rowKey="id"
				onChange={this.onChange}
			/>
		);
	}
};

ReactDOM.render(
		<HeaderGroup />
	, mountNode
);
```
