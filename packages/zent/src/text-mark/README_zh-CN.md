---
title: TextMark
subtitle: 高亮关键字
path: component/text-mark
group: 展示
---

## TextMark

高亮文本中的关键字，样式可以自定义。

### API

| 参数            | 说明            | 类型   | 是否必须 | 默认值 | 备选值 |
| --------------- | --------------- | ------ | -------- | ------ | ------ |
| textToHighlight | 需要做关键字高亮的文本 | string | 是 | | |
| searchWords | 搜索的关键字，搜索前会转换成正则表达式 | Array<string \| RegExp> | 是 | | |
| highlightClassName | 高亮状态的 CSS 类名，可以为不同关键字设置不同的类名 | string \| object | 否 | | |
| highlightStyle | 高亮状态的内联样式 | object | 否 | | |
| activeClassName | 选中状态的 CSS 类名 | string | 否       |        |        |
| activeStyle | 选中状态的内联样式 | object | 否 |  | |
| activeIndex | 选中状态的下标 | number | 否 | | |
| unhighlightClassName | 未高亮状态的 CSS 类名 | string | 否 | | |
| unhighlightStyle | 未高亮状态的内联样式 | object | 否 | | |
| highlightTag | 高亮部分用来渲染的组件 | React.ElementType | 否 | `'mark'` | |
| sanitize | 关键字和待处理文本预处理函数 | (str: string) => string | 否 | identity | |
| autoEscape | 自动转译关键字里的正则特殊字符 | boolean | 否 | `false` |  `true` |
| caseSensitive | 关键字匹配时是否区分大小写 | boolean | 否 | `false` | `true` |
| findChunks | 自定义关键字匹配过程 | (options) => Array<{start: number; end: number; highlight: boolean;}> | 否 | | |
| className | 自定义组件最外层标签 CSS 类名 | string | 否 | | |
| style | 自定义组件最外层内联样式 | object | 否 | | |
