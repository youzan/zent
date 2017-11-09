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
import { Popover, Menu, Button } from 'zent';

const { MenuItem } = Menu;

ReactDOM.render(
	<Popover 
		position={Popover.Position.AutoBottomLeft} 
		display="inline"
		cushion={5}>
		<Popover.Trigger.Click>
			<Button type="primary">{i18n.click}</Button>
		</Popover.Trigger.Click>
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
