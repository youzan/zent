---
title: ClampLines
path: component/clamp-lines
group: Data Display
---

## ClampLines

### API

| Props     | Description      | Type     | Default  | Alternative |
| --------- | ------- | ------ | ---- |-----|
| text      | Original text    | `string` | `''` |  |
| lines     | Max lines need to clamp    | `number` | `2` |  |
| ellipsis  | Ellipsis style  | string | `'...'` |  |
| showPop   | Show Pop or not | `boolean` | `true` |  |
| popWidth  | The width of pop | `number` | `250` |  |
| trigger   | The time to trigger pop | `string` | `'hover'` | `'click'`, `'focus'` |
| renderPop | customize your pop text | `function` | `identity` |  |
| resizable | If the container is resizable | `boolean` | `false` |  |
| delay     | resize debounce | `number` | `250` |  |
| extra     | Custom extra node，such as `More` | `ReactElement` | `null` |  |
| className  | Custom calssname | `string` | `''` |  |
| prefix     | Custom prefix | `string` | `zent` |  |