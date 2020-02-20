---
order: 1
zh-CN:
  title: 基础用法
en-US:
  title: Basic Usage
---

```jsx
import { Pagination, MiniPagination, LitePagination } from 'zent';

class Test extends Component {
	state = {
		pageSize: 10,
		current: 1,
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
					onChange={this.onChange}
				/>

				<br />

				<LitePagination
					current={current}
					pageSize={pageSize}
					total={101}
					onChange={this.onChange}
				/>

				<br />

				<MiniPagination
					current={current}
					pageSize={pageSize}
					total={101}
					onChange={this.onChange}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Test />, mountNode);
```
