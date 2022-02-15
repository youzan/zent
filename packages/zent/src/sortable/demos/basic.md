---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```js
import { Sortable } from 'zent';

class Simple extends React.Component {
	state = {
		list: [
			{
				name: 'Arvin',
			},
			{
				name: 'Jack',
			},
			{
				name: 'Bob',
			},
			{
				name: 'Nick',
			},
		],
	};

	handleChange = items => {
		this.setState({
			list: items,
		});
	};

	render() {
		const { list } = this.state;
		return (
			<div className="demo-sortable-wrapper">
				<Sortable items={list} onChange={this.handleChange}>
					{list.map(({ name }) => (
						<div className="zent-demo-sortable-basic-item" key={name}>
							{name}
						</div>
					))}
				</Sortable>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```

<style>
	.zent-demo-sortable-basic-item {
		background: #FFFFFF;
		box-shadow: inset 0 -1px 0 0 #EBEDF0;
		width: 280px;
		height: 56px;
		line-height: 56px;
		padding-left: 16px;
	}
</style>
