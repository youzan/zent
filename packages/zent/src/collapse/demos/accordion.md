---
order: 1
zh-CN:
	title: 手风琴风格，每次只能打开一个面板。
en-US:
	title: Accordion style, only one panel can be active at the same time.
---

```jsx
import { Collapse } from 'zent';

class Simple extends React.Component {
	state = {
		activeKey: '1'
	};

	handleChange(activeKey) {
		this.setState({
			activeKey
		});
	}

	render() {
		const { activeKey } = this.state;
		return (
			<Collapse activeKey={activeKey} onChange={this.handleChange.bind(this)} accordion>
				<Collapse.Panel title="11" key="1">fooba1r</Collapse.Panel>
				<Collapse.Panel title="22" key="2">foobar2</Collapse.Panel>
				<Collapse.Panel title="33" key="3">foobar3</Collapse.Panel>
			</Collapse>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
