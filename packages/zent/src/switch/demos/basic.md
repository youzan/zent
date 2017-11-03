---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic usage
---

```jsx
import { Switch } from 'zent';

class Simple extends React.Component {
	state = {
		checked: true
	}

	handleChange = (checked) => {
		this.setState({ checked });
	}

	render() {
		return (
			<Switch checked={this.state.checked} onChange={this.handleChange} />
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
