---
order: 3
zh-CN:
	title: 全局模式下显示背景色
	open: 全局开启
	close: 全局关闭
	text: 商品上传中，请稍后
en-US:
	title: Display background color in global mode
	open: Open
	close: Close
	text: Goods uploaded, please hold on
---

```js
import { FullScreenLoading, Button, Switch } from 'zent';

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
				<FullScreenLoading
					loading={this.state.on}
					text="{i18n.text}"
					showBackground
				/>
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
