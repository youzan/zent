---
order: 5
zh-CN:
	title: 最后一页帮助提示
	help: 数据最多支持查看 %d 页
en-US:
	title: Tooltip for last page
	help: Show at most %d pages
---

```jsx
import { Pagination, MiniPagination, LitePagination } from 'zent';

const TOTAL = 101;

class Test extends Component {
	state = {
		pageSize: 10,
		current: 11,
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
					total={TOTAL}
					onChange={this.onChange}
					lastPageHelp={{
						content: '{i18n.help}'.replace('%d', TOTAL)
					}}
				/>

				<br />

				<LitePagination
					current={current}
					pageSize={pageSize}
					total={TOTAL}
					onChange={this.onChange}
					lastPageHelp={{
						content: '{i18n.help}'.replace('%d', TOTAL)
					}}
				/>

				<br />

				<MiniPagination
					current={current}
					pageSize={pageSize}
					total={TOTAL}
					onChange={this.onChange}
					lastPageHelp={{
						content: '{i18n.help}'.replace('%d', TOTAL)
					}}
				/>
			</div>
		);
	}
}

ReactDOM.render(<Test />, mountNode);
```
