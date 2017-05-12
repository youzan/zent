## Checkbox 多选

### 使用指南

- Checkbox 表现为一个[受控组件][https://facebook.github.io/react/docs/forms.html#controlled-components], 需要设置 `onChange` 回调在组件外部处理其 `value` 属性的变化.

- `value` 支持任意类型的值, 包括引用类型.

### 代码演示
:::demo 基本用法
```jsx
import { Checkbox } from 'zent';

class App extends React.Component {

	state = {
		checked: true
	}

	handleChange = (e) => {
		this.setState({
			checked: e.target.checked
		})
	}

	render() {
		const { checked } = this.state
		return (
			<Checkbox checked={checked} onChange={this.handleChange}>Checkbox</Checkbox>
		)
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
:::


:::demo 不可用
```jsx
import { Checkbox } from 'zent';

ReactDOM.render(
	<div>
		<Checkbox checked disabled />
		<Checkbox disabled />
	</div>
	, mountNode
);
```
:::

:::demo Checkbox组
```jsx
import { Checkbox } from 'zent';
const CheckboxGroup = Checkbox.Group;

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
				<CheckboxGroup value={checkedList} onChange={this.onChange}>
					<Checkbox value="Apple">苹果</Checkbox>
					<Checkbox value="Pear">梨子</Checkbox>
					<Checkbox value="Orange">橘子</Checkbox>
					<Checkbox value="OrangeDisabled" disabled>烂橘子</Checkbox>
				</CheckboxGroup>
			</div>
		);
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
:::

:::demo 全选，在实现全选效果时，你可能会用到 indeterminate 属性。
```jsx
import { Checkbox } from 'zent'

const CheckboxGroup = Checkbox.Group
const ITEMS = ['Item 1', 'Item 2', 'Item 3']

class App extends Component {

	state = {
		checkedList: []
	}

	handleCheckedAll = (e) => {
		this.setState({
			checkedList: e.target.checked ? ITEMS.slice() : []
		})
	}

	handleChange(checkedList) {
		this.setState({ checkedList })
	}

	render() {
		const { checkedList } = this.state
		const checkedAll = !!checkedList.length && (checkedList.length === ITEMS.length)
		const indeterminate = !!checkedList.length && (checkedList.length !== ITEMS.length)

		return (
			<div>
				<Checkbox 
					checked={checkedAll}
					indeterminate={indeterminate}
					onChange={this.handleCheckedAll}
				>全选</Checkbox>

				<hr />

				<CheckboxGroup 
					value={checkedList}
					onChange={this.handleChange.bind(this)}
				>
					{ITEMS.map(item => {
                        return <Checkbox key={item} value={item}>{item}</Checkbox>
                    })}
				</CheckboxGroup>
			</div>
		)
	}
}

ReactDOM.render(
	<App />
	, mountNode
);
```
:::

### Checkbox API

| 参数            | 说明        | 类型            | 默认值      |
| ------------- | --------- | ------------- | -------- |
| checked       | 指定当前是否选中  | bool          | `false`  |
| value         | 组件对应的值，在`CheckboxGroup`中使用    | any           |          |
| disabled      | 使组件不可用    | bool          |          |
| indeterminate | 展示部分选中的模式 | bool          | `false`  |
| onChange      | 变化时回调函数   | func(e:Event) |          |
| className     | 自定义额外类名   | string        |          |
| prefix        | 自定义前缀     | string        | `'zent'` |

### Checkbox Group API

| 参数           | 说明              | 类型                 | 默认值             |
| ------------ | --------------- | ------------------ | --------------- |
| value        | 必填，指定选中的选项      | array<any>         | `[]`            |
| isValueEqual | 可选，判断value值是否相等 | func(a, b)         | `() => a === b` |
| disabled     | 使组件不可用          | bool               |                 |
| onChange     | 变化时回调函数         | func(checkedValueList) |                 |
| className    | 自定义额外类名         | string             |                 |
| prefix       | 自定义前缀           | string             | `'zent'`        |

[controlled-components]: https://facebook.github.io/react/docs/forms.html#controlled-components

<style type="text/css">
	.zent-checkbox-doc-p {
		font-size: 12px;
		line-height: 2em;
	}
</style>
