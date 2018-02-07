---
order: 4
zh-CN:
	title: 自定义字符
en-US:
	title: custom character
---

```js
import { Rate, Icon } from 'zent';

class App extends Component {

	state = {
		value: 2.5
	}

	onChange = value => {
		this.setState({ value });
	}

	render() {
		return (
			<Rate character={<Icon type="youzan" />} allowHalf value={this.state.value} onChange={this.onChange} />
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
