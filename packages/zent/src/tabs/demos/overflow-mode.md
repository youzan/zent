---
order: 8
zh-CN:
  title: 支持多标签滚动查看（仅限 `normal` 、`card` 类型）
  tabPrefix: 选项

en-US:
  title: Operations in more tabs (only avaliable in `normal` and `card` type)
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

	render() {
		return (
			<div className="zent-tabs-demo">
				<Tabs
					activeId={this.state.activeId}
					onChange={this.onTabChange}
					tabs={this.state.tabs}
					overflowMode="slide"
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
