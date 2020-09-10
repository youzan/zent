---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic usage
---

```js
import { useState } from 'react';
import { Transfer, Switch, Disabled } from 'zent';

const data = new Array(20).fill().map((_, index) => ({
	option: String(index),
	text: `option${index}`,
	disabled: index % 2 === 1,
}));

const columns = [
	{
		name: 'text',
	},
];

const [targetKeys, setTargetKeys] = useState(['8', '9', '10', '15']);
const [selectedKeys, setSelectedKeys] = useState([]);
const [checked, setChecked] = useState(false);

ReactDOM.render(
	<div>
		<Transfer
			keyName="option"
			dataSource={data}
			targetKeys={targetKeys}
			onChange={({ targetKeys, selectedKeys }) => {
				setTargetKeys(targetKeys);
				setSelectedKeys(selectedKeys);
			}}
			list={{ columns }}
			selectedKeys={selectedKeys}
			onSelectChange={items => setSelectedKeys(items)}
			disabled={checked}
		/>
		<div style={{ marginTop: '20px' }}>
			<Switch checked={checked} onChange={() => setChecked(!checked)} />
			disabled
		</div>
	</div>,
	mountNode
);
```
