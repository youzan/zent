---
order: 9
zh-CN:
	title: 支持选项过滤
en-US:
	title: With Option Filter
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
    onEmptySelected={(data) => console.log(data)}
    filter={(item, keyword) => item.name.indexOf(keyword) > -1}
	/>,
	mountNode
);
```
