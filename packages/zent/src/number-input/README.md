## NumberInput 数值输入框

数字输入组件，通过鼠标或键盘输入内容。

### 使用指南

- 输入内容仅为数字时，使用数字输入框比普通文本输入框更方便。

### 代码演示

:::demo 基础用法

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
	<div>
		<NumberInput value={2} placeholder="请输入数字"/>
		<NumberInput value={2} showStepper placeholder="请输入数字"/>
	</div>
	, mountNode
);

```
:::

:::demo 指定小数点精度

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
	<div>
		<NumberInput value={2} decimal={2} placeholder="请输入数字"/>
		<NumberInput value={2} showStepper decimal={2} placeholder="请输入数字"/>
	</div>
	, mountNode
);
```
:::

:::demo 控制可输入的数字范围

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
	<div>
		<NumberInput value={3} min={-2} max={6} decimal={2} placeholder="请输入数字"/>
		<NumberInput value={3} showStepper min={2} max={6} decimal={2} placeholder="请输入数字"/>
	</div>
	, mountNode
);
```
:::

:::demo disable状态

```jsx
import { NumberInput } from 'zent';

ReactDOM.render(
	<div>
		<NumberInput value={3} disabled placeholder="请输入数字"/>
		<NumberInput value={3} disabled showStepper placeholder="请输入数字"/>
	</div>
	, mountNode
);
```
:::

:::demo 事件处理

```jsx
import { NumberInput, Button } from 'zent';

class EventTest extends React.Component {
	state = {
		log: ''
	};

	onChange(ev) {
		this.setState({ log: ev.target.value });
	}

	setToThree= (ev) => {
		this.setState({ log: 3 });
	}

	render() {
		return (
			<div>
				<NumberInput
					showStepper
					value={this.state.log}
					onChange={this.onChange.bind(this)} 
					onPressEnter={() => console.log('pressed enter')}/>
				<Button onClick={this.setToThree}>变成3</Button>
			</div>
		);
	}
}

ReactDOM.render(
	<EventTest />
	, mountNode
);
```
:::


### API

| 参数           | 说明              | 类型            | 默认值      | 备选值                     | 是否必填 |
| ------------ | --------------- | ------------- | -------- | ----------------------- | ---- |
| value        | 输入值             | number        |          |                         | 否    |
| onChange     | change事件        | func(e:Event) |          |                         | 否    |
| showStepper  | 是否开启记步器         | bool        | `false` |                        | 否    |
| decimal      | 数值精度            | number        |          |                         | 否    |
| min      | 数值范围最小值            | number        |          |                         | 否    |
| max      | 数值范围最大值            | number        |          |                         | 否    |
| placeholder  | 原生placeholder文案 | string        | `''`     |                         | 否    |
| disabled     | 是否禁用            | bool          | `false`  |                         | 否    |
| className    | 自定义额外类名        | string        | `''`     |                         | 否    |
| prefix       | 自定义类前缀         | string        | `'zent'` |                         | 否    |

<style>
.zent-number-input-wrapper {
	width: 200px;
	margin-bottom: 20px;
}
</style>
