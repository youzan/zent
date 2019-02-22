---
order: 1
zh-CN:
	title: 基础用法
	normal: 普通
	primary: 按钮
	disabled: 禁用
	loading: 加载中
	big: 大号
	small: 小号
en-US:
	title: Basic Usage
	normal: Normal
	primary: Button
	disabled: Disabled
	loading: Loading
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
					dropdownData={list}
					onClick={this.handleClick}
					onSelect={this.handleSelect}
				>
					{i18n.normal}
				</SplitButton>
				<SplitButton
					type="primary"
					dropdownData={list}
					onClick={this.handleClick}
					onSelect={this.handleSelect}
				>
					{i18n.primary}
				</SplitButton>
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
				<SplitButton
					type="danger"
					size="large"
					dropdownData={list}
				>
					{i18n.big}
				</SplitButton>
				<SplitButton
					type="success"
					size="small"
					dropdownData={list}
				>
					{i18n.small}
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
