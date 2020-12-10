---
title: ClampLines
path: component/clamp-lines
group: Data Display
---

## ClampLines

Limit number of lines shown for text.

- Reacting to container resize requires `ResizeObserver`, you may need to provide your own polyfill for legacy browsers.
- `resizable` will only work on Window resize if `ResizeObserver` is not available

### API

| Props     | Description                       | Type                               | Default         | Alternative          |
| --------- | --------------------------------- | ---------------------------------- | --------------- | -------------------- |
| text      | Original text                     | `string`                           | `''`            |                      |
| lines     | Max lines need to clamp           | `number`                           | `2`             |                      |
| ellipsis  | Ellipsis style                    | string                             | `'...'`         |                      |
| showPop   | Show Pop or not                   | `boolean`                          | `true`          |                      |
| popWidth  | The width of pop                  | `number`                           | `250`           |                      |
| trigger   | The time to trigger pop           | `string`                           | `'hover'`       | `'click'`, `'focus'` |
| renderPop | customize your pop text           | `function`                         | `identity`      |                      |
| resizable | React to container resize         | `boolean`                          | `false`         |                      |
| mode      | Select algorithm                  | `'performance'` \| `'correctness'` | `'performance'` | `'correctness'`      |
| extra     | Custom extra node，such as `More` | `ReactElement`                     | `null`          |                      |
| className | Custom calssname                  | `string`                           | `''`            |                      |

`correctness` mode is an order of magnitude slower than `performance` mode, so use it only when there's no other way.
