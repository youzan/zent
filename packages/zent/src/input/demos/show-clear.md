---
order: 6
zh-CN:
  title: 显示清除按钮
en-US:
  title: show clear button
---

```jsx
import { Input } from 'zent';

class EventTest extends React.Component {
	state = {
		value: '',
		search: '',
	};

	onChange = e => {
		this.setState({ value: e.target.value });
	};

	onSearchChange = e => {
		this.setState({
			search: e.target.value,
		});
	};

	render() {
		return (
			<div>
				<Input onChange={this.onChange} value={this.state.value} showClear />
				<Input icon="search" onChange={this.onSearchChange} value={this.state.search} showClear />
			</div>
		);
	}
}

ReactDOM.render(<EventTest />, mountNode);
```
