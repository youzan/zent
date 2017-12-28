---
order: 2
zh-CN:
	title: 可编辑列表
en-US:
	title: Editable List
---

```js
import { Sortable, Card, Icon } from 'zent';

class Simple extends React.Component {
	state = {
		list: [
			{
				name: 'Arvin'
			},
			{
				name: 'Jack'
			},
			{
				name: 'Bob'
			},
			{
				name: 'Nick'
			},
			{
				name: 'Mark'
			},
			{
				name: 'Leo'
			},
			{
				name: 'James'
			},
			{
				name: 'Wade'
			}
		]
	}

	handleAdd = () => {
		const { list } = this.state;
		this.setState({
			list: [...list, {
				name: `Custom${list.length + 1}`
			}]
		});
	}

	handleRemove = (removeIndex) => {
		const { list } = this.state;
		const newList = list.filter((item, index) => index !== removeIndex);
		this.setState({
			list: newList
		});
	}

	handleChange = (items) => {
		this.setState({
			list: items
		});
	}

	render() {
		const { list } = this.state;
		return (
			<Sortable
				className="demo-sortable"
				items={list}
				filterClass="demo-sortable-add"
				dragClass="demo-sortable-drag"
				onChange={this.handleChange}
			>
				{
					list.map(({ name }, index ) => {
						return (
							<div
								className="demo-sortable-item"
								key={name}
							>
								{name}
								<Icon
									className="demo-sortable-icon"
									type="close"
									onClick={() => this.handleRemove(index)}
								/>
							</div>
						)
					})
				}
				<div
					className="demo-sortable-add"
					onClick={this.handleAdd}>
					<Icon type="plus" />
				</div>
			</Sortable>
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
