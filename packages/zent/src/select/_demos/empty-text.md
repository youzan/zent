---
order: 12
zh-CN:
	title: 自定义搜索无匹配文案
en-US:
	title: Custom No Match Text
---

```js
import { Select } from 'zent';

const data = [
  {value: 1, text: 'Option 1'},
	{value: 2, text: 'Option 2'},
  {value: 3, text: 'Option 3'}
];

ReactDOM.render(
  <Select
		data={data}
    emptyText="No Result"
    filter={(item, keyword) => item.text.indexOf(keyword) > -1}
	/>,
	mountNode
);
```
