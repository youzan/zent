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

const data = new Array(200).fill().map((_, index) => ({
	option: String(index),
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

const [targetKeys, setTargetKeys] = useState([]);

ReactDOM.render(
	<div>
		<Transfer
			keyName="option"
			className="grid-transfer"
			dataSource={data}
			targetKeys={targetKeys}
			onChange={({ targetKeys }) => setTargetKeys(targetKeys)}
			pagination
			list={[
				{
					columns: leftColumns, scroll: { y: 198 }
				},
				{ 
					columns: rightColumns, scroll: { y: 198 }
				},
			]}
		/>
	</div>,
	mountNode
);
```

<style>
.grid-transfer .zent-transfer__item:first-child {
	width: 400px;
}
.grid-transfer .zent-grid-thead .zent-grid-tr {
	height: 36px;
}
</style>
