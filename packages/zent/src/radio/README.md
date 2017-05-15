## Checkbox 单选

单选框组件

### 使用指南

- `RadioGroup` 是一个[受控组件][https://facebook.github.io/react/docs/forms.html#controlled-components], 必须要设置 `onChange` 回调方法在组件外部处理 `value` 变化.

### 代码演示
:::demo 基本用法
```jsx
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
				<Radio value="male">男</Radio>
				<Radio value="female">女</Radio>
			</RadioGroup>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
:::

:::demo 不可用，整个`RadioGroup`都不可用
```jsx
import { Radio } from 'zent'

const RadioGroup = Radio.Group;

class App extends React.Component {

	state = {
		value: 'male'
	}

	onChange = (e) => {
		this.setState({ value: e.target.value });
	}

	render() {
		return (
			<RadioGroup onChange={this.onChange} value={this.state.value} disabled>
				<Radio value="male">男</Radio>
				<Radio value="female">女</Radio>
			</RadioGroup>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
:::

:::demo 不可用，部分选项不可用
```jsx
import { Radio } from 'zent'

const RadioGroup = Radio.Group;

class App extends React.Component {

	state = {
		value: 'apple'
	}

	onChange = (e) => {
		this.setState({ value: e.target.value });
	}

	render() {
		return (
			<RadioGroup onChange={this.onChange} value={this.state.value}>
				<Radio value="apple">苹果</Radio>
				<Radio value="pears">梨子</Radio>
				<Radio value="cucumber" disabled>黄瓜</Radio>
			</RadioGroup>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
:::

:::demo `value`可以是任意类型，可以使用`isValueEqual`来自定义比较函数
```jsx
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
				<Radio value={{ foo: 1 }}>foo 1</Radio>
				<Radio value={{ foo: 2 }}>foo 2</Radio>
			</RadioGroup>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
:::

### RadioGroup API

| 参数           | 说明                | 类型             | 默认值                 |
| ------------ | ----------------- | -------------- | ------------------- |
| value        | 用于设置当前选中的值        | any            |                     |
| onChange     | 选项变化时的回调函数        | func(e: event) |                     |
| isValueEqual | 可选参数，判断value值是否相等 | func(a, b)     | `(a, b) => a === b` |
| className    | 自定义额外类名           | string         |                     |
| prefix       | 自定义前缀             | string         | `'zent'`            |

### Radio API

| 参数        | 说明                   | 类型     | 默认值      |
| --------- | -------------------- | ------ | -------- |
| value     | 根据 value 进行比较，判断是否选中 | any    |          |
| className | 自定义额外类名              | string |          |
| prefix    | 自定义前缀                | string | `'zent'` |

[controlled-components]: https://facebook.github.io/react/docs/forms.html#controlled-components
