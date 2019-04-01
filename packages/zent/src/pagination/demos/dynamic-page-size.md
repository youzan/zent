---
order: 2
zh-CN:
  title: 修改分页大小
en-US:
  title: Change page size
---

```jsx
import { Pagination } from 'zent';

const PAGE_SIZE_OPTIONS = [10, 20, 30];

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
					pageSizeOptions={PAGE_SIZE_OPTIONS}
					total={101}
					onChange={this.onChange}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Test />, mountNode);
```
