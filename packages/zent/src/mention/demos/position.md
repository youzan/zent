---
order: 3
zh-CN:
	title: 弹层位置
en-US:
	title: Popover position
---

```js
import { Mention } from 'zent';

class MentionDemo extends React.Component {
	state = {
		text: '',
	};

	onValueChange = val => {
		this.setState({
			text: val,
		});
	};

	render() {
		return (
			<Mention
				value={this.state.text}
				onChange={this.onValueChange}
				position="top"
			/>
		);
	}
}

ReactDOM.render(<MentionDemo />, mountNode);
```
