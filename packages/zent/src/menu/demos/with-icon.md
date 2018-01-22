---
order: 3
zh-CN:
	title: 带有图标
	eleCategory: 电器分类
	makeupCategory: 美妆分类
	tv: 电视机
	laptop: 笔记本
	washingMachine: 洗衣机
	eyeShadow: 眼影
	cleanser: 洗面奶
en-US:
	title: WithIcon
	eleCategory: Electrical
	makeupCategory: Makeup
	tv: TV
	laptop: Laptop
	washingMachine: Washing
	eyeShadow: Eye Shadow
	cleanser: Cleanser
---

```jsx
import { Menu, Icon } from 'zent';
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
			<SubMenu title={<span><Icon type="youzan" />{i18n.eleCategory}</span>} overlayClassName="sub">
				<MenuItem key="2-1" className="tv">{i18n.tv}</MenuItem>
				<MenuItem key="2-2" disabled>{i18n.laptop}</MenuItem>
				<MenuItem key="2-3">{i18n.washingMachine}</MenuItem>
			</SubMenu>
			<SubMenu title={<span><Icon type="settings" />{i18n.makeupCategory}</span>}>
				<MenuItem key="3-1">{i18n.eyeShadow}</MenuItem>
				<MenuItem key="3-2">{i18n.cleanser}</MenuItem>
			</SubMenu>
		</Menu>
	)
}

ReactDOM.render(<Example />, mountNode);
```
