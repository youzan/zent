---
order: 5
zh-CN:
	title: 事件处理
en-US:
	title: Event handler
---

```jsx
import { NumberInput, Button } from 'zent';

class EventTest extends React.Component {
	state = {
		log: ''
	};

	onChange(ev) {
		this.setState({ log: ev.target.value });
	}

	setToThree= (ev) => {
		this.setState({ log: 3 });
	}

	render() {
		return (
			<div>
				<NumberInput
					showStepper
					value={this.state.log}
					onChange={this.onChange.bind(this)} 
					onPressEnter={() => console.log('pressed enter')}/>
				<Button onClick={this.setToThree}>change to 3</Button>
			</div>
		);
	}
}

ReactDOM.render(
	<EventTest />
	, mountNode
);
```
