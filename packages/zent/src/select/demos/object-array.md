---
order: 5
zh-CN:
	title: 对象数组
	pla: 请选择
en-US:
	title: Object Array
	pla: Select an option
---

```js
import { Select } from 'zent';

const data = [
  {value: 0, text: 'Option 1'},
  {value: 2, text: 'Option 2'},
  {value: 3, text: 'Option 3'}
];

ReactDOM.render(
  <Select placeholder="{i18n.pla}" data={data} />
  , mountNode
);
```
