---
order: 3
zh-CN:
	title: Checkbox组
	apple: 苹果
	pear: 梨子
	orange: 橘子
	rottenOrange: 烂苹果
en-US:
	title: Checkbox group
	apple: Apple
	pear: Pear
	orange: Orange
	rottenOrange: Rotten Apple
---

```jsx
import { Checkbox } from 'zent';

class App extends React.Component {

	state = {
		checkedList: []
	}

	onChange = (checkedList) => {
		this.setState({ checkedList });
	}

	render() {
		const { checkedList } = this.state;

		return (
			<div>
				<Checkbox.Group value={checkedList} onChange={this.onChange}>
					<Checkbox value="Apple">{i18n.apple}</Checkbox>
					<Checkbox value="Pear">{i18n.pear}</Checkbox>
					<Checkbox value="Orange">{i18n.orange}</Checkbox>
					<Checkbox value="OrangeDisabled" disabled>{i18n.rottenOrange}</Checkbox>
				</Checkbox.Group>
			</div>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
