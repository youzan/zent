---
order: 2
zh-CN:
	title: 选择透明度
	content: 当前颜色：
en-US:
	title: Choose opacity
	content: Current color：
---

```jsx
import { ColorPicker } from 'zent';

class Simple extends React.Component {
	state = {
		color: 'rgba(81, 151, 255, 0.6)',
		showAlpha: true
	}

	handleChange = (color) => {
		this.setState({
			color
		});
	}

	render() {
		const { color, showAlpha } = this.state;
		return (
			<div>
				<ColorPicker color={color} showAlpha={showAlpha} onChange={this.handleChange} />
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
