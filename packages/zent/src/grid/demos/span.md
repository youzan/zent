---
order: 6
zh-CN:
	title: 合并单元格
	product: 商品
	productName: 商品名
	uv: 访问量
	stock: 库存
	subtitle: 副标题
en-US:
	title: colSpan & rowSpan
	product: Product
	productName: Product Name
	uv: uv
	stock: stock
	subtitle: subtitle
---

```jsx

import { Grid } from 'zent';

const columns = [
	{
		title: '{i18n.title}',
		name: 'name',
		colSpan: 2,
		width: '200px'
	}, {
		title: '{i18n.subtitle}',
		name: 'sub',
		colSpan: 0,
		width: '200px',
		bodyRender: (data, pos) => {
			return <span>{data.sub}</span>
		}
	}, {
		title: '{i18n.uv}',
		name: 'uv',
		bodyRender: (data, pos) => {
			const { row }  = pos;
			if (row % 2 === 0) {
				return {
					props: {
						rowSpan: 2
					},
					children: <span>{data.uv}</span>
				}
			}
			if (row % 2 !== 0) {
				return {
					props: {
						rowSpan: 0
					}
				}
			}
			return <span>{data.uv}</span>
		}
	}, {
		title: '{i18n.stock}',
		name: 'stock'
	}
];

const datasets = [];

for (let i = 0; i < 6; i++) {
	datasets.push({
		id: i,
		name: `{i18n.product} ${i}`,
		sub: `{i18n.subtitle} ${i}`,
		uv: 20,
		stock: 5
	})
}

class Span extends React.Component {
	render() {
		return (
			<Grid
				columns={columns}
				datasets={datasets}
			/>
		);
	}
};

ReactDOM.render(
		<Span />
	, mountNode
);

```
