---
order: 4
zh-CN:
	title: 加减用法
	tabOne: 选项1
	tabTwo: 选项2
	tabText: 选项
	tabOneCont: 选项1的内容
	tabTwoCont: 选项2的内容
en-US:
	title: Dynamic add and delete tab
	tabOne: Tab1
	tabTwo: Tab2
	tabText: Tab
	tabOneCont: The content of tab1.
	tabTwoCont: The content of tab2.
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
				content: '{i18n.tabOneCont}'
			}, {
				tab: <span>{i18n.tabTwo}</span>,
				id: '2',
				content: <div>{i18n.tabTwoCont}</div>
			}
		],
	}

	onTabAdd = () => {
				let { panels } = this.state;
			panels.push({
					tab: `{i18n.tabText}${uniqId}`,
					id: `${uniqId++}`,
					content: Date.now()
			});
			this.setState({
					panels
			});
		}

	onTabDel = ((id) => {
			let { panels } = this.state;
			let index = -1;
			panels.some((p, i) => {
					if (p.id === id) {
							index = i;
							return true;
					}
					return false;
			});
			if (index > -1) {
					panels.splice(index, 1);
					this.setState({
							panels
					});
			}
		})

	onTabChange = (id) => {
		this.setState({
			activeId: id
		});
	}

	renderPanels() {
		let { panels } = this.state;
		return panels.map((p) => {
			return (<TabPanel {...p} key={p.id}>{p.content}</TabPanel>);
		});
	}

	render() {
		return (
			<Tabs
				candel
				canadd
				activeId={this.state.activeId}
				onChange={this.onTabChange.bind(this)}
				onDelete={this.onTabDel.bind(this)}
				onAdd={this.onTabAdd.bind(this)}
			>
				{this.renderPanels()}
			</Tabs>
		);
	}
};

ReactDOM.render(<Simple />, mountNode);
```
