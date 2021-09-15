---
order: 19
zh-CN:
	title: 表格内编辑
	product: 商品
	productName: 商品名
	uv: 访问量
	price: 价格
	sold: 销量
	createdTime: 创建时间
	batchUpdate: 批量修改价格
en-US:
	title: Editable cell
	product: Product
	productName: Product Name
	uv: UV
	price: Price
	sold: Sold
	createdTime: Created Time
	batchUpdate: Batch Update Prices
---

```jsx
import { Grid, NumberInput, Button } from 'zent';
import { useCallback, useState, useMemo } from 'react';

function App() {
	const [datasets, setDatasets] = useState(() => {
		const datasets = [];

		for (let i = 0; i < 3; i++) {
			datasets.push({
				id: i,
				name: `{i18n.product} ${i}`,
				uv: 20,
				price: 5,
				sold_num: 5,
				created_time: '2017-09-20',
			});
		}
		return datasets;
	});

	const onPriceChange = useCallback(
		rowIndex => val => {
			setDatasets(prev => {
				return prev.map((row, idx) => {
					if (idx === rowIndex) {
						return {
							...row,
							price: val,
						};
					}

					return row;
				});
			});
		},
		[]
	);

	const onBatchChange = useCallback(() => {
		setDatasets(prev => {
			return prev.map(row => {
				return {
					...row,
					price: 1242,
				};
			});
		});
	}, []);

	const columns = useMemo(() => {
		return [
			{
				title: '{i18n.productName}',
				name: 'name',
				width: 100,
				fixed: true,
			},
			{
				title: '{i18n.uv}',
				name: 'uv',
				width: 100,
				fixed: true,
			},
			{
				title: '{i18n.price}',
				name: 'price',
				bodyRender(data, { row }) {
					return (
						<NumberInput
							value={data.price}
							onChange={onPriceChange(row)}
							decimal={2}
							min={0.01}
							showStepper
						/>
					);
				},
			},
			{
				title: '{i18n.sold}',
				name: 'sold_num',
			},
			{
				title: '{i18n.createdTime}',
				name: 'created_time',
				width: 100,
				fixed: 'right',
			},
		];
	}, [onPriceChange]);

	return (
		<div>
			<Grid columns={columns} datasets={datasets} scroll={{ x: 1300 }} />
			<Button style={{ marginTop: 16 }} onClick={onBatchChange}>
				{i18n.batchUpdate}
			</Button>
		</div>
	);
}

ReactDOM.render(<App />, mountNode);
```
