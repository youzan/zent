---
order: 1
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
import {
	Dropdown,
	Menu,
	DropdownButton,
	DropdownPosition,
	DropdownClickTrigger,
	DropdownContent,
} from 'zent';

const { MenuItem } = Menu;

ReactDOM.render(
	<Dropdown position={DropdownPosition.AutoBottomLeft}>
		<DropdownClickTrigger>
			<DropdownButton type="primary">{i18n.click}</DropdownButton>
		</DropdownClickTrigger>
		<DropdownContent>
			<Menu>
				<MenuItem>{i18n.food}</MenuItem>
				<MenuItem>{i18n.clothing}</MenuItem>
			</Menu>
		</DropdownContent>
	</Dropdown>,
	mountNode
);
```
