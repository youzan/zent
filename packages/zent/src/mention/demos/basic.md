---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```js
import { Mention } from 'zent';

class MentionDemo extends React.Component {
	state = {
		text: '',
		suggestions: [],
	};

	onValueChange = val => {
		this.setState({
			text: val,
		});
	};

	onSearchChange = search => {
		const suggestions = [];

		if (search) {
			let v = search;
			for (let i = 0; i < 4; i++) {
				suggestions.push({
					content: v,
					value: i,
				});
				v = v + search;
			}
		}

		this.setState({
			suggestions,
		});
	};

	render() {
		return (
			<Mention
				value={this.state.text}
				onChange={this.onValueChange}
				onSearchChange={this.onSearchChange}
				suggestions={this.state.suggestions}
			/>
		);
	}
}

ReactDOM.render(<MentionDemo />, mountNode);
```
