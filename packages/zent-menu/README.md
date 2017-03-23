## Menu 菜单

菜单，为页面提供导航的菜单

### 代码演示

:::demo 基础用法
```js
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
			<MenuItem key="1-1" className="food">食品分类</MenuItem>
			<MenuItem key="1-2" disabled>服装分类</MenuItem>
		</Menu>
	)
}

ReactDOM.render(<Example />, mountNode);
```
:::


:::demo 二级菜单
```js
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
			<MenuItem key="1-1" className="food">食品分类</MenuItem>
			<MenuItem key="1-2" disabled>服装分类</MenuItem>
			<SubMenu title={"电器分类"} overlayClassName="sub">
				<MenuItem key="2-1" className="tv">电视机</MenuItem>
				<MenuItem key="2-2" disabled>笔记本</MenuItem>
				<MenuItem key="2-3">洗衣机</MenuItem>
			</SubMenu>
			<SubMenu title={"美妆分类"} disabled>
				<MenuItem key="3-1">眼影</MenuItem>
				<MenuItem key="3-2">洗面奶</MenuItem>
			</SubMenu>
		</Menu>
	)
}

ReactDOM.render(<Example />, mountNode);
```
:::



### API

#### Menu props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| prefix | 自定义前缀 | string | 'zent' |
| onClick | 点击菜单节点回调 | func |  |
| className | 节点类名 | string |  |

#### MenuItem props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | item 的唯一标志 | string |  |
| disabled | 是否禁用当前菜单项 | bool |  |
| className | 节点类名 | string |  |  |


#### SubMenu props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 子菜单项值 | string |  |
| disabled | 是否禁用当前菜单项 | bool |  |
| overlayClassName | 包裹的节点类名 | string |  |
| className | 节点类名 | string |  |  |


