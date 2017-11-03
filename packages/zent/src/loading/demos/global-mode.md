---
order: 2
zh-CN:
	title: 全局模式
	open: 全局开启
	close: 全局关闭
en-US:
	title: Global Mode
	open: Open
	close: Global Close
---

```js
import { Loading, Button } from 'zent';

class Example extends React.Component {
	state = {
		on: false
	};

	render() {
		return (
			<div>
				<Button onClick={() => { this.setState({ on: true }) }}>
					{i18n.open}
				</Button>
				<Button
					onClick={() => { this.setState({ on: false }) }}
					style={{ zIndex: 9999, position: 'relative' }}
				>
					{i18n.close}
				</Button>
				<Loading float show={this.state.on} />
			</div>
		);
	}
}

ReactDOM.render(<Example />, mountNode);
```
