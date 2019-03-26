---
order: 2
zh-CN:
	title: dropdown设置
en-US:
	title: dropdown setting
---

```js
const list = [
	{
		id: 1,
		value: 'red',
	},
	{
		id: 2,
		value: 'green'
	},
	{
		id: 3,
		value: 'blue'
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
					dropdownTrigger="hover"
					dropdownValue="id"
					dropdownText="value"
					onClick={this.handleClick}
					onSelect={this.handleSelect}
				>
					primary
				</SplitButton>
				<SplitButton
					type="danger"
					disabled
					dropdownData={list}
					dropdownTrigger="hover"
					dropdownValue="id"
					dropdownText="value"
					onClick={this.handleClick}
					onSelect={this.handleSelect}
				>
					danger
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
