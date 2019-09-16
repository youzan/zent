---
order: 5
zh-CN:
	title: 仅展示结果（无交互效果）
en-US:
	title: read only (no-interaction)
---

```js
import { Rate, NumberInput } from 'zent';

class App extends Component {

	state = {
		value: '3.7',
	}

	onNumberChange = value => {
		this.setState({ value })
	}

	render() {
		return (
			<div>
				<NumberInput
					className="zent-doc-rate-readonly-number"
					value={this.state.value}
					onChange={this.onNumberChange}
					max={5.0}
					min={0}
					decimal={1}
					showCounter
				/>
				<Rate value={+this.state.value} readOnly />
			</div>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```

<style>
	.zent-doc-rate-readonly-number {
		width: 120px;
		.zent-input {
			min-width: 62px;
		}
		margin-bottom: 8px;
	}
</style>
