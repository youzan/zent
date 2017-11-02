---
title: InfiniteScroller
path: component/infinite-scroller
group: Data Display
---

## InfiniteScroller

infinite scrolling widget

### Guides

- Used to load content continuously as the user scrolls down the page.

### API

| Property             	 	| Description                          | Type                | Default       		 | Alternative           							  			         |
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

when it is a async loading, it is expected that the return of loadMore function is a Promise that is used to control loading show. or you have to stop loading by yourself with the first param as callback from loadMore function


<style>
.infinite-scroller-demo {
	height: 300px;
}
</style>
