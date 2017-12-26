---
order: 5
zh-CN:
	title: 带选择透明的面板
	content: 当前颜色：
en-US:
	title: Color board with opacity
	content: Current color：
---

```jsx
import { ColorPicker } from 'zent';
const ColorBoard = ColorPicker.ColorBoard;

class Simple extends React.Component {
	state = {
		color: 'rgba(81, 151, 255, 0.6)',
		showAlpha: true
	}

	handleChange = (color) => {
		this.setState({
			color: color.rgba
		});
	}

	render() {
		const { color, showAlpha } = this.state;
		return (
			<div>
				<ColorBoard color={color} showAlpha={showAlpha} onChange={this.handleChange} />
				<div style={{ color, marginTop: 10 }}>{i18n.content}{color}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
