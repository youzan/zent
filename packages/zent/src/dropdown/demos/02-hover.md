---
order: 2
zh-CN:
	title: 鼠标移入打开菜单
	hover: Hover打开菜单
	food: 食品分类
	clothing: 服装分类
en-US:
	title: Hover to open
	hover: Hover
	food: Food
	clothing: Clothing
---

```js
import {
	Menu,
	Dropdown,
	DropdownHoverTrigger,
	DropdownContent,
	DropdownButton,
	DropdownPosition,
} from 'zent';

const { MenuItem } = Menu;

ReactDOM.render(
	<Dropdown position={DropdownPosition.AutoBottomLeft}>
		<DropdownHoverTrigger>
			<DropdownButton type="primary">{i18n.hover}</DropdownButton>
		</DropdownHoverTrigger>
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
