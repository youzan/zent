---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic Usage
---

```js
import { Sortable, Card } from 'zent';

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
			}
		]
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
				items={list}
				onChange={this.handleChange}
			>
				{
					list.map(({ name } ) => <Card key={name}>{name}</Card>)
				}
			</Sortable>
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
