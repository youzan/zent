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
}));

const columns = [
	{
		name: 'text',
	},
];

const [targetKeys, setTargetKeys] = useState(['5', '9', '10', '15']);
const [checked, setChecked] = useState(false);
const Wrap = checked ? Disabled : React.Fragment;

ReactDOM.render(
	<div>
		<Wrap>
			<Transfer
				keyName="option"
				dataSource={data}
				targetKeys={targetKeys}
				onChange={({ targetKeys }) => setTargetKeys(targetKeys)}
				list={{ columns }}
			/>
		</Wrap>
		<div style={{ marginTop: '20px' }}>
			<Switch checked={checked} onChange={() => setChecked(!checked)} />
			disabled
		</div>
	</div>,
	mountNode
);
```
