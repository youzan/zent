---
order: 3
zh-CN:
	title: 配置拖动手柄，只有按住拖动手柄才能进行拖动
en-US:
	title: Configure the drag handle. You can drag only by holding down the drag handle
---

```js
import { Sortable, Icon } from 'zent';

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
			<div className="demo-sortable-wrapper">
				<Sortable
					items={list}
					handle=".drag-icon"
					onChange={this.handleChange}
				>
					{
						list.map(({ name } ) => 
							<div className="zent-demo-sortable-basic-item" key={name}>
								<Icon type="drag" className="drag-icon" /> {name}
							</div>
						)
					}
				</Sortable>
			</div>
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
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
	.drag-icon {
		font-size: 16px;
		cursor: grab;
	}
</style>
