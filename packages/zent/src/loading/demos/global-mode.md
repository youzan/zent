---
order: 2
zh-CN:
	title: 全局模式
	open: 全局开启
	openWithBg: 带背景的全局开启
	text: 商品上传中，请稍后
	close: 全局关闭
en-US:
	title: Global Mode
	open: Open
	openWithBg: Open With Background
	text: Goods uploaded, please hold on
	close: Close
---

```js
import { FullScreenLoading, Button, Switch } from 'zent';

class Example extends React.Component {
	state = {
		noBgOpen: false,
		showBgOpen: false,
	};

	close = () => {
		this.setState({
			noBgOpen: false,
			showBgOpen: false,
		});
	};

	render() {
		return (
			<div>
				<Button
					onClick={() => {
						this.setState({ noBgOpen: true });
					}}
				>
					{i18n.open}
				</Button>
				<Button
					onClick={() => {
						this.setState({ showBgOpen: true });
					}}
				>
					{i18n.openWithBg}
				</Button>
				<Button
					onClick={() => this.close()}
					style={{ zIndex: 9999, position: 'relative' }}
				>
					{i18n.close}
				</Button>
				<FullScreenLoading loading={this.state.noBgOpen} />
				<FullScreenLoading
					loading={this.state.showBgOpen}
					iconText="{i18n.text}"
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
