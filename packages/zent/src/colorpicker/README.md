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

| 参数           | 说明                           | 类型                  | 默认值         | 备选值       |
| ------------- | ---------------------------- | ------------------- | ----------- | --------- |
| color         | 颜色选择器的默认颜色           | bool                |         |           |
| showAlpha     | 变化时回调函数, 参数是改变后的 `checked` 值 | func(checked: bool) | `noop`      |           |
| onChange      | 状态控制                         | bool                | `false`     |           |
| className     | 状态控制                         | bool                | `false`     |           |
