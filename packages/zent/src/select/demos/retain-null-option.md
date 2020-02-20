---
order: 14
zh-CN:
  title: 选择值为 null 的选项
en-US:
  title: Select option with null value
---

```js
import { Select } from 'zent';

const data = [{ text: 'Value is null', value: null }, 'Option 2', 'Option 3'];

function onChange(evt, item) {
	console.log(item.value);
}

ReactDOM.render(
	<Select retainNullOption data={data} onChange={onChange} />,
	mountNode
);
```
