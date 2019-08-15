---
order: 7
zh-CN:
	title: 垂直模式
	tabOne: 选项1
	tabTwo: 选项2
	tabThree: 选项3
en-US:
	title: Vertical Mode
	tabOne: Tab1
	tabTwo: Tab2
	tabThree: Tab3
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
				type="vertical"
				activeId={this.state.activeId}
				onChange={this.onTabChange}
				tabs={this.state.tabs}
			/>
		);
	}
}


ReactDOM.render(<Simple />, mountNode);
```
