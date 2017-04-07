## 下拉选单 Dropdown

下拉菜单组件, 对 Popover 的简单封装.

### 使用指南

- 通过 Dropdown.Content 与 Dropdown.Trigger 两个内部组件声明结构.
- 支持 click 和 hover 两种触发方式.

### 代码演示

:::demo 基础用法
```js
import { Dropdown, Menu, Button } from 'zent';

const { MenuItem } = Menu;
const { Content, Trigger } = Dropdown;

const Simple = () => {
	return (
		<div className="demo-simple">
			<Dropdown>
				<Trigger>
					<a>Hover Me</a>
				</Trigger>
				<Content>
					<Menu>
						<MenuItem>1st.</MenuItem>
						<MenuItem>2nd.</MenuItem>
						<MenuItem>3rd.</MenuItem>
					</Menu>
				</Content>
			</Dropdown>
			<Dropdown trigger="click">
				<Trigger>
					<Button>Click Here</Button>
				</Trigger>
				<Content>
					<Menu>
						<MenuItem>1st.</MenuItem>
						<MenuItem>2nd.</MenuItem>
						<MenuItem>3rd.</MenuItem>
					</Menu>
				</Content>
			</Dropdown>
		</div>
	)
};

ReactDOM.render(<Simple />, mountNode);
```
:::

:::demo 多级菜单
```js
import { Dropdown, Menu } from 'zent';

const { MenuItem, SubMenu } = Menu;
const { Content, Trigger } = Dropdown;

const clickHandler = (e, key) => {
	console.log(e, key);
};

ReactDOM.render(
	<Dropdown>
		<Trigger>
			<a>Hover</a>
		</Trigger>
		<Content>
			<Menu>
				<MenuItem>0</MenuItem>
				<SubMenu title="1">
					<MenuItem>1-0</MemuItem>
					<MenuItem>1-1</MemuItem>
					<MenuItem>1-2</MemuItem>
				</SubMenu>
				<MenuItem>2</MenuItem>
			</Menu>
		</Content>
	</Dropdown>
	, mountNode);

```
:::

### API

#### Dropdown

| 参数        | 说明            | 类型     | 默认值        | 备选值                               |
| --------- | ------------- | ------ | ---------- | --------------------------------- |
| trigger    | 触发模式    | string | `'hover'`   |          `'click'`                      |
| position    | 弹出位置    | string | `'right-top'`   |  支持12种定位方式, 参见 zent-pop           |
| visible    | 菜单显示开关    | boolean | `false`   |                                   |
| onVisibleChange | 显示状态变化回调 | func(visible: bool)|    |                      |
| className | 自定义额外类名  | string | `''`       |                                   |
| prefix    | 自定义类名前缀    | string | `'zent'`   |                                   |

#### Dropdown.Content

| 参数        | 说明            | 类型     | 默认值        |
| prefix    | 自定义类名前缀    | string | `'zent'`   |
