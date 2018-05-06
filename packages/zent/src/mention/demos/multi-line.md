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
		suggestions: [
			{ content: 1, value: 100 },
			{ content: 2, value: 200 },
			{ content: 3, value: 300 },
			{ content: 4, value: 400 },
			{ content: 5, value: 500 },
		],
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
				suggestions={this.state.suggestions}
				multiLine
			/>
		);
	}
}

ReactDOM.render(<MentionDemo />, mountNode);
```
