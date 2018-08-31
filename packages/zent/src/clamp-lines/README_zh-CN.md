---
title: ClampLines
subtitle: 多行文本裁剪
path: component/clamp-lines
group: 展示
---

## ClampLines

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
| resizable | 是否响应窗口的resize | `boolean` | `false` |  |
| delay     | 延迟响应窗口的时间 | `number` | `250` |  |
| extra     | 额外节点，用于显示`更多`一类的操作 | `ReactElement` | `null` |  |
| className | 自定义额外类名 | `string` | `''` |  |
| prefix    | 自定义前缀 | `string` | `zent` |  |