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
:::

### API

| 参数             	 	| 说明                          | 类型                | 默认值       		 | 备选值           							  			         |
| ------------------ | ---------------------------- | ------------------- | ---------------- | --------------------------------------------  |
| hasMore            | 是否可以调用loadMore回调        | bool                | `true`           | `false`, `true`                               |
| loadMore      		 | 加载更多的回调函数，如果函数接收参数则会传入一个停止loading效果的回调| func(stopLoading)   |                  |  							  |
| initialLoad        | 初始化时是否调用loadMore回调    | bool                |  `false`         | `false`, `true`                               |
| useWindow          | 是否监听window上的滚动事件，如果传入false，则监听该DOM元素上的滚动事件| bool | `true` | `false`, `true`                        |
| useCapture         | 滚动事件是否在事件捕获阶段接收    | bool                | `false`          | `false`, `true`                               |
| loader             | 加载时显示的内容                | node                | zent的Loading    |                                               |  
| offset             | 触发滚动加载的阈值              | number              | 20               |                                               |
| className          | 自定义额外类名                  | string              | `''`						 |                                               |
| prefix             | 自定义前缀                     | string              | `'zent'`				  |																			          |

### loadMore
如果是异步加载，期望该回调函数的返回值是一个promise对象，便于组件控制loading的显示，否则会传入一个用于停止loading的回调函数

<style>
.infinite-scroller-demo {
	height: 300px;
	overflow-y: auto;
}
</style>
