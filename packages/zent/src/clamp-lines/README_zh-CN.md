---
title: ClampLines
subtitle: 多行文本裁剪
path: component/clamp-lines
group: 展示
---

## ClampLines

限制文本最大行数。

- 自适应容器大小需要 `ResizeObserver` 支持，部分老浏览器需要自行引入 polyfill。
- 当 `ResizeObserver` 不存在时，该组件仅能处理由于窗口大小变化而导致的容器大小变化。

### API

| 参数        | 说明      | 类型     | 默认值  | 备选值 |
| --------- | ------- | ------ | ---- |-------|
| text      | 初始文本    | `string` | `''` |  |
| lines     | 显示文本的最大行数  | `number` | `2` |  |
| ellipsis  | 省略符号的样式  | string | `'...'` |  |
| showPop   | 是否显示Pop提示 | `boolean` | `true` |  |
| popWidth  | pop的宽度 | `number` | `250` |  |
| trigger   | Pop的触发方式 | `string` | `'hover'` | `'click'`, `'focus'` |
| renderPop | 自定义Pop content的显示 | `function` | `identity` |  |
| resizable | 是否响应容器的大小变化 | `boolean` | `false` |  |
| extra     | 额外节点，用于显示`更多`一类的操作 | `ReactElement` | `null` |  |
| className | 自定义额外类名 | `string` | `''` |  |
