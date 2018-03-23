---
order: 4
zh-CN:
	title: 支持自定义比较函数
en-US:
	title: Custom comparison function
---

```js
import { Radio } from 'zent'

const RadioGroup = Radio.Group;

class App extends React.Component {

	state = {
		value: {
			foo: 1	
		}
	}

	onChange = (e) => {
		this.setState({ value: e.target.value });
	}

	isValueEqual(a, b) {
		return a && b && a.foo === b.foo;	
	}

	render() {
		return (
			<RadioGroup 
				value={this.state.value}
				isValueEqual={this.isValueEqual}
				onChange={this.onChange} 
			>
				<Radio value={{ foo: 1 }}>Foo 1</Radio>
				<Radio value={{ foo: 2 }}>Foo 2</Radio>
			</RadioGroup>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
