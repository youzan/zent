## Switch 开关

开关选择器。

### 使用指南

-  需要表示开关状态/两种状态之间的切换时。
-  切换 `Switch` 会直接触发状态改变。

### 代码演示

:::demo 基础用法
```jsx
import { Switch } from 'zent';

class Simple extends React.Component {
	state = {
		checked: true
	}

	handleChange = (checked) => {
		this.setState({ checked });
	}

	render() {
		return (
			<Switch checked={this.state.checked} onChange={this.handleChange} />
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::

:::demo 失效状态
```jsx
import { Switch } from 'zent';

ReactDOM.render(
	<div>
		<Switch checked disabled />
		&nbsp;&nbsp;
		<Switch checked={false} disabled />
	</div>
	, mountNode
);

```
:::

:::demo 开关大小
```jsx
import { Switch } from 'zent';

ReactDOM.render(
	<div>
		<Switch checked />
		&nbsp;&nbsp;
		<Switch size="small" />
	</div>
	, mountNode
);

```
:::

:::demo 开关loading
```jsx
import { Switch } from 'zent';

ReactDOM.render(
	<div>
		<Switch checked loading />
		&nbsp;&nbsp;
		<Switch loading />
		&nbsp;&nbsp;
		<Switch checked size="small" loading />
		&nbsp;&nbsp;
		<Switch size="small" loading />
	</div>
	, mountNode
);

```
:::

:::demo 自定义开关文案
```jsx
import { Switch } from 'zent';

class Simple extends React.Component {
	state = {
		checked: true
	}

	handleChange = (checked) => {
		this.setState({ checked });
	}

	render() {
		return (
			<Switch checked={this.state.checked} onChange={this.handleChange} checkedText={'open'} uncheckedText={'close'} />
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::

### API

| 参数            | 说明                           | 类型                  | 默认值         | 备选值       |
| ------------- | ---------------------------- | ------------------- | ----------- | --------- |
| checked       | 指定当前状态                       | bool                |         |           |
| onChange      | 变化时回调函数, 参数是改变后的 `checked` 值 | func(checked: bool) | `noop`      |           |
| disabled      | 状态控制                         | bool                | `false`     |           |
| checkedText   | 选中时的文案                       | string              | `'开启'`      |           |
| uncheckedText | 未选中时的文案                      | string              | `'关闭'`      |           |
| loading       | 加载中状态                        | bool                | `false`     |           |
| size          | 开关大小                         | string              | `'default'` | `'small'` |
| className     | 自定义额外类名                      | string              | `''`        |           |
| prefix        | 自定义前缀                        | string              | `'zent'`    |           |
