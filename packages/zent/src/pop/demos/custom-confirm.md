---
order: 5
zh-CN:
	title: 自定义 Confirm 形式的气泡提示按钮
	content: Pop关闭了
	popContent: 提示内容
	btnText: 打开气泡
en-US:
	title: Custom confirm pop
	content: Pop closed
	popContent: Pop content
	btnText: Open
---

```jsx
import { Pop, Sweetalert, Button } from 'zent';

class Wrapper extends React.Component {
	confirmHandler = () => {
		Sweetalert.alert({
			content: '{i18n.content}',
			parentComponent: this
		});
	}

	render() {
		return (
			<Pop
				trigger="click"
				content="{i18n.popContent}"
				type="danger"
				confirmText="Error"
				cancelText="Close"
				onConfirm={this.confirmHandler}
			>
				<Button type="primary">{i18n.btnText}</Button>
			</Pop>
		);
	}
}

ReactDOM.render(<Wrapper/>, mountNode);
```
