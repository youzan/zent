---
order: 1
zh-CN:
	title: 基础用法
	normal: 次按钮
	primary: 主按钮
	text: 文字按钮
	big: 大号
	small: 小号
en-US:
	title: Basic Usage
	normal: Normal
	primary: Button
	text: text
	big: Big
	small: Small
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
					{i18n.primary}
				</SplitButton>
				<SplitButton
					dropdownData={list}
					onClick={this.handleClick}
					onSelect={this.handleSelect}
				>
					{i18n.normal}
				</SplitButton>
				<SplitButton
					type="text"
					dropdownData={list}
					onClick={this.handleClick}
					onSelect={this.handleSelect}
				>
					{i18n.text}
				</SplitButton>
				<SplitButton
					type="text"
					dropdownData={list}
					dropdownIcon={'more'}
					onClick={this.handleClick}
					onSelect={this.handleSelect}
				>
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
