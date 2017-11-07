---
order: 2
zh-CN:
	title: 设置回调函数
	index: 首页
	affix: 固钉
	finishText: 已经固定啦
	cancalText: 取消固定啦
en-US:
	title: Set callback function
	index: Index
	affix: Affix
	finishText: fixed
	cancalText: cancal fix

---


```jsx
import { Affix, Alert } from 'zent';

class App extends React.Component {

	state = {
		text: '{i18n.affix}'
	}

	onPin = () => {
		this.setState({ text: '{i18n.finishText}' });
	}
	onUnpin = () => {
		this.setState({ text: '{i18n.cancalText}' });
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
