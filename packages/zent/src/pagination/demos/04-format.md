---
order: 4
zh-CN:
  title: 格式化总数展示
en-US:
  title: Format total
---

```jsx
import { Pagination } from 'zent';

class Test extends Component {
	state = {
		pageSize: 10,
		current: 2,
	};

	onChange = options => {
		console.log(options);
		this.setState(options);
	};

	render() {
		const { current, pageSize } = this.state;

		return (
			<div>
				<Pagination
					current={current}
					pageSize={pageSize}
					total={101}
					formatTotal={(total) => '一百零一'}
					onChange={this.onChange}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Test />, mountNode);
```
