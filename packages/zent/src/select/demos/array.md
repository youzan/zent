---
order: 4
zh-CN:
	title: 字符串数组带重置选项
en-US:
	title: String Array with reset option
---

```js
import { Select } from 'zent';

const data = ['Option 1', 'Option 2', 'Option 3'];

ReactDOM.render(
	<Select resetOption resetText="..." data={data} />,
	mountNode
);
```
