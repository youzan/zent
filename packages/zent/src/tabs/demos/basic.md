---
order: 1
zh-CN:
	title: 基础模式
	tabOne: 选项一
	tabTwo: 选项二
	tabThree: 选项三
	tabOneCont: 选项一的内容
	tabTwoCont: 选项二的内容
	tabThreeCont: 选项三的内容
en-US:
	title: Basic Mode
	tabOne: Tab One
	tabTwo: Tab Two
	tabThree: Tab Three
	tabOneCont: The content of tab one.
	tabTwoCont: The content of tab two.
	tabThreeCont: The content of tab three.
---

```jsx
import { Tabs } from 'zent';
const TabPanel = Tabs.TabPanel;

class Simple extends React.Component {
	state = {
		activeId: '2',
	};

	onTabChange = id => {
		this.setState({
			activeId: id,
		});
	};

	render() {
		const panels = [
			<TabPanel key="1" tab={<span>{i18n.tabOne}</span>} id="1" disabled>
				<div>{i18n.tabOneCont}</div>
			</TabPanel>,
			<TabPanel key="2" tab="{i18n.tabTwo}" id="2">
				<div>{i18n.tabTwoCont}</div>
			</TabPanel>,
			<TabPanel key="3" tab="{i18n.tabThree}" id="3">
				<div>{i18n.tabThreeCont}</div>
			</TabPanel>,
		];
		return (
			<div className="zent-tabs-demo">
				<Tabs
					activeId={this.state.activeId}
					onChange={this.onTabChange}
				>
					{panels}
				</Tabs>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```

<style>
.zent-tabs-demo .zent-tabs {
	margin-bottom: 16px;
}
</style>
