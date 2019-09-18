---
order: 2
zh-CN:
	title: 不使用TabPanel，只使用Tab展示导航
	tabOne: 选项一
	tabTwo: 选项二
	tabThree: 选项三
en-US:
	title: Tabs without using TabPanel
	tabOne: Tab One
	tabTwo: Tab Two
	tabThree: Tab Three
---

```jsx
import { Tabs } from 'zent';

class Simple extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeId: '2',
			tabs: [
				{
					title: '{i18n.tabOne}',
					key: '1',
					disabled: true,
				},
				{
					title: '{i18n.tabTwo}',
					key: '2',
				},
				{
					title: '{i18n.tabThree}',
					key: '3',
				},
			],
		};
	}

	onTabChange = id => {
		this.setState({
			activeId: id,
		});
	};

	render() {
		return (
			<Tabs
				activeId={this.state.activeId}
				onChange={this.onTabChange}
				tabs={this.state.tabs}
			/>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
