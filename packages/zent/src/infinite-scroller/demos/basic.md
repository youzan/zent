---
order: 1
zh-CN:
	title: 基础用法
en-US:
	title: Basic usage
---

```jsx
import { InfiniteScroller, Card } from 'zent';

class Simple extends React.Component {
	state = {
		list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
	}

	loadMore(closeLoading) {
		const { list } = this.state;
		const latestList = list.slice(list.length - 10);
		const newList = latestList.map(item => item + 10);

		setTimeout(() => {
			this.setState({
				list: [...list, ...newList]
			});
			closeLoading && closeLoading();

		}, 500);

	}

	render() {
		const { list } = this.state;
		return (
			<InfiniteScroller
				className="infinite-scroller-demo"
				useWindow={false}
				loadMore={this.loadMore.bind(this)}
			>
				{
					list.map(item => <Card key={item}>{item}</Card>)
				}
			</InfiniteScroller>
		);
	}
}

ReactDOM.render(
	<Simple />
	, mountNode
);
```
