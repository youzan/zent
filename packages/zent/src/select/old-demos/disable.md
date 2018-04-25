---
order: 7
zh-CN:
	title: 禁用状态
en-US:
	title: Disabled
---

```js
import { Select } from 'zent';

const data = [
	{id: 1, name: 'Option 1'},
	{id: 2, name: 'Option 2'},
	{id: 3, name: 'Option 3'}
];

ReactDOM.render(
	<Select
    data={data}
    optionValue="id"
    optionText="name"
    disabled
  />
  , mountNode
);
```
