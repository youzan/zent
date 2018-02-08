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
			<ul>
				<li><Rate character={<Icon type="youzan" />} allowHalf value={this.state.value} onChange={this.onChange} /></li>
				<li><Rate character="赞" allowHalf value={this.state.value} onChange={this.onChange} /></li>
			</ul>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
