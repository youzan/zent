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

const data = new Array(20)
	.fill()
	.map((_, index) => ({ option: index, text: `option${index}` }));

const leftColumns = [
	{
		name: 'text',
		title: 'left',
	},
];

const rightColumns = [
	{
		name: 'text',
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
.grid-transfer .zent-grid-thead .zent-grid-tr {
	height: 36px;
}
</style>
