---
order: 3
zh-CN:
	title: 按钮状态
	disabled: 禁用
	loading: 加载中
en-US:
	title: button status
	disabled: Disabled
	loading: Loading
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
					disabled
					type="primary"
					dropdownData={list}
					onClick={this.handleClick}
					onSelect={this.handleSelect}
				>
					{i18n.disabled}
				</SplitButton>
				<SplitButton
					loading
					type="primary"
					dropdownData={list}
					onClick={this.handleClick}
					onSelect={this.handleSelect}
				>
					{i18n.loading}
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
