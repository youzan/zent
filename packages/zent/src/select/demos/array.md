---
order: 4
zh-CN:
	title: 字符串数组
	pla: 请选择
en-US:
	title: String Array
	pla: Select an option
---

```js
import { Select } from 'zent';

const data = ['Option 1', 'Option 2', 'Option 3'];

ReactDOM.render(
	<Select placeholder="{i18n.pla}" data={data} />,
	mountNode
);
```
