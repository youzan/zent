---
order: 11
zh-CN:
	title: 自定义搜索框文案
	pla: 请选择
en-US:
	title: Custom Search Text
	pla: Select an option
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
		placeholder="{i18n.pla}"
    data={data}
    optionValue="id"
    optionText="name"
    searchPlaceholder="Search"
    filter={(item, keyword) => item.name.indexOf(keyword) > -1}
	/>,
	mountNode
);
```
