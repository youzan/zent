## 菜单 Menu

菜单组件

### 使用指南

- 组合使用 Menu 组件与 Menu 组件的内部对象 MenuItem、SubMenu 构成一个完整菜单.
- 菜单组件使用统一代理的点击事件回调函数, 其参数为 event 和 key(实际上是节点的 index 属性值).
- 当 MenuItem 不设置 `key` 属性时的会按顺序和层级自动生成节点的唯一标识(从0开始)并保存在 `index` 属性上, 作为 `onClick` 函数的第二个参数, 其格式为 `'item_*[_*_..]'`. 如果手动设置了 `key` 属性则会被复制到 `index` 属性, 覆盖自动生成的标识.
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

  **建议在Menu不复杂的情况下手动为 MenuItem 设置格式合理的 `key` 属性.**

### 代码示例

:::demo 简单应用
```js
import { Menu } from 'zent';
const { MenuItem, SubMenu } = Menu;
const clickHandler = function(event, key) {
	console.log(event, key);
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
const clickHandler = function(event, key) {
	console.log(event, key);
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
| onClick | 点击事件统一代理回调 | func(e:event, key: string) |  |
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
