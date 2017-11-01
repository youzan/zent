---
order: 2
zh-CN:
	title: 设置回调函数
	index: 首页
	affix: 固钉
en-US:
	title: set callback function
	index: Index
	affix: Affix
---


```jsx
import { Affix, Alert } from 'zent';

class App extends React.Component {

	state = {
		text: '固钉'
	}

	onPin = () => {
		this.setState({ text: '已经固定啦' });
	}
	onUnpin = () => {
		this.setState({ text: '取消固定啦' });
	}

	render() {
		return (
			<Affix offsetTop={200} onPin={this.onPin} onUnpin={this.onUnpin}>
					<Alert type="warning">{this.state.text}</Alert>
			</Affix>
		)
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
