---
order: 12
zh-CN:
	title: 密码输入框
	password: 请输入密码
	icon: 带Icon的input
en-US:
	title: password
	password: Please enter your password
	icon: With icon
---

```jsx
import { Input } from 'zent';

class EventTest extends React.Component {
	state = {
		value: '',
	};

	onChange = e => {
		this.setState({ value: e.target.value });
	};

	render() {
		return (
			<div>
				<Input.Password />
				<Input.Password onChange={this.onChange} value={this.state.value} showClear />
			</div>
		);
	}
}

ReactDOM.render(
	<EventTest/>,
	mountNode
);
```
