---
order: 2
zh-CN:
	title: 外部控制打开／关闭
	click: 点击打开
	msg1: Popover 弹层内容
	msg2: 可以添加任意内容
	close: 关闭
en-US:
	title: Controlled open/close
	click: Click to Open
	msg1: Popover content
	msg2: You can add anything here
	close: Close
---

```jsx
import { Popover, Button } from 'zent';

class PopoverDemo extends Component {
	state = {
		visible: false
	};

	render() {
		return (
			<div className="zent-doc-popover-container">
				<Popover
					className="zent-doc-popover"
					visible={this.state.visible} 
					onVisibleChange={v => this.setState({ visible: v })}
					position={Popover.Position.BottomLeft} 
					display="inline"
					cushion={5}>
					<Popover.Trigger.Base>
						<Button type="primary" onClick={() => this.setState({ visible: true })}>{i18n.click}</Button>
					</Popover.Trigger.Base>
					<Popover.Content>
						<div>{i18n.msg1}</div>
						<div>{i18n.msg2}</div>
					</Popover.Content>
				</Popover>

				<Button onClick={() => this.setState({ visible: false })}>{i18n.close}</Button>
			</div>
		);
	}
}

ReactDOM.render(
	<PopoverDemo />
	, mountNode
);
```
