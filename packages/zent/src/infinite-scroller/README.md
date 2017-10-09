## InfiniteScroller 无限滚动组件

无限滚动组件

### 使用指南

-  常用于一个区域内内容的滚动加载

### 代码演示

:::demo 基础用法
```jsx
import { InfiniteScroller, Card } from 'zent';

class Simple extends React.Component {
	state = {
		list: [1, 2, 3, 4, 5, 6, 7, 8, 9]
	}

	loadMore = () => {
		const { list } = this.state;
		const last = list[list.length - 1];

		this.setState({
			list: [...list, last + 1]
		});
	}

	render() {
		const { list } = this.state;
		return (
			<InfiniteScroller
				className="infinite-scroller-demo"
				loadMore={this.loadMore}
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
:::

### API

| 参数             	 	| 说明                          | 类型                | 默认值       		 | 备选值           							  			         |
| ------------------ | ---------------------------- | ------------------- | ---------------- | --------------------------------------------  |
| hasMore        | 是否可以调用加载更多方法         | bool                | `true`           | `false`, `true`                               |
| loadMore      		 | 加载更多的回调函数              | func                |                  |  							  			                       |
| offset             | 触发滚动加载的阈值              | number              | 20               |                                               |
| className          | 自定义额外类名                  | string              | `''`						 |                                               |
| prefix             | 自定义前缀                     | string              | `'zent'`				  |																			          |

<style>
.infinite-scroller-demo {
	height: 300px;
}
</style>
