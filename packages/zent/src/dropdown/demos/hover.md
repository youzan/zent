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
import { Popover, Menu, Button } from 'zent';

const { MenuItem } = Menu;

ReactDOM.render(
	<Popover 
		position={Popover.Position.AutoBottomLeft} 
		display="inline"
		cushion={5}>
		<Popover.Trigger.Hover>
			<Button type="primary">{i18n.hover}</Button>
		</Popover.Trigger.Hover>
		<Popover.Content>
			<Menu>
				<MenuItem>{i18n.food}</MenuItem>
				<MenuItem>{i18n.clothing}</MenuItem>
			</Menu>
		</Popover.Content>
	</Popover>
	, mountNode
);
```
