---
order: 8
zh-CN:
  title: 支持多标签滚动查看
  tabPrefix: 选项

en-US:
  title: Operations in more tabs
  tabPrefix: Tab
---

```jsx
import { Tabs, Icon } from 'zent';

const tabs = Array(35)
	.fill(null)
	.map((_, index) => ({
		title: `tab${index + 1}`,
		key: index + 1,
	}));

class Simple extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeId: 10,
			tabs: tabs,
		};
	}

	onTabChange = id => {
		this.setState({
			activeId: id,
		});
	};

	onTabAdd = () => {
		let { tabs } = this.state;
		tabs.push({
			title: 'tab26',
			key: '26',
		});
		this.setState({
			tabs,
		});
	};
	render() {
		return (
			<div className="zent-tabs-demo">
				<Tabs
					activeId={this.state.activeId}
					onChange={this.onTabChange}
					tabs={this.state.tabs}
					overflowMode="slide"
					navExtraContent={
						<Icon
							type="plus"
							className="zent-tabs-add-btn"
							onClick={this.onTabAdd}
						/>
					}
				/>
				<Tabs
					activeId={this.state.activeId}
					onChange={this.onTabChange}
					tabs={this.state.tabs}
					overflowMode="anchor"
					type="card"
				/>
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
