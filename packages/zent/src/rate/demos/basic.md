---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```js
import { Rate } from 'zent';

class App extends Component {

	state = {
		value: 2
	}

	onChange = value => {
		this.setState({ value });
	}

	render() {
		return (
			<Rate value={this.state.value} onChange={this.onChange} />
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
