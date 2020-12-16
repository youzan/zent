---
order: 5
zh-CN:
	title: 仅内容
	show: 显示
	content: 对话框内容
	close: 关闭
en-US:
	title: Content Only
	show: Show Dialog
	content: content
	close: Close
---

```js
import { Dialog, Button } from 'zent';

const ID = 'zent-demo-dialog-no-header';

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
					closeBtn={false}
				>
					<p>{i18n.content}</p>
				</Dialog>
			</div>
		);
	}
}

ReactDOM.render(<Example />, mountNode);
```
