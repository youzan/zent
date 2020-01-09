---
order: 2
zh-CN:
	title: 设置回调函数
	affix: 固钉
	finishText: 已经固定啦
	cancelText: 取消固定啦
en-US:
	title: Set callback function
	affix: Affix
	finishText: Pinned
	cancelText: Unpinned
---

```jsx
import { Affix, Alert } from 'zent';

class App extends React.Component {
	state = {
		text: '{i18n.affix}',
	};

	onPin = () => {
		this.setState({ text: '{i18n.finishText}' });
	};
	onUnpin = () => {
		this.setState({ text: '{i18n.cancelText}' });
	};

	render() {
		return (
			<Affix offsetTop={200} onPin={this.onPin} onUnpin={this.onUnpin}>
				<Alert type="warning">{this.state.text}</Alert>
			</Affix>
		);
	}
}

ReactDOM.render(<App />, mountNode);
```
