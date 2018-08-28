---
title: InfiniteScroller
path: component/infinite-scroller
group: Data Display
---

## InfiniteScroller

Infinite scrolling widget

### Guides

- Used to load content continuously as the user scrolls down the page.

### API

| Property             	 	| Description                          | Type                | Default       		 | Alternative           							  			         |
| ------------------ | ---------------------------- | ------------------- | ---------------- | --------------------------------------------  |
| hasMore            | if pass true, it will call loadMore function        | bool                | `true`           | `false`, `true`                               |
| loadMore      		 | loadMore function, first argument is a callback to stop loading animation effect| func(stopLoading)   |                  |  							  |
| initialLoad        | whether it should be call loadMore function when it initialize    | bool                |  `true`         | `false`, `true`                               |
| useWindow          | if pass true, it will listens window scroll event, or it will listens it's DOM element scroll event | bool | `true` | `false`, `true`                        |
| useCapture         | whether to capture event when scroll event triggers  | bool                | `false`          | `false`, `true`                               |
| loader             | showing content when it is loaded                | node                | zent's Loading    |                                               |  
| offset             | it will loads data when the distance threshold has been reached              | number              | 20               |                                               |
| className          | custom extra classname                  | string              | `''`						 |                                               |
| prefix             | custom class prefix                     | string              | `'zent'`				  |																			          |

### loadMore

When it is a async loading, it is expected that the return of loadMore function is a Promise that is used to control loading show. or you have to stop loading by yourself with the first param as callback from loadMore function

### useWindow

The default prop is true, it's a full-screen scroll load, if you need to limit the scroll load within a region, then set this prop to false

<style>
.infinite-scroller-demo {
	height: 300px;
}
</style>
