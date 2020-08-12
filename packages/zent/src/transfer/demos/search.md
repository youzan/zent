---
order: 2
zh-CN:
	title: 搜索
en-US:
	title: Search
---

```js
import { useState, useCallback } from 'react';
import { Transfer } from 'zent';

const data = new Array(20)
	.fill()
	.map((_, index) => ({ option: String(index), text: `option${index}`, disabled: index % 2 === 1 }));

const columns = [
	{
		name: 'text',
	},
];

const [targetKeys, setTargetKeys] = useState([]);

ReactDOM.render(
	<div>
		<Transfer
			keyName="option"
			dataSource={data}
			targetKeys={targetKeys}
			onChange={({ targetKeys }) => setTargetKeys(targetKeys)}
			showSearch
			filterOption={(inputValue, { text }) => text.indexOf(inputValue) > -1}
			list={{ columns }}
		/>
	</div>,
	mountNode
);
```
