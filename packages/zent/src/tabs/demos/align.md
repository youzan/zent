---
order: 6
zh-CN:
	title: 对齐类型
	tabOne: 选项一
	tabTwo: 选项二
	tabThree: 选项三
	tabOneCont: 选项一的内容
	tabTwoCont: 选项二的内容
	tabThreeCont: 选项三的内容
en-US:
	title: Align Type
	tabOne: Tab One
	tabTwo: Tab Two
	tabThree: Tab Three
	tabOneCont: The content of tab one.
	tabTwoCont: The content of tab two.
	tabThreeCont: The content of tab three.
---

```jsx
import { Tabs, Radio } from 'zent';
const TabPanel = Tabs.TabPanel;
const RadioGroup = Radio.Group;

class Simple extends React.Component {
	state = {
		activeId: '2',
		align: 'left',
	};

	onTabChange = id => {
		this.setState({
			activeId: id,
		});
	};

	onAlignChange = e => {
		this.setState({
			align: e.target.value,
		});
	}

	render() {
		const { align, activeId } = this.state;

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
				<RadioGroup value={align} onChange={this.onAlignChange}>
					<Radio value="left">left</Radio>
					<Radio value="center">center</Radio>
					<Radio value="right">right</Radio>
				</RadioGroup>
				<Tabs
					activeId={activeId}
					onChange={this.onTabChange}
					type="normal"
					align={align}
					canadd
					navExtraContent={
						<div style={{ whiteSpace: 'nowrap' }}>当前网店：文三路网店</div>
					}
				>
					{panels}
				</Tabs>
				<Tabs
					activeId={activeId}
					onChange={this.onTabChange}
					type="card"
					align={align}
					canadd
					navExtraContent={
						<div style={{ whiteSpace: 'nowrap' }}>当前网店：文三路网店</div>
					}
				>
					{panels}
				</Tabs>
				<Tabs
					activeId={activeId}
					onChange={this.onTabChange}
					type="button"
					align={align}
					canadd
					navExtraContent={
						<div style={{ whiteSpace: 'nowrap' }}>当前网店：文三路网店</div>
					}
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