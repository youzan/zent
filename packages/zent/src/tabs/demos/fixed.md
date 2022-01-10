---
order: 3
zh-CN:
	title: 可添加、删除、固定tab
	tabOne: 选项1
	tabTwo: 选项2
	tabText: 选项
	tabOneCont: 选项1的内容
	tabTwoCont: 选项2的内容
	desc: canFixed 属性只有在 card 模式下起效
en-US:
	title: Add, delete, and fix tabs
	tabOne: Tab1
	tabTwo: Tab2
	tabText: Tab
	tabOneCont: The content of tab1.
	tabTwoCont: The content of tab2.
	desc: canFixed props only avaliable in card type
---

```jsx
import { Tabs, Icon } from 'zent';
const TabPanel = Tabs.TabPanel;
let uniqId = 4;

class Simple extends React.Component {
	state = {
		activeId: '2',
		panels: [
			{
				tab: <span>{i18n.tabOne}</span>,
				id: '1',
				content: '{i18n.tabOneCont}',
				disabled: true,
			},
			{
				tab: <span>{i18n.tabTwo}</span>,
				id: '2',
				content: <div>{i18n.tabTwoCont}</div>,
			},
		],
	};

	onTabAdd = () => {
		let { panels } = this.state;
		const id = `${uniqId++}`;
		panels.push({
			id,
			tab: `{i18n.tabText}${uniqId}`,
			content: Date.now(),
		});
		this.setState({
			panels,
			activeId: id,
		});
	};

	onTabDel = id => {
		const { panels, activeId } = this.state;
		const delPanelIndex = panels.findIndex(panel => panel.id === id);
		this.setState(
			{
				panels: panels.filter(panel => panel.id !== id),
			},
			() => {
				if (id === activeId) {
					const prePanelIndex = Math.max(0, delPanelIndex - 1);
					const prePanel = panels[prePanelIndex];
					if (!panels.length || prePanel?.disabled) {
						return;
					}
					this.setState({ activeId: prePanel.id });
				}
			}
		);
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
		const panels = this.renderPanels();
		return (
			<div className="zent-tabs-demo">
				<Tabs
					candel
					canFixed
					type="card"
					activeId={this.state.activeId}
					onChange={this.onTabChange}
					onDelete={this.onTabDel}
					onAdd={this.onTabAdd}
				>
					{panels}
				</Tabs>
				<div
					style={{
						marginTop: 16,
					}}
				>
					{i18n.desc}
				</div>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```

<style>
.zent-tabs-add-btn {
	cursor: pointer;
}
</style>
