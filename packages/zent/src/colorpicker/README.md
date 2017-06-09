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
			color,
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

### API

| 参数            | 说明               | 类型                |  默认值   | 可选值 |
| ------------- | ------------------- | ------------------- | ----------- | --------- |
| color         | 颜色选择器的颜色      | string              |          |   `#5197FF` 或  `rgba(81, 151, 255, 0.6)`  |
| showAlpha     | 是否显示透明度选择    | bool                | `false`  |   `true/false`     |
| onChange      | 颜色变化时回调函数    | func(color)         | `noop`   |         |
| className     | 可选，自定义类名      | string              | `''`     |         |
| wrapperClassName | 可选，自定义trigger包裹节点的类名 | string | `''`    |         |
| prefix        | 可选，自定义前缀      | string              | `'zent'` |         |
