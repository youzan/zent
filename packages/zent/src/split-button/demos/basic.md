---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```js
const list = [
	{
		value: 1,
		text: 'red'
	},
	{
		value: 2,
		text: 'blue'
	},
	{
		value: 3,
		text: 'green'
	}
]

import { SplitButton, Notify } from 'zent';

class Simple extends React.Component {
	handleSelect = (value) => {
		Notify.success(value);
	}

	handleClick = () => {
		Notify.success('666');
	}

	render() {
		return (
			<div>
				<SplitButton
					type="primary"
					dropdownData={list}
					onClick={this.handleClick}
					onSelect={this.handleSelect}
				>
					primary
				</SplitButton>
				<SplitButton
					disabled
					type="primary"
					dropdownData={list}
					onClick={this.handleClick}
					onSelect={this.handleSelect}
				>
					primary
				</SplitButton>
				<SplitButton
					loading
					type="primary"
					dropdownData={list}
					onClick={this.handleClick}
					onSelect={this.handleSelect}
				>
					primary
				</SplitButton>
				<SplitButton
					type="danger"
					size="large"
					dropdownData={list}
				>
					danger big
				</SplitButton>
				<SplitButton
					type="success"
					size="small"
					dropdownData={list}
				>
					success small
				</SplitButton>
			</div>
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
