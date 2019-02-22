---
title: Loading
path: component/loading
group: Feedback
---

## Loading

`Loading` is used to indicate loading state.

### Guides

- You can use this component to reduce users' anxiety when the page is rendering or data is loading asynchronously.

### API

`Loading` has 3 different types: `BlockLoading`, `InlineLoading` and `FullScreenLoading`. Most of the props are shared between these types, but each type may have its own set of props.

#### Common props

| Property     | Description                          | Type   | Required | Default    | Alternative                      |
| ------------ | ------------------------------------ | ------ | -------- | ---------- | -------------------------------- |
| loading      | Loading state                        | bool   | No       | `false`    | `true`                           |
| delay        | Milliseconds to delay before loading | number | No       | `0`        |                                  |
| icon         | Icon type                            | string | No       | `'youzan'` | `'circle'`                       |
| iconSize     | Icon size                            | number | No       |            |                                  |
| iconText     | Icon text                            | string | No       |            |                                  |
| textPosition | Text position relative to icon       | string | No       | `'bottom'` | `'top'` \| `'left'` \| `'right'` |
| className    | Custom class                         | string | No       |            |                                  |

#### BlockLoading

Block level `Loading`, content can be wrapped or a default height will be used. Used for loading a page section.

| Property | Description                                                       | Type   | Required | Default | Alternative |
| -------- | ----------------------------------------------------------------- | ------ | -------- | ------- | ----------- |
| height   | Uses content height if wrapping content, or uses a default height | number | No       | `160`   |             |
| children | Wrapped content                                                   | node   | No       |         |             |

#### InlineLoading

Inline `Loading`, can't wrap content.

#### LoadingFullScreen

Full screen `Loading`, can't wrap content. Used for page loading.

| Property | Description  | Type   | Required | Default | Alternative |
| -------- | ------------ | ------ | -------- | ------- | ----------- |
| zIndex   | Mask z-index | number | No       |         |             |
