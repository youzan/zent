## ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

### 代码演示

:::demo 基础用法
```jsx
import { ColorPicker } from 'zent';

class Simple extends React.Component {
	state = {
		color: '#5197FF'
	}

	handleChange = (color) => {
		this.setState({
			color
		});
	}

	render() {
		const { color } = this.state;
		return (
			<div>
				<ColorPicker color={color} onChange={this.handleChange} />
				<div style={{ color }}>当前颜色：{color}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::


:::demo 选择透明度
```jsx
import { ColorPicker } from 'zent';

class Simple extends React.Component {
	state = {
		color: 'rgba(81, 151, 255, 0.6)',
		showAlpha: true
	}

	handleChange = (color) => {
		this.setState({
			color
		});
	}

	render() {
		const { color, showAlpha } = this.state;
		return (
			<div>
				<ColorPicker color={color} showAlpha={showAlpha} onChange={this.handleChange} />
				<div style={{ color }}>当前颜色：{color}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::

:::demo 简化版用法
```jsx
import { ColorPicker } from 'zent';

class Simple extends React.Component {
	state = {
		color: '#FF4444'
	}

	handleChange = (color) => {
		this.setState({
			color
		});
	}

	render() {
		const { color } = this.state;
		return (
			<div>
				<ColorPicker color={color} type="simple" onChange={this.handleChange} />
				<div style={{ color }}>当前颜色：{color}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::


:::demo 颜色面板
```jsx
import { ColorPicker } from 'zent';
const ColorBoard = ColorPicker.ColorBoard;

class Simple extends React.Component {
	state = {
		color: '#5197FF'
	}

	handleChange = (color) => {
		this.setState({
			color: color.hex
		});
	}

	render() {
		const { color, showAlpha } = this.state;
		return (
			<div>
				<ColorBoard color={color} onChange={this.handleChange} />
				<div className="marginTop10" style={{ color }}>当前颜色：{color}</div>
			</div>
		)
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);

```
:::

:::demo 选择透明度
```jsx
import { ColorPicker } from 'zent';
const ColorBoard = ColorPicker.ColorBoard;

class Simple extends React.Component {
	state = {
		color: 'rgba(81, 151, 255, 0.6)',
		showAlpha: true
	}

	handleChange = (color) => {
		this.setState({
			color: color.rgba
		});
	}

	render() {
		const { color, showAlpha } = this.state;
		return (
			<div>
				<ColorBoard color={color} showAlpha={showAlpha} onChange={this.handleChange} />
				<div className="marginTop10" style={{ color }}>当前颜色：{color}</div>
			</div>
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

#### ColorPicker

| 参数            | 说明               | 类型                |  默认值   | 可选值 |
| ------------- | ------------------- | ------------------- | ----------- | --------- |
| color         | 颜色选择器的颜色      | string              |          |   `'#5197FF'` 或  `'rgba(81, 151, 255, 0.6)'`  |
| showAlpha     | 是否显示透明度选择    | bool                | `false`  |   `true/false`     |
| type          | 颜色选择器类型       | string              | `'default'`   |   `'default'`、`'simple'`      |
| presetColors  | 简化版自定义颜色数组  | array | [`'#FFFFFF'`, `'#F8F8F8'`, `'#F2F2F2'`, `'#999999'`, `'#444444'`, `'#FF4444'`, `'#FF6500'`, `'#FF884D'`, `'#FFCD00'`, `'#3FBD00'`, `'#3FBC87'`, `'#00CD98'`, `'#5197FF'`, `'#BADCFF'`, `'#FFEFB8'`] |         |
| onChange      | 颜色变化时回调函数    | func(color)         | `noop`   |         |
| className     | 可选，自定义类名      | string              | `''`     |         |
| wrapperClassName | 可选，自定义trigger包裹节点的类名 | string | `''`    |         |
| prefix        | 可选，自定义前缀      | string              | `'zent'` |         |

#### ColorBoard

| 参数            | 说明               | 类型                |  默认值   | 可选值 |
| ------------- | ------------------- | ------------------- | ----------- | --------- |
| color         | 颜色选择器的颜色      | string              |          |   `'#5197FF'` 或  `'rgba(81, 151, 255, 0.6)'`  |
| showAlpha     | 是否显示透明度选择    | bool                | `false`  |   `true/false`     |
| onChange      | 颜色变化时回调函数    | func(color)         | `noop`   |         |
| className     | 可选，自定义类名      | string              | `''`     |         |
| prefix        | 可选，自定义前缀      | string              | `'zent'` |         |

<style>
	.marginTop10 {
		margin-top: 10px;
	}
</style>
