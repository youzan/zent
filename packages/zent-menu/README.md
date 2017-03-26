## 菜单 Menu

菜单组件

### 使用指南

-  菜单组件在不进行外部定义的话会按顺序自动生成节点的唯一标识 key 并保存在 `index` 属性上. 其格式为 `'item_0'`, `'item_1_2'`等.
-  弹出菜单的触发方式目前仅支持 hover 一种, 并由组件内部 state 控制, 其控制原理为操作类名更改样式.
-  默认弹出菜单的样式为绝对定位, `left: 100%; top: 0`, 目前仅支持通过外部 CSS 文件进行复写修改.
-  菜单组件目前仅支持统一代理的回调点击事件, 不支持节点的 active 状态样式. 回调的默认参数为 key 和 event.

### 代码示例

:::demo 简单应用
```js
import { Menu } from 'zent';
const { MenuItem, SubMenu } = Menu;
const clickHandler = function(key, event) {
	console.log(key, event);
};
ReactDOM.render(
	<div className="zent-menu-simple-wrapper">
		<Menu className="simple" onClick={clickHandler}>
			<MenuItem className="food" key="choosen one, unique">食品</MenuItem>
			<MenuItem className="clothing" disabled>服装</MenuItem>
			<SubMenu className="electrical" title="电器" overlayClassName="electrical-sub">
				<MenuItem className="tv">电视机</MenuItem>
				<MenuItem className="refrigerator" disabled>电冰箱</MenuItem>
				<MenuItem className="washing-machine">洗衣机</MenuItem>
			</SubMenu>
			<MenuItem className="chemical">日化</MenuItem>
			<SubMenu className="makeup" title="美妆" overlayClassName="makeup-sub" disabled>
				<MenuItem className="eye-shadow">眼影</MenuItem>
			</SubMenu>
		</Menu>
	</div>
);
```
:::

:::demo 多级嵌套
```js
import { Menu } from 'zent';
const { MenuItem, SubMenu } = Menu;
const clickHandler = function(key, event) {
	console.log(key, event);
}
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
);
```
:::

### API

#### Menu

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| prefix | 自定义前缀 | string | 'zent' |
| onClick | 点击事件统一代理回调 | func(index, e) |  |
| className | 菜单整体自定义类名 | string |  |

#### MenuItem
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | item 的唯一标志 | string | `'item_*[_*_..]'` |
| disabled | 是否禁用当前菜单项 | bool |  |
| prefix | 节点自定义前缀 | string | 'zent' |
| className | 节点自定义类名 | string |  |


#### SubMenu
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| title | 子菜单项显示值 | string |  |
| disabled | 是否禁用当前子菜单 | bool |  |
| overlayClassName | 弹出菜单的自定义类名 | string |  |
| prefix | 子菜单项自定义前缀 | string | 'zent' |
| className | 子菜单项自定义类名 | string |  |
