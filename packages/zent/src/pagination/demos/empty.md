---
order: 3
zh-CN:
  title: 无数据
en-US:
  title: No data
---

```jsx
import { Pagination, MiniPagination, LitePagination } from 'zent';

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
					total={0}
					onChange={this.onChange}
				/>

				<br />

				<LitePagination
					current={current}
					pageSize={pageSize}
					total={0}
					onChange={this.onChange}
				/>

				<br />

				<MiniPagination
					current={current}
					pageSize={pageSize}
					total={0}
					onChange={this.onChange}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Test />, mountNode);
```
