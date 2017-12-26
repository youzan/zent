---
order: 3
zh-CN:
	title: 点击关闭菜单
	open: 点击打开菜单
	close: 点击关闭菜单
en-US:
	title: Click to close
	open: Click
	close: Close menu
---

```js
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
					<Button type="primary">{i18n.open}</Button>
				</Popover.Trigger.Click>
				<Popover.Content>
					<Menu onClick={() => this.setState({ visible: false })}>
						<MenuItem>{i18n.close}</MenuItem>
						<MenuItem>{i18n.close}</MenuItem>
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
