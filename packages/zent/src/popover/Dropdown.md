## Dropdown 下拉菜单

向下弹出的弹层组件。

我们不提供单独的名为 `Dropdown` 的组件，`Dropdown` 组件的功能是 `Popover` 组件的一个子集，这个文档描述了如何使用 `Popover` 来实现 `Dropdown` 的功能。

### 使用场景

一般用于下拉菜单。

### 代码演示

:::demo 点击打开下拉菜单
```jsx
import { Popover, Menu, Button } from 'zent';

const { MenuItem } = Menu;

ReactDOM.render(
	<Popover 
		position={Popover.Position.AutoBottomLeft} 
		display="inline"
		cushion={5}>
		<Popover.Trigger.Click>
			<Button type="primary">点击打开菜单</Button>
		</Popover.Trigger.Click>
		<Popover.Content>
			<Menu>
				<MenuItem>食品分类</MenuItem>
				<MenuItem>服装分类</MenuItem>
			</Menu>
		</Popover.Content>
	</Popover>
	, mountNode
);
```
:::

:::demo 鼠标移入打开下拉菜单
```jsx
import { Popover, Menu, Button } from 'zent';

const { MenuItem } = Menu;

ReactDOM.render(
	<Popover 
		position={Popover.Position.AutoBottomLeft} 
		display="inline"
		cushion={5}>
		<Popover.Trigger.Hover>
			<Button type="primary">Hover打开菜单</Button>
		</Popover.Trigger.Hover>
		<Popover.Content>
			<Menu>
				<MenuItem>食品分类</MenuItem>
				<MenuItem>服装分类</MenuItem>
			</Menu>
		</Popover.Content>
	</Popover>
	, mountNode
);
```
:::

:::demo 点击菜单关闭
```jsx
import { Popover, Button, Menu } from 'zent';

const { MenuItem } = Menu;

class PopoverDemo extends Component {
	state = {
		visible: false
	};

	render() {
		return (
			<Popover
				visible={this.state.visible} 
				onVisibleChange={v => this.setState({ visible: v })}
				position={Popover.Position.AutoBottomLeft} 
				display="inline"
				cushion={5}>
				<Popover.Trigger.Click>
					<Button type="primary">点击打开菜单</Button>
				</Popover.Trigger.Click>
				<Popover.Content>
					<Menu onClick={() => this.setState({ visible: false })}>
						<MenuItem>点击关闭菜单</MenuItem>
						<MenuItem>点击关闭菜单</MenuItem>
					</Menu>
				</Popover.Content>
			</Popover>
		);
	}
}

ReactDOM.render(
	<PopoverDemo />
	, mountNode
);
```
:::

### API

请参考 [`Popover` 的 API 文档](popover#api)。

### 关于下拉菜单弹出位置

建议使用 `Popover` 提供的 `AutoXxxYxx` 定位方式，例如 `AutoBottomLeft` 默认定位在左下角，但是如果超出屏幕的话会自动调整位置。

可选的定位方式请阅读 [`Popover` 的定位文档](popover#position%20api)。

