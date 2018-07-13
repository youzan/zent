---
title: ErrorBoundary
subtitle: 错误隔离
path: component/error-boundary
group: 基础
---

## ErrorBoundary 错误隔离

捕获子组件的错误，作用类似 `JavaScript` 的 `try...catch...`，但是作用于 `React` 组件树。

### 使用场景

用于隔离页面组件的错误。当 `ErrorBoundary` 子组件中某个组件出错时将错隔离在当前 `ErrorBoundary` 内，使页面其他部分不受这个错误影响。

例如，页面分为左右两部分：左侧导航栏，右侧内容区域。可以用 `ErrorBoundary` 组件分别包裹左右两部分，某一部分出错挂掉的时候不会导致另一部分功能失效。

注意：

- 事件回调函数（例如 `onClick`）中出现的异常不会被捕获
- 异步代码（例如 `setTimeout`，`requestAnimationFrame` 等）中的异常也不会被捕获
- 需要 `React 16` 及以上版本支持，老版本中该组件不会生效

### API

| 参数         |   说明         | 类型     | 是否必须    | 默认值      | 备选值            |
| ------------ | ------------- | -------- | ---------- | ---------- | ----------------- |
| children    | 受保护的子组件 | `node` | 是 | | |
| onError     | 子组件出错时的回调函数 | `(error: Error, componentStack: string): void` | 否 | | |
| FallbackComponent      | 出错时用来替换子组件的组件       | `Component`     |  否   |     |  |

`FallbackComponent` 接受两个参数: `error` 以及 `componentStack`，和 `onError` 一致。

#### withErrorBoundary

这个高阶组件可以用来装饰组件，装饰后的组件会自动隔离自身以及子组件的错误。函数原型：

```ts
withErrorBoundary({
	BaseComponent: React.Component,
	onError?: (error: Error, stackTrace: string): void,
	FallbackComponent?: React.Component
}): React.Component
```

#### catchError

这个高阶组件更适合用在使用 decorator 的场景，功能和 withErrorBoundary 一致。函数原型：

```ts
catchError({
	onError?: (error: Error, stackTrace: string): void,
	FallbackComponent?: React.Component
}): ((BaseComponent: React.Component): React.Component)
```
