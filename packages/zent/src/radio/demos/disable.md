---
order: 2
zh-CN:
	title: 禁用状态
	male: 男
	female: 女
	apple: 苹果
	pear: 梨子
	pangxie: 黄瓜
en-US:
	title: Disable State
	male: Male
	female: Female
	apple: Apple
	pear: Pear
	pangxie: Cucumber
---

```js
import { Radio } from 'zent'

const RadioGroup = Radio.Group;

class App extends React.Component {

	state = {
		value: 'male',
		valueCopy: 'apple'
	}

	onChange = (e) => {
		this.setState({ value: e.target.value });
	}

	onChangeCopy = (e) => {
		this.setState({ valueCopy: e.target.value });
	}

	render() {
		return (
			<div>
				<RadioGroup onChange={this.onChange} value={this.state.value} disabled>
					<Radio value="male">{i18n.male}</Radio>
					<Radio value="female">{i18n.female}</Radio>
				</RadioGroup>
				<br />
				<br />
				<br />
				<RadioGroup onChange={this.onChangeCopy} value={this.state.valueCopy}>
					<Radio value="apple">{i18n.apple}</Radio>
					<Radio value="pears">{i18n.pear}</Radio>
					<Radio value="cucumber" disabled>{i18n.pangxie}</Radio>
				</RadioGroup>
			</div>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
