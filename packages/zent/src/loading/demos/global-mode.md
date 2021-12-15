---
order: 2
zh-CN:
	title: 全局模式
	open: 全局开启
	close: 全局关闭
	showBackground: 展示背景色
en-US:
	title: Global Mode
	open: Open
	close: Close
	showBackground: Show Background
---

```js
import { FullScreenLoading, Button, Switch } from 'zent';

class Example extends React.Component {
	state = {
		on: false,
		show: false,
	};

	render() {
		return (
			<div>
				<div className="zent-loading-demo-switch-background">
					{i18n.showBackground}: 
					<Switch 
						checked={this.state.show} 
						onChange={(checked) => {
							this.setState({ show: checked });
						}} 
					/>
				</div>
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
				<FullScreenLoading loading={this.state.on} showBackground={this.state.show} />
			</div>
		);
	}
}

ReactDOM.render(<Example />, mountNode);
```

<style>
	.zent-loading-demo-switch-background {
		display: flex;
		margin-bottom: 12px;
	}

	.zent-loading-demo-switch-background > .zent-switch {
		margin-left: 8px;
	}
</style>
