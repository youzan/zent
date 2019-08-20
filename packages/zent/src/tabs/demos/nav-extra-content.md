---
order: 4
zh-CN:
	title: 额外内容
	tabOne: 选项1
	tabTwo: 选项2
	tabText: 选项
	tabOneCont: 选项1的内容
	tabTwoCont: 选项2的内容
	shopCont: 当前网店：文三路网店
en-US:
	title: Extra Content
	tabOne: Tab1
	tabTwo: Tab2
	tabText: Tab
	tabOneCont: The content of tab1.
	tabTwoCont: The content of tab2.
	shopCont: Current shop
---

```jsx
import { Tabs } from 'zent';
const TabPanel = Tabs.TabPanel;
let uniqId = 4;

class Simple extends React.Component {
	state = {
		activeId: '2',
		panels: [
			{
				tab: <span>{i18n.tabOne}</span>,
				id: '1',
				disabled: true,
				content: '{i18n.tabOneCont}',
			},
			{
				tab: <span>{i18n.tabTwo}</span>,
				id: '2',
				content: <div>{i18n.tabTwoCont}</div>,
			},
		],
	};

	onTabChange = id => {
		this.setState({
			activeId: id,
		});
	};

	renderPanels() {
		let { panels } = this.state;
		return panels.map(p => {
			return (
				<TabPanel {...p} key={p.id}>
					{p.content}
				</TabPanel>
			);
		});
	}

	render() {
		return (
			<div className="zent-tabs-demo">
				<Tabs
					activeId={this.state.activeId}
					onChange={this.onTabChange.bind(this)}
					navExtraContent={
						<div style={{ whiteSpace: 'nowrap' }}>{`{i18n.shopCont}`}</div>
					}
				>
					{this.renderPanels()}
				</Tabs>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
