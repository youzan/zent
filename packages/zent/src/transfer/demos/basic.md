---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic usage
---

```js
import { useState, useCallback } from 'react';
import { Transfer } from 'zent';

const data = new Array(20)
	.fill()
	.map((_, index) => ({ option: index, text: `option${index}` }));

const columns = [
	{
		name: 'text',
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
			columns={columns}
			datasets={datasets}
			targetKeys={targetKeys}
			onChange={transferData}
		/>
	</div>,
	mountNode
);
```
