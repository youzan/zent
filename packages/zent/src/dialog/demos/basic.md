---
order: 1
zh-CN:
	title: 基础用法
	show: 显示
	content: 对话框内容
	content1: 对话框其他内容
	title1: 对话框
en-US:
	title: Basic Usage
	show: Show Dialog
	content: content
	content1: other content
	title1: Dialog
---

```js
import { Dialog, Button } from 'zent';

class Example extends React.Component {
	state = { visible: false }

	triggerDialog = visible => {
		this.setState({ visible });
	};

	render() {
		return (
			<div>
				<Button
					type="primary"
					onClick={() => this.triggerDialog(true)}
				>
					{i18n.show}
				</Button>
				<Dialog
                    visible={this.state.visible}
                    onClose={() => this.triggerDialog(false)}
                    title="{i18n.title1}"
                >
                    <p>{i18n.content}</p>
                    <p>{i18n.content1}</p>
                </Dialog>
			</div>
		);
	}
}

ReactDOM.render(<Example />, mountNode);
```
