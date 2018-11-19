---
order: 5
zh-CN:
	title: 按钮样式
	apple: 苹果
	banana: 香蕉
	pear: 梨
	tomato: 西红柿
en-US:
	title: Button style
	apple: Apple
	banana: Banana
	pear: Pear
	tomato: Tomato
---

```js
import { Radio } from 'zent';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class App extends Component {
	state = {
		value: 'apple',
	};

	onChange = e => {
		this.setState({ value: e.target.value });
	};

	render() {
		return (
			<RadioGroup onChange={this.onChange} value={this.state.value}>
				<RadioButton value="apple" disabled>{i18n.apple}</RadioButton>
				<RadioButton value="pear" disabled>{i18n.pear}</RadioButton>
				<RadioButton value="banana">{i18n.banana}</RadioButton>
				<RadioButton value="tomato">{i18n.tomato}</RadioButton>
			</RadioGroup>
		);
	}
}

ReactDOM.render(<App />, mountNode);
```
