---
order: 3
zh-CN:
	title: 动态大小
	link: 链接
en-US:
	title: Dynamic Size
	link: link
---

```jsx
import { Timeline, NumberInput } from 'zent';

const timeline = [
	{
		label: 'online',
		color: '#00b90e',
		percent: 0.3
	},
	{
		label: 'unknown',
		percent: 0.2,
		showDot: false,
		showLabel: false
	},
	{
		label: 'offline',
		color: '#E70000',
		percent: 0.5
	}
];

class App extends React.Component {
	state = {
		size: 500
	}

	onChange = (size) => {
		this.setState({
			size,
		});
	}

	render() {
		const { size } = this.state;

		return (
			<div>
				<NumberInput value={size} onChange={this.onChange} showStepper />
				<Timeline size={size} timeline={timeline} />
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	mountNode
);
```
