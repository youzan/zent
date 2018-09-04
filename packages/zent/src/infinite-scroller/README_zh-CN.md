---
title: InfiniteScroller
subtitle: 无限滚动
path: component/infinite-scroller
group: 展示
---

## InfiniteScroller 无限滚动组件

无限滚动组件

### 使用指南

-  常用于一个区域内内容的滚动加载

### API

| 参数             	 	| 说明                          | 类型                | 默认值       		 | 备选值           							  			         |
| ------------------ | ---------------------------- | ------------------- | ---------------- | --------------------------------------------  |
| hasMore            | 是否可以调用loadMore回调        | bool                | `true`           | `false`, `true`                               |
| loadMore      		 | 加载更多的回调函数，如果函数接收参数则会传入一个停止loading效果的回调| func(stopLoading)   |                  |  							  |
| initialLoad        | 初始化时是否调用loadMore回调    | bool                |  `true`         | `false`, `true`                               |
| useWindow          | 是否监听window上的滚动事件，如果传入false，则监听该DOM元素上的滚动事件| bool | `true` | `false`, `true`                        |
| useCapture         | 滚动事件是否在事件捕获阶段接收    | bool                | `false`          | `false`, `true`                               |
| loader             | 加载时显示的内容                | node                | zent的Loading    |                                               |  
| offset             | 触发滚动加载的阈值              | number              | 20               |                                               |
| className          | 自定义额外类名                  | string              | `''`						 |                                               |
| prefix             | 自定义前缀                     | string              | `'zent'`				  |																			          |

### loadMore

当异步加载时，期望传入的loadMore函数的返回值是一个promise对象，用于组件控制loading的显示，否则需要使用loadMore的回调函数手动停止loading。

### useWindow

默认为true，作用于全屏的滚动加载，如果需要限定为某一个区域内的滚动加载，则将此参数置为false

<style>
.infinite-scroller-demo {
	height: 300px;
}
</style>
