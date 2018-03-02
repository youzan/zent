---
order: 2
zh-CN:
	title: 允许半心
en-US:
	title: allow half
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
			<Rate allowHalf value={this.state.value} onChange={this.onChange} />
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
