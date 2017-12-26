---
order: 3
zh-CN:
	title: 简化版用法
	content: 当前颜色：
en-US:
	title: Simple version
	content: Current color：
---

```jsx
import { ColorPicker } from 'zent';

class Simple extends React.Component {
	state = {
		color: '#FF4444'
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
				<ColorPicker color={color} type="simple" onChange={this.handleChange} />
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
