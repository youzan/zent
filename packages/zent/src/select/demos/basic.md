---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```js
import { Select } from 'zent';

const Option = Select.Option;

ReactDOM.render(
  <Select>
    <Option value="1">Option 1</Option>
    <Option value="2">Option 2</Option>
    <Option value="3">Option 3</Option>
	</Select>,
	mountNode
);
```
