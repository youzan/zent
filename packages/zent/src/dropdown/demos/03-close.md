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
import {
	Dropdown,
	DropdownButton,
	DropdownClickTrigger,
	DropdownContent,
	DropdownPosition,
	Menu,
} from 'zent';

const { MenuItem } = Menu;

class PopoverDemo extends Component {
	state = {
		visible: false,
	};

	render() {
		return (
			<Dropdown
				visible={this.state.visible}
				onVisibleChange={v => this.setState({ visible: v })}
				position={DropdownPosition.AutoBottomLeft}
			>
				<DropdownClickTrigger>
					<DropdownButton type="primary">{i18n.open}</DropdownButton>
				</DropdownClickTrigger>
				<DropdownContent>
					<Menu onClick={() => this.setState({ visible: false })}>
						<MenuItem>{i18n.close}</MenuItem>
						<MenuItem>{i18n.close}</MenuItem>
					</Menu>
				</DropdownContent>
			</Dropdown>
		);
	}
}

ReactDOM.render(<PopoverDemo />, mountNode);
```
