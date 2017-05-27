## ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

### 代码演示

:::demo 基础用法
```jsx
import { ColorPicker } from 'zent';

class Simple extends React.Component {
	state = {
		color: 'rgba(81, 151, 255, 0.8)',
		colorObj: {
			r: 85,
			g: 189,
			b: 71,
			a: 1
		}
	}

	handleChange = (color) => {
		this.setState({
			color: color.rgb,
			colorObj: color.rgb
		});
	}

	render() {
		const { color, colorObj } = this.state;
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




### API

| 参数       | 说明            | 类型     | 默认值    |
| -------- | ------------- | ------ | ------ |
| text     | notify通知文案    | any   | `''`   |
| duration | 持续时间          | number | `2000` |
| callback | 自定义notify结束回调 | func   |        |
