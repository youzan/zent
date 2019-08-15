---
order: 4
zh-CN:
	title: 加减用法
	tabOne: 选项1
	tabTwo: 选项2
	tabText: 选项
	tabOneCont: 选项1的内容
	tabTwoCont: 选项2的内容
	desc: 添加或删除回调 Props 只有在 normal 和 card 两种模式下才可使用
en-US:
	title: Dynamic add and delete tab
	tabOne: Tab1
	tabTwo: Tab2
	tabText: Tab
	tabOneCont: The content of tab1.
	tabTwoCont: The content of tab2.
	desc: onAdd and onDelete callback props only avaliable in normal and card type
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

	onTabAdd = () => {
		let { panels } = this.state;
		panels.push({
			tab: `{i18n.tabText}${uniqId}`,
			id: `${uniqId++}`,
			content: Date.now(),
		});
		this.setState({
			panels,
		});
	};

	onTabDel = id => {
		const { panels } = this.state;
		this.setState({
			panels: panels.filter((p, i) => p.id !== id),
		});
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
			<div>
				<Tabs
					candel
					canadd
					activeId={this.state.activeId}
					onChange={this.onTabChange}
					onDelete={this.onTabDel}
					onAdd={this.onTabAdd}
				>
					{panels}
				</Tabs>
				<Tabs
					candel
					canadd
					type="card"
					activeId={this.state.activeId}
					onChange={this.onTabChange}
					onDelete={this.onTabDel}
					onAdd={this.onTabAdd}
				>
					{panels}
				</Tabs>
				<div>{i18n.desc}</div>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
