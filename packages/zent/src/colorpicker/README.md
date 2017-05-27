## ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

### 代码演示

:::demo 基础用法
```jsx
import { ColorPicker } from 'zent';

class Simple extends React.Component {
	state = {
    color: '#55bd47',
    colorObj: {
      r: 85,
      g: 189,
      b: 71,
      a: 1
    }
  }

	handleChange = (color) => {
    this.setState({
      color: color.hex,
      colorObj: color.rgb
    });
  }

	render() {
		const { color, colorObj } = this.state;
		return (
			<PopColorPicker color={color} onChange={this.handleChange} />
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

| 参数       | 说明            | 类型     | 默认值    |
| -------- | ------------- | ------ | ------ |
| text     | notify通知文案    | any   | `''`   |
| duration | 持续时间          | number | `2000` |
| callback | 自定义notify结束回调 | func   |        |
