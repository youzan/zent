---
order: 1
zh-CN:
	title: 包裹模式
en-US:
  title: Wrapper Mode
---

```js
import { Loading, Switch } from 'zent';

class Wrapper extends React.Component {
	state = { loading: false }

	onChange = (value) => {
		this.setState({ loading: value });
	}

	render() {
		const { loading } = this.state;

		return (
			<div>
				<Loading show={loading}>
					<div className="zent-loading-example-hello-world">Hello World</div>
				</Loading>
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

<style>
.zent-loading-example-switch {
	margin-top: 10px;
}
.zent-loading-example-hello-world {
	background: #f8f8f8;
	text-align: center;
	height: 160px;
	line-height: 160px;
}
</style>
