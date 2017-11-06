---
order: 2
zh-CN:
	title: 二级菜单
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
	title: Submenu
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
			onClick={onClick}
			className="hello"
		>
			<MenuItem key="1-1" className="food">{i18n.foodCategory}</MenuItem>
			<MenuItem key="1-2" disabled>{i18n.clothCategory}</MenuItem>
			<SubMenu title={"{i18n.eleCategory}"} overlayClassName="sub">
				<MenuItem key="2-1" className="tv">{i18n.tv}</MenuItem>
				<MenuItem key="2-2" disabled>{i18n.laptop}</MenuItem>
				<MenuItem key="2-3">{i18n.washingMachine}</MenuItem>
			</SubMenu>
			<SubMenu title={"{i18n.makeupCategory}"} disabled>
				<MenuItem key="3-1">{i18n.eyeShadow}</MenuItem>
				<MenuItem key="3-2">{i18n.cleanser}</MenuItem>
			</SubMenu>
		</Menu>
	)
}

ReactDOM.render(<Example />, mountNode);
```
