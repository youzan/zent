---
title: ErrorBoundary
path: component/error-boundary
group: Basics
---

## ErrorBoundary

Catch errors down in the component tree. It is the `try...catch...` to `React` component tree.

### Guides

Use this to separate component errors within a page. `ErrorBoundary` catches errors during component life cycle down in the component tree so that errors occur in one part of the page will not affect other parts of the same page.

For example, say we have a page that is divided into two parts: navigation on the left and main content on the right. You can use `ErrorBoundary` to wrap both parts so that errors occur in one part will not break the other part of the page.

Note：

- Errors in `React` event handlers will not be catched
- Errors in asynchronous code(e.g. `setTimeout`，`requestAnimationFrame`) will not be catched
- Requires `React 16` or newer version

### API

| Property     |   Description  | Type     |  Required  |   Default  | Alternative       |
| ------------ | ------------- | -------- | ---------- | ---------- | ----------------- |
| children    | Children component to guard | `node` | Yes | | |
| onError     | Callback when an error occurs inside a child component | `(error: Error, stackTrace: string): void` | No | | |
| FallbackComponent      | Component to render when an error occurs      | `Component`     |  No   |     |  |

`FallbackComponent` has two props: `error` and `componentStack`，they are the same as `onError`'s parameters。

#### withErrorBoundary

This is a high order component, it provides the same functionality as `ErrorBoundary`.

```ts
withErrorBoundary({
	BaseComponent: React.Component,
	onError?: (error: Error, stackTrace: string): void,
	FallbackComponent?: React.Component
}): React.Component
```

#### catchError

This HOC is the same as `withErrorBoundary`, but more decorator friendly.

```ts
catchError({
	onError?: (error: Error, stackTrace: string): void,
	FallbackComponent?: React.Component
}): ((BaseComponent: React.Component): React.Component)
```


