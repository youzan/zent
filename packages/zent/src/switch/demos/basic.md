---
order: 1
zh-CN:
  title: 基础用法
en-US:
  title: Basic usage
---

```jsx
import { Switch } from 'zent';

class Simple extends React.Component {
	state = {
		checkedLarge: true,
		checkedSmall: true,
	};

	handleChangeLarge = checked => {
		this.setState({ checkedLarge: checked });
	};

	handleChangeSmall = checked => {
		this.setState({ checkedSmall: checked });
	};

	render() {
		return (
			<div>
				<Switch
					checked={this.state.checkedLarge}
					onChange={this.handleChangeLarge}
				/>
				&nbsp;&nbsp;
				<Switch
					size="small"
					checked={this.state.checkedSmall}
					onChange={this.handleChangeSmall}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Simple />, mountNode);
```
