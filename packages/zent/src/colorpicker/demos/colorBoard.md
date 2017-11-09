---
order: 4
zh-CN:
	title: 颜色面板
	content: 当前颜色：
en-US:
	title: Color board
	content: Current color：
---

```jsx
import { ColorPicker } from 'zent';
const ColorBoard = ColorPicker.ColorBoard;

class Simple extends React.Component {
	state = {
		color: '#5197FF'
	}

	handleChange = (color) => {
		this.setState({
			color: color.hex
		});
	}

	render() {
		const { color, showAlpha } = this.state;
		return (
			<div>
				<ColorBoard color={color} onChange={this.handleChange} />
				<div className="marginTop10" style={{ color }}>{}{color}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```


<style>
	.marginTop10 {
		margin-top: 10px;
	}
</style>
