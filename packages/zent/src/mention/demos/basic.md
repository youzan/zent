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
	};

	onValueChange = val => {
		this.setState({
			text: val
		});
	};

	render() {
		return <Mention value={this.state.text} onChange={this.onValueChange} />;
	}
}

ReactDOM.render(<MentionDemo />, mountNode);
```
