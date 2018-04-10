---
order: 1
zh-CN:
	title: 基本用法
	triggerBtn: 触发错误
	fine: 成功渲染
	notAffected: 这里不受影响
en-US:
	title: Basic Usage
	triggerBtn: Trigger error
	fine: Render OK
	notAffected: Not affected here
---

```js
import { ErrorBoundary, Button } from 'zent';

class ErrorComponent extends React.Component {
	state = {
		fail: false,
	};

	triggerFail = () => {
		this.setState({
			fail: true,
		});
	};

	render() {
		if (this.state.fail) {
			throw new Error('This is an error from render.');
		}

		return (
			<div>
				<span style={{ marginRight: 10 }}>{i18n.fine}</span>
				<Button onClick={this.triggerFail}>{i18n.triggerBtn}</Button>
			</div>
		);
	}
}

ReactDOM.render(
	<div>
		<ErrorBoundary>
			<ErrorComponent />
		</ErrorBoundary>
		<div style={{ marginTop: 10 }}>{i18n.notAffected}</div>
	</div>,
	mountNode
);
```
