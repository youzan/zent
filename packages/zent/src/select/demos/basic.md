---
order: 1
zh-CN:
	title: 基础用法
	pla: 请选择
en-US:
	title: Basic Usage
	pla: Select an option...
---

```js
import { Select } from 'zent';

const Option = Select.Option;

ReactDOM.render(
  <Select placeholder="{i18n.pla}">
    <Option value="1">Option 1</Option>
    <Option value="2">Option 2</Option>
    <Option value="3">Option 3</Option>
	</Select>,
	mountNode
);
```
