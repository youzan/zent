---
order: 1
zh-CN:
	title: 基础用法
	content: 自动补全内容
en-US:
	title: Basic Usage
	content: AutoComplete Content
---

```js
import { AutoComplete } from 'zent';

class Complete extends Component {
	state = {
		data: [],
	};

	onSelect = v => console.log('onSelect', v);
	onSearch = v => {
		this.setState({
			data: v ? [v, v + v, v + v + v] : [],
		});
	};
	onChange = v => console.log('onChange', v);

	render() {
		return (
			<AutoComplete
				data={this.state.data}
				onSelect={this.onSelect}
				onSearch={this.onSearch}
				onChange={this.onChange}
			/>
		);
	}
}

ReactDOM.render(
	<div>
		<Complete />
	</div>,
	mountNode
);
```
