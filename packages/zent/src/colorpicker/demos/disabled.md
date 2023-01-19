---
order: 6
zh-CN:
	title: 禁用
	disabledProperty: 属性禁用
	disabledComponent: 兼容Disabled组件
en-US:
	title: Disabled
	disabledProperty: Property 'disabled'
	disabledComponent: Compatible with Disabled Component
---

```jsx
import { ColorPicker, Disabled } from 'zent';

class Simple extends React.Component {
	state = {
		color: '#5197FF',
	};

	handleChange = color => {
		this.setState({
			color,
		});
	};

	render() {
		const { color } = this.state;
		return (
			<div>
				<ColorPicker color={color} disabled />
				<div style={{ color, marginTop: 5 }}>{i18n.disabledProperty}</div>
				<br />
				<Disabled>
					<ColorPicker color={color} />
					<div className="color-picker-demo" />
					<ColorPicker color={color} onChange={this.handleChange} disabled={false} />
				</Disabled>
				<div style={{ color, marginTop: 5 }}>{i18n.disabledComponent}</div>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```

<style>
.color-picker-demo {
	margin-bottom: 5px;
}
</style>
