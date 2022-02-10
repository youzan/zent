---
title: Loading
path: component/loading
group: Feedback
---

## Loading

Shows the loading state of data without a specific duration.

### Suggestion

- Used for operations that cannot be performed immediately and require only a short period of time;
- Used when retrieving or refreshing small amounts of data, such as status.

### Note

- It is not allowed to trigger the loading of multiple items or operations at once, except during the initial page load or refresh.

### API

`Loading` has 3 different types: `BlockLoading`, `InlineLoading` and `FullScreenLoading`. Most of the props are shared between these types, but each type may have its own set of props.

#### Common props

| Property     | Description                          | Type      | Required | Default     | Alternative                      |
| ------------ | ------------------------------------ | --------- | -------- | ----------- | -------------------------------- |
| loading      | Loading state                        | `boolean` | No       | `false`     | `true`                           |
| delay        | Milliseconds to delay before loading | `number`  | No       | `0`         |                                  |
| icon         | Icon type                            | `string`  | No       | `'circle'`  | `'youzan'`                       |
| iconSize     | Icon size                            | `number`  | No       |             |                                  |
| iconText     | Icon text                            | `string`  | No       |             |                                  |
| colorPreset  | Color preset                         | `string`  | No       | `'primary'` | `'grey'`                         |
| textPosition | Text position relative to icon       | `string`  | No       | `'bottom'`  | `'top'` \| `'left'` \| `'right'` |
| textSize     | Text Font Size                       | `number`  | No       |             |
| className    | Custom class                         | `string`  | No       |             |                                  |

#### BlockLoading

Block level `Loading`, content can be wrapped or a default height will be used. Used for loading a page section.

| Property | Description                                                       | Type        | Required | Default | Alternative |
| -------- | ----------------------------------------------------------------- | ----------- | -------- | ------- | ----------- |
| height   | Uses content height if wrapping content, or uses a default height | `number`    | No       | `160`   |             |
| children | Wrapped content                                                   | `ReactNode` | No       |         |             |

#### InlineLoading

Inline `Loading`, can't wrap content.

#### LoadingFullScreen

Full screen `Loading`, can't wrap content. Used for page loading.

| Property       | Description             | Type     | Required | Default | Alternative |
| -------------- | ----------------------- | -------- | -------- | ------- | ----------- |
| zIndex         | Mask z-index            | `number` | No       |         |             |
| showBackground | Show loading Background | `bool`   | No       |         |             |
