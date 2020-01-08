---
title: InfiniteScroller
path: component/infinite-scroller
group: Data Display
---

## InfiniteScroller

Infinite scrolling widget

### Guides

- Lazy load long list

### API

| Property        | Description                         | Type                                                              | Default        | Alternative |
| --------------- | ----------------------------------- | ----------------------------------------------------------------- | -------------- | ----------- |
| hasMore         | More data to load                   | `boolean`                                                         | `false`        | `true`      |
| loadMore        | Callback to load more data          | `(() => Promise<unknown>) | ((stopLoading?: () => void) => void)` |
| skipLoadOnMount | Don't trigger a loading on mount    | `boolean`                                                         | `false`        | `true`      |
| useWindow       | Use `window` as scrolling container | `boolean`                                                         | `false`        | `true`      |
| loader          | Loading content                     | `ReactNode`                                                       | `BlockLoading` |             |
| className       | Custom class name                   | `string`                                                          |                |             |

### loadMore

- Return a `Promise` to stop loading when request is done
- Or you can call `stopLoading` passed as the first argument to `loadMore`
