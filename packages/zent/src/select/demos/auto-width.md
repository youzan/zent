---
order: 8
zh-CN:
	title: 支持自动调整弹出层的宽度
en-US:
	title: Auto Width
---

```js
import { Select } from 'zent';

const Option = Select.Option;

ReactDOM.render(
	<Select
		autoWidth
		open
		className="zent-select--auto-width"
	>
    <Option value="1">Option 1</Option>
    <Option value="2">Option 2</Option>
    <Option value="3">Option 3</Option>
	</Select>,
	mountNode
);
```

<style>
.zent-select--auto-width {
	width: 300px;
}
</style>
