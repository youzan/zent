---
order: 4
zh-CN:
	title: textarea输入框加计数器
en-US:
	title: Textarea input with showCount
---

```jsx
import { Input } from 'zent';

class TextArea extends React.Component {
	state = {
		value: '',
		value2: '',
	};

	handleChange = e => {
		this.setState({ value: e.target.value });
	};
	handleMaxCharacterChange = e => {
		this.setState({ value2: e.target.value });
	};
	render() {
		const { value, value2 } = this.state;
		return (
			<div>
				<Input
					type="textarea"
					value={value}
					onChange={this.handleChange}
					maxLength={10}
					showCount
					autoSize
				/>
				<Input
					type="textarea"
					value={value2}
					onChange={this.handleMaxCharacterChange}
					maxCharacterCount={10}
					showCount
					autoSize
				/>
			</div>
		);
	}
}
ReactDOM.render(<TextArea />, mountNode);
```
