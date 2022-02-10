---
order: 5
zh-CN:
	title: 红点徽标，不需要指定具体的count
	content: 店铺消息
en-US:
	title: Red dot without specific number
	content: shop messages
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
				<Badge dot={showDot} offset={[-4, -2]}>{i18n.content}</Badge>
				<Switch size="small" checked={showDot} onChange={this.handleChange} />
			</div>
		)
	}
}
ReactDOM.render(
	<Demo />, mountNode
);
```
