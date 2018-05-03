---
order: 2
zh-CN:
	title: 多行模式
en-US:
	title: Multi-line mode
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
				multiLine
			/>
		);
	}
}

ReactDOM.render(<MentionDemo />, mountNode);
```
