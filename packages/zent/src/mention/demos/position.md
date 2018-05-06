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
		suggestions: [
			// { content: 1, value: 100 },
			// { content: 2, value: 200 },
			// { content: 3, value: 300 },
			// { content: 4, value: 400 },
			// { content: 5, value: 500 },
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
				position="top"
			/>
		);
	}
}

ReactDOM.render(<MentionDemo />, mountNode);
```
