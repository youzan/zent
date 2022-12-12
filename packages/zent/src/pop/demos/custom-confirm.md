---
order: 5
zh-CN:
	title: 自定义 Confirm 形式的气泡提示按钮
	content: Pop 打开了
	popHeader: Pop 标题
	popContent: 提示内容
	btnText: 打开气泡
	onlyConfirm: 只有确认
	onlyCancel: 只有取消
en-US:
	title: Custom confirm pop
	content: Pop opened
	popHeader: Pop title
	popContent: Pop content
	btnText: Open
	onlyConfirm: Only Confirm
	onlyCancel: Only Cancel
---

```jsx
import { Pop, Sweetalert, Button } from 'zent';

class Wrapper extends React.Component {
	actionHandler = () => {
		Sweetalert.alert({
			content: '{i18n.content}',
			parentComponent: this
		});
	}

	render() {
		return (
			<div>
				<Pop
					trigger="click"
					header="{i18n.popHeader}"
					content="{i18n.popContent}"
					type="primary"
					confirmText="Error"
					cancelText="Close"
					onConfirm={this.actionHandler}
				>
					<Button type="primary">{i18n.btnText}</Button>
				</Pop>				<Pop
					trigger="click"
					header="{i18n.popHeader}"
					content="{i18n.popContent}"
					type="primary"
					confirmText="Confirm"
					cancelText={null}
					onConfirm={this.actionHandler}
				>
					<Button type="primary">{i18n.onlyConfirm}</Button>
				</Pop>
				<Pop
					trigger="click"
					header="{i18n.popHeader}"
					content="{i18n.popContent}"
					type="primary"
					cancelText="Cancel"
					confirmText={null}
					onCancel={this.actionHandler}
				>
					<Button type="primary">{i18n.onlyCancel}</Button>
				</Pop>
			</div>
		);
	}
}

ReactDOM.render(<Wrapper/>, mountNode);
```
