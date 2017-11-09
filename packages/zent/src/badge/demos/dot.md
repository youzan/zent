---
order: 4
zh-CN:
	title: 小红点，不需要指定具体的count
en-US:
	title: Red dot without specific number
---

```jsx
import { Badge,Icon,Switch } from 'zent';

class Demo extends React.Component {
	state = {showDot: true}

	handleChange = (showDot) => {
		this.setState({ showDot });
	}

	render() {
		const { showDot } = this.state;
		return (
			<div>
				<Badge dot={showDot}>
					<Icon type="bell-o" className="demo-cont"/>
				</Badge>
				<Switch size="small" checked={showDot} onChange={this.handleChange} />
			</div>
		)
	}
}
ReactDOM.render(
	<Demo />, mountNode
);
```
