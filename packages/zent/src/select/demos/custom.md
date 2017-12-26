---
order: 5
zh-CN:
	title: 支持自定义选项字段
en-US:
	title: Custom Key
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
	/>,
	mountNode
);
```
