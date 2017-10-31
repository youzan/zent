---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic usage
---

```jsx
import { Checkbox } from 'zent';

class App extends React.Component {

	state = {
		checked: true
	}

	handleChange = (e) => {
		this.setState({
			checked: e.target.checked
		})
	}

	render() {
		const { checked } = this.state
		return (
			<Checkbox checked={checked} onChange={this.handleChange}>Checkbox</Checkbox>
		)
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
