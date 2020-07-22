---
order: 3
zh-CN:
	title: 表格
en-US:
	title: Grid
---

```js
import { useState, useCallback } from 'react';
import { Transfer } from 'zent';

const data = new Array(20).fill().map((_, index) => ({
	option: index,
	text1: `Option${index}`,
	text2: `Product${index}`,
}));

const leftColumns = [
	{
		name: 'text1',
		title: 'left1',
	},
	{
		name: 'text2',
		title: 'left2',
	},
];

const rightColumns = [
	{
		name: 'text1',
		title: 'right',
	},
];

const [datasets, setDatasets] = useState(data);
const [targetKeys, setTargetKeys] = useState([]);
const transferData = useCallback(({ datasets, targetKeys }) => {
	setDatasets(datasets);
	setTargetKeys(targetKeys);
}, []);

ReactDOM.render(
	<div>
		<Transfer
			rowKey="option"
			columns={[leftColumns, rightColumns]}
			datasets={datasets}
			targetKeys={targetKeys}
			transferChange={transferData}
			scroll={{ y: 198, x: 0 }}
			className="grid-transfer"
		/>
	</div>,
	mountNode
);
```

<style>
.grid-transfer .zent-transfer__item {
	width: 400px;
}
.grid-transfer .zent-grid-thead .zent-grid-tr {
	height: 36px;
}
</style>
