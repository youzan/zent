---
order: 3
zh-CN:
	title: 嵌套
	click: 点击打开
	msg1: Popover 弹层内容
	msg2: 嵌套弹层内容
en-US:
	title: Nested
	click: Click to Open
	msg1: Popover content
	msg2: Nested popover content
---

```jsx
import { Popover, Button } from 'zent';

class Demo extends React.Component {
	state = {
		visible: true,
	};

	onVisibleChange = visible => {
		this.setState({
			visible,
		});
	};

	render() {
		return (
			<Popover
				className="zent-doc-popover"
				position={Popover.Position.BottomLeft}
				display="inline"
				cushion={5}
			>
				<Popover.Trigger.Click>
					<Button type="primary">{i18n.click}</Button>
				</Popover.Trigger.Click>
				<Popover.Content>
					<div>{i18n.msg1}</div>
					<Popover
						className="zent-doc-popover"
						position={Popover.Position.BottomLeft}
						display="inline"
						cushion={5}
						visible={this.state.visible}
						onVisibleChange={this.onVisibleChange}
					>
						<Popover.Trigger.Click>
							<Button type="primary">{i18n.click}</Button>
						</Popover.Trigger.Click>
						<Popover.Content>
							<div>{i18n.msg2}</div>
						</Popover.Content>
					</Popover>
				</Popover.Content>
			</Popover>
		);
	}
}

ReactDOM.render(<Demo />, mountNode);
```
