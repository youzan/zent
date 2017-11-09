---
order: 10
zh-CN:
	title: 支持有过滤函数时设置最大显示数量
	pla: 请选择
en-US:
	title: Max to Show with Filter
	pla: Select an option
---

```js
import { Select } from 'zent';

const Option = Select.Option;
const cycle = (num) => {
	const result = [];
	for (let i = 1; i <= num; i ++) {
		result.push({
			value: String(i),
			text: `Option ${i}`
		});
	}
	return result;
}
const data = cycle(100);

ReactDOM.render(
	<Select
		placeholder="{i18n.pla}"
		data={data}
		filter={(item, keyword) => item.text.indexOf(keyword) > -1}
		maxToShow={6} />
  , mountNode
);
```
