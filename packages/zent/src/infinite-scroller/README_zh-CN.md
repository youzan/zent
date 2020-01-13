---
title: InfiniteScroller
subtitle: 无限滚动
path: component/infinite-scroller
group: 展示
---

## InfiniteScroller 无限滚动组件

无限滚动组件

### 使用指南

- 常用于长列表内容的懒加载

### API

| 参数            | 说明                                                                    | 类型                                                              | 默认值         | 备选值  |
| --------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------- | -------------- | ------- |
| hasMore         | 是否还有更多数据待加载                                                  | `boolean`                                                         | `true`         | `false` |
| loadMore        | 加载更多的回调函数，如果函数接收参数则会传入一个停止 loading 效果的回调 | `(() => Promise<unknown>) | ((stopLoading?: () => void) => void)` |                |         |
| skipLoadOnMount | 初始化时是否触发一次数据加载                                            | `boolean`                                                         | `false`        | `true`  |
| useWindow       | 是否使用 `window` 作为滚动容器                                          | `boolean`                                                         | `false`        | `true`  |
| loader          | 加载时显示的内容                                                        | `ReactNode`                                                       | `BlockLoading` |         |
| className       | 自定义额外类名                                                          | `string`                                                          |                |         |

### loadMore

- 当异步加载时，期望传入的 `loadMore` 函数的返回值是一个 `Promise` 对象，用于组件控制 loading 的显示
- 你也可以使用 `loadMore` 的参数 `stopLoading` 手动停止 loading，此时不需要返回 `Promise`
