---
order: 3
zh-CN:
	title: 设置是否显示消息数0
en-US:
	title: Set whether to display zero
---

```jsx
import { Badge,Icon,Switch } from 'zent';

class Demo extends React.Component {
	state = {showZero: true}

	handleChange = (showZero) => {
		this.setState({ showZero });
	}

	render() {
		const { showZero } = this.state;
		return (
			<div>
				<Badge count={0} showZero={showZero}>
					<Icon type="bell-o" className="demo-cont"/>
				</Badge>
				<Switch size="small" checked={showZero} onChange={this.handleChange} />
			</div>
		)
	}
}
ReactDOM.render(
	<Demo />, mountNode
);
```
:::
