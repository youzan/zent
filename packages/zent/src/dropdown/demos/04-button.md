---
order: 4
zh-CN:
	title: 点击打开
	click: 点击打开菜单
	food: 食品分类
	clothing: 服装分类
en-US:
	title: Click to open
	click: Click
	food: Food
	clothing: Clothing
---

```js
import { DropdownButton, Checkbox } from 'zent';

function Demo() {
	const [active, setActive] = React.useState(false);
	const onChange = React.useCallback(evt => {
		setActive(evt.target.checked);
	}, []);
	return (
		<div>
			<DropdownButton type="primary" active={active}>
				{i18n.click}
			</DropdownButton>
			<Checkbox checked={active} onChange={onChange}>
				Active
			</Checkbox>
		</div>
	);
}

ReactDOM.render(<Demo />, mountNode);
```
