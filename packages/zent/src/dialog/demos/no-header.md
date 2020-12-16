---
order: 4
zh-CN:
	title: 无头部
	show: 显示
	content: 对话框内容
	close: 关闭
en-US:
	title: No Header
	show: Show Dialog
	content: content
	close: Close
---

```js
import { Dialog, Button } from 'zent';

class Example extends React.Component {
	state = { visible: false };

	setVisible = visible => {
		this.setState({ visible });
	};

	render() {
		return (
			<div>
				<Button type="primary" onClick={() => this.setVisible(true)}>
					{i18n.show}
				</Button>
				<Dialog
					visible={this.state.visible}
					onClose={() => this.setVisible(false)}
				>
					<p>{i18n.content}</p>
				</Dialog>
			</div>
		);
	}
}

ReactDOM.render(<Example />, mountNode);
```
