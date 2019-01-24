---
order: 3
zh-CN:
	title: dropdown位置设置
	up: 上面
	down: 下面
en-US:
	title: dropdown position setting
	up: Upside
	down: Downside
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
					dropdownPosition="top-left"
					onClick={this.handleClick}
					onSelect={this.handleSelect}
				>
					{i18n.up}
				</SplitButton>
				<SplitButton
					type="danger"
					dropdownData={list}
					dropdownValue="id"
					dropdownText="value"
					dropdownPosition="bottom-right"
					onClick={this.handleClick}
					onSelect={this.handleSelect}
				>
					{i18n.down}
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
