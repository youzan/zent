---
order: 1
zh-CN:
	title: 基础用法
	content: 当前颜色：
en-US:
	title: Basic usage
	content: Current color：
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
			<Collapse activeKey={activeKey} onChange={this.handleChange.bind(this)}>
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
