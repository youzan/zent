---
order: 1
zh-CN:
	title: 基础用法
	show: 显示
	content: 对话窗内容区域对话窗内容区域对话窗内容区域对话窗内容区域对话窗内容区域对话窗内容区域。
	title1: 提示
	ok: 确定
	close: 关闭
en-US:
	title: Basic Usage
	show: Show Dialog
	content: content content content content content content content content content 
	title1: prompt
	ok: Ok
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
					className="zent-dialog-demo-basic-dialog"
					visible={this.state.visible}
					onClose={() => this.setVisible(false)}
					footer={
						<>
							<Button onClick={() => this.setVisible(false)}>
								{i18n.close}
							</Button>
							<Button type="primary" onClick={() => this.setVisible(false)}>
								{i18n.ok}
							</Button>
						</>
					}
					title="{i18n.title1}"
				>
					<p>{i18n.content}</p>
				</Dialog>
			</div>
		);
	}
}

ReactDOM.render(<Example />, mountNode);
```

<style>
	.zent-dialog-demo-basic-dialog {
		width: 500px;
	}
</style>
