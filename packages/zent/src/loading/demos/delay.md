---
order: 3
zh-CN:
  title: 延迟 1s 显示
en-US:
  title: Delay 1 seconds
---

```js
import { BlockLoading, Switch } from 'zent';

class Wrapper extends React.Component {
	state = { loading: false };

	onChange = value => {
		this.setState({ loading: value });
	};

	render() {
		const { loading } = this.state;

		return (
			<div>
				<BlockLoading loading={loading} delay={1000} />
				<Switch
					className="zent-loading-example-switch"
					checked={loading}
					onChange={this.onChange}
					size="small"
				/>
			</div>
		);
	}
}

ReactDOM.render(<Wrapper />, mountNode);
```
