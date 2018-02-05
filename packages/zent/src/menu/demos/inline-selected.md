---
order: 5
zh-CN:
	title: 行内模式默认选中
	foodCategory: 食品分类
	clothCategory: 服装分类
	eleCategory: 电器分类
	makeupCategory: 美妆分类
	tv: 电视机
	laptop: 笔记本
	washingMachine: 洗衣机
	eyeShadow: 眼影
	cleanser: 洗面奶
en-US:
	title: Inline with selected key
	foodCategory: Food
	clothCategory: Clothing
	eleCategory: Electrical
	makeupCategory: Makeup
	tv: TV
	laptop: Laptop
	washingMachine: Washing
	eyeShadow: Eye Shadow
	cleanser: Cleanser
---

```jsx
import { Menu } from 'zent';
const { MenuItem, SubMenu } = Menu;

const onClick = (e, key) => {
	console.log(e, key);
}

const Example = () => {
	return (
		<Menu
			mode="inline"
			defaultSelectedKey="1-2"
			defaultExpandKeys={["1-4", "1-4-3"]}
			onClick={onClick}
		>
			<MenuItem key="1-1">
				{i18n.foodCategory}
			</MenuItem>
			<MenuItem key="1-2">
				{i18n.clothCategory}
			</MenuItem>
			<SubMenu title={<span><Icon type="youzan" />{i18n.eleCategory}</span>} key="1-3">
				<MenuItem key="1-3-1">{i18n.tv}</MenuItem>
				<MenuItem key="1-3-2">{i18n.laptop}</MenuItem>
				<MenuItem key="1-3-3">{i18n.washingMachine}</MenuItem>
			</SubMenu>
			<SubMenu title={"{i18n.makeupCategory}"} key="1-4">
				<MenuItem key="1-4-1">{i18n.eyeShadow}</MenuItem>
				<MenuItem key="1-4-2">{i18n.cleanser}</MenuItem>
				<SubMenu key="1-4-3" title={"{i18n.foodCategory}"}>
					<MenuItem key="1-4-3-1">{i18n.tv}</MenuItem>
					<MenuItem key="1-4-3-2">{i18n.laptop}</MenuItem>
					<MenuItem key="1-4-3-3">{i18n.washingMachine}</MenuItem>
				</SubMenu>
			</SubMenu>
		</Menu>
	)
}

ReactDOM.render(<Example />, mountNode);
```
