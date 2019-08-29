---
order: 7
zh-CN:
	title: 竖直模式
	tabOne: 选项1
	tabTwo: 选项2
	tabThree: 选项3
	tabOneCont: 选项一的内容
	tabTwoCont: 选项二的内容
	tabThreeCont: 选项三的内容
	desc: 竖直模式下，无法使用内部的删除、对齐、伸展、额外内容等功能
en-US:
	title: Vertical Mode
	tabOne: Tab1
	tabTwo: Tab2
	tabThree: Tab3
	tabOneCont: The content of tab one.
	tabTwoCont: The content of tab two.
	tabThreeCont: The content of tab three.
	desc: Can't use delete, align, stretch and extra content feature in vertical mode
---

```jsx
import { VerticalTabs } from 'zent';

const { TabPanel, Divide } = VerticalTabs;

class Simple extends Component {
	constructor(props) {
		super(props);

		this.state = {
			activeId: '2',
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
				<VerticalTabs
					activeId={this.state.activeId}
					onChange={this.onTabChange}
				>
					<TabPanel tab={<span>{i18n.tabOne}</span>} id="1" disabled>
						<div>{i18n.tabOneCont}</div>
					</TabPanel>
					<TabPanel tab="{i18n.tabTwo}" id="2">
						<div>{i18n.tabTwoCont}</div>
					</TabPanel>
					<Divide />
					<TabPanel tab="{i18n.tabThree}" id="3">
						<div>{i18n.tabThreeCont}</div>
					</TabPanel>
				</VerticalTabs>
				<VerticalTabs
					tabs={[
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
							divide: true,
						},
						{
							title: '{i18n.tabThree}',
							key: '3',
						},
					]}
					activeId={this.state.activeId}
					onChange={this.onTabChange}
					scrollHeight={100}
				/>
				<div>{i18n.desc}</div>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
