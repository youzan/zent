---
order: 2
zh-CN:
  title: 动态效果
en-US:
  title: Dynamic
---

```jsx
import { Progress, Button } from 'zent';

class App extends Component {
	state = {
		value: 10,
	};

	increase = () => {
		let value = this.state.value + 10;
		if (value >= 100) {
			value = 100;
		}
		this.setState({ value });
	};

	decrease = () => {
		let value = this.state.value - 10;
		if (value < 0) {
			value = 0;
		}
		this.setState({ value });
	};

	render() {
		const { value } = this.state;
		return (
			<div className="zent-progress-demo">
				<Progress percent={value} />
				<Progress type="circle" percent={value} />
				<div>
					<Button onClick={this.decrease}>-</Button>
					<Button onClick={this.increase}>+</Button>
				</div>
			</div>
		);
	}
}

ReactDOM.render(<App />, mountNode);
```
