---
order: 1
zh-CN:
	title: 基础用法
	content: 当前颜色：
en-US:
	title: Basic usage
	content: Current color：
---

```jsx
import { ColorPicker } from 'zent';

class Simple extends React.Component {
	state = {
		color: '#5197FF'
	}

	handleChange = (color) => {
		this.setState({
			color
		});
	}

	render() {
		const { color } = this.state;
		return (
			<div>
				<ColorPicker color={color} onChange={this.handleChange} />
				<div style={{ color, marginTop: 5 }}>{i18n.content}{color}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
