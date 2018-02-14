---
order: 3
zh-CN:
	title: 禁用
en-US:
	title: disabled
---

```js
import { Rate } from 'zent';

class App extends Component {

	state = {
		value: 2.5
	}

	onChange = value => {
		this.setState({ value });
	}

	render() {
		return (
			<Rate disabled allowHalf value={this.state.value} onChange={this.onChange} />
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
