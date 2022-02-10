---
order: 2
zh-CN:
	title: 网格拖拽
en-US:
	title: Drag the grid
---

```js
import { Sortable, Card, Icon } from 'zent';

const sortableList = Array(9)
	.fill()
	.map((_, i) => i);

class Simple extends React.Component {
	state = {
		list: sortableList,
		circleList: sortableList,
	};

	handleChange = items => {
		this.setState({
			list: items,
		});
	};

	handleCircleChange = items => {
		this.setState({
			list: items,
		});
	};

	render() {
		const { list, circleList } = this.state;
		return (
			<div className="demo-sortable-wrapper">
				<Sortable
					className="demo-sortable"
					items={list}
					onChange={this.handleChange}
				>
					{list.map(i => (
						<div className="demo-sortable-item" key={i}>
							{i + 1}
						</div>
					))}
				</Sortable>
				<Sortable
					className="demo-sortable"
					items={circleList}
					onChange={this.handleCircleChange}
				>
					{circleList.map(i => (
						<div className="demo-sortable-item--circle" key={i}>
							{i + 1}
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
	.demo-sortable-wrapper {
		background: rgba(247,247,247,0.50);
		padding: 24px;
		display: flex;
	}
	.demo-sortable {
		width: 196px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-right: 48px;
	}

	.demo-sortable-item, .demo-sortable-item--circle {
		width: 60px;
		height: 60px;
		background: #fff;
		line-height: 60px;
		border-radius: 2px;
		font-size: 14px;
		color: #323233;
		text-align: center;
		margin-bottom: 8px;
	}
	.demo-sortable-item--circle {
		border-radius: 50%;
	}
</style>
