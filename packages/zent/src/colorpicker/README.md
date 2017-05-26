## ColorPicker 颜色选择器

用于颜色选择，支持多种格式。

### 代码演示

:::demo 基础用法
```jsx
import { ColorPicker } from 'zent';

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

### API

| 参数       | 说明            | 类型     | 默认值    |
| -------- | ------------- | ------ | ------ |
| text     | notify通知文案    | any   | `''`   |
| duration | 持续时间          | number | `2000` |
| callback | 自定义notify结束回调 | func   |        |
