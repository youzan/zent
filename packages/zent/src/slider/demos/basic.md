---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic usage
---

```jsx
import { Slider } from 'zent';

class Test extends React.Component {
	state = {
		value: 0
	}

	onChange = value => {
		this.setState({ value });
	}

	render() {
		const { value } = this.state;
		return (<Slider value={value} onChange={this.onChange} />);
	}
}

ReactDOM.render(
		<Test />
		, mountNode
);
```
