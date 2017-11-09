---
order: 1
zh-CN:
	title: 基础用法
	male: 男
	female: 女
en-US:
	title: Basic Usage
	male: Male
	female: Female
---

```js
import { Radio } from 'zent';

const RadioGroup = Radio.Group;

class App extends Component {

	state = {
		value: 'male'
	}

	onChange = (e) => {
		this.setState({ value: e.target.value });
	}

	render() {
		return (
			<RadioGroup onChange={this.onChange} value={this.state.value}>
				<Radio value="male">{i18n.male}</Radio>
				<Radio value="female">{i18n.female}</Radio>
			</RadioGroup>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
