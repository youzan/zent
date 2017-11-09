---
order: 4
zh-CN:
	title: 自定义开关文案
en-US:
	title: Custom text of switch
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
			<Switch checked={this.state.checked} onChange={this.handleChange} checkedText={'open'} uncheckedText={'close'} />
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
