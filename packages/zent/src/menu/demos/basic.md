---
order: 1
zh-CN:
	title: 基础用法
	foodCategory: 食品分类
	clothCategory: 服装分类
en-US:
	title: Basic Usage
	foodCategory: Food
	clothCategory: Clothing
---

```jsx
import { Menu } from 'zent';
const { MenuItem } = Menu;

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
		</Menu>
	)
}

ReactDOM.render(<Example />, mountNode);
```
