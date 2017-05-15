## Menu 菜单

菜单，为页面提供导航的菜单

### 代码演示

:::demo 基础用法
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
			<MenuItem key="1-1" className="food">食品分类</MenuItem>
			<MenuItem key="1-2" disabled>服装分类</MenuItem>
		</Menu>
	)
}

ReactDOM.render(<Example />, mountNode);
```
:::


:::demo 二级菜单
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

:::demo 多级嵌套
```jsx
import { Menu } from 'zent';

const { MenuItem, SubMenu } = Menu;
const clickHandler = function(event, key) {
	console.log(event, key);
};

ReactDOM.render(
	<div className="zent-menu-simple-wrapper">
		<Menu className="simple" onClick={clickHandler}>
			<MenuItem>广东</MenuItem>
			<SubMenu title="江苏">
				<MenuItem>苏州</MenuItem>
				<MenuItem>无锡</MenuItem>
				<MenuItem>常州</MenuItem>
				<MenuItem>镇江</MenuItem>
				<SubMenu title="南京">
					<MenuItem>江宁区</MenuItem>
					<MenuItem>仙林区</MenuItem>
				</SubMenu>
			</SubMenu>
			<MenuItem>山东</MenuItem>
			<SubMenu title="浙江">
				<SubMenu title="杭州">
					<MenuItem>西湖区</MenuItem>
					<MenuItem>上城区</MenuItem>
				</SubMenu>
				<MenuItem>温州</MenuItem>
				<MenuItem>绍兴</MenuItem>
				<MenuItem>嘉兴</MenuItem>
			</SubMenu>
		</Menu>
	</div>
    , mountNode
);
```
:::


### API

#### Menu

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| onClick | 点击菜单节点回调 | func |  |
| className | 节点类名 | string |  |
| prefix | 自定义前缀 | string | 'zent' |


#### MenuItem

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | item 的唯一标志 | string | 内部生成的唯一ID |
| disabled | 是否禁用当前菜单项 | bool |  |
| className | 节点自定义类名 | string |  |
| prefix | 节点自定义前缀 | string | 'zent' |


#### SubMenu

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 子菜单项显示值 | string |  |
| disabled | 是否禁用当前子菜单 | bool |  |
| overlayClassName | 弹出菜单的自定义类名 | string |  |
| className | 子菜单项自定义类名 | string |  |
| prefix | 子菜单项自定义前缀 | string | 'zent' |


### FAQ

- 菜单组件使用统一代理的点击事件回调函数, 其参数为 event 和 key(实际上是节点的 index 属性值)。
- 当 MenuItem 不设置 `key` 属性时的会按顺序和层级自动生成节点的唯一标识(从0开始)并保存在 `index` 属性上, 作为 `onClick` 函数的第二个参数。
  如果手动设置了 `key` 属性则会被复制到 `index` 属性, 覆盖自动生成的标识。建议在Menu不复杂的情况下手动为 MenuItem 设置格式合理的 `key` 属性。
  
  ```
	<Menu>
		<MenuItem>   -------- 'item_0'
		<SubMenu>
			<MenuItem> -------- 'item_1_0'
			<MenuItem> -------- 'item_1_1'
		</SubMenu>
		<MenuItem>   -------- 'item_2'
	</Menu>
	```