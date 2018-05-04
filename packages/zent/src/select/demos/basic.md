---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```js
import { Select } from 'zent';

const Option = Select.NewOption;

ReactDOM.render(
	<Select mode="tags">
		<Option key="1" value="1111">1111</Option>
		<Option key="2" value="2222">2222</Option>
	</Select>,
	mountNode
);
```
