---
order: 2
zh-CN:
	title: 全局模式
	open: 全局开启
	close: 全局关闭
en-US:
	title: Global Mode
	open: Open
	close: Close
---

```js
import { FullScreenLoading, Button } from 'zent';

class Example extends React.Component {
	state = {
		on: false,
	};

	render() {
		return (
			<div>
				<Button
					onClick={() => {
						this.setState({ on: true });
					}}
				>
					{i18n.open}
				</Button>
				<Button
					onClick={() => {
						this.setState({ on: false });
					}}
					style={{ zIndex: 9999, position: 'relative' }}
				>
					{i18n.close}
				</Button>
				<FullScreenLoading loading={this.state.on} />
			</div>
		);
	}
}

ReactDOM.render(<Example />, mountNode);
```
