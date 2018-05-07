---
order: 2
zh-CN:
	title: 多选标签
en-US:
	title: Tags Mode
---

```js
import { Select } from 'zent';

const Option = Select.NewOption;

ReactDOM.render(
	<Select mode="tags" placeholder="请选择">
		<Option key="0" value="0000" disabled>010101</Option>
		<Option key="1" value="3333">1111</Option>
		<Option key="2" value="2222">2222</Option>
		<Option key="3" value="4444" disabled>2233322</Option>
		<Option key="4" value="5555">444444</Option>
		<Option key="5" value="6666">444444</Option>
		<Option key="6" value="7777">444444</Option>
		<Option key="7" value="8888" disabled>444444</Option>
	</Select>,
	mountNode
);
```
