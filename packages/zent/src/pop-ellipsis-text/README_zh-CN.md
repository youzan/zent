---
title: PopEllipsisText
subtitle: 省略气泡
path: component/pop-ellipsis-text
group: 反馈
---

## PopEllipsisText 省略气泡

单行或多行文本超过指定长度时显示省略符号和气泡提示的组件。

### 使用指南

- 若仅指定宽度, 组件在文本宽度超过所指定宽度时自动显示省略符, 鼠标移入时显示全文
- 同时指定宽度与行数, 组件宽度与指定宽度保持一致, 并在文本行数超出指定行数时显示省略符, 鼠标移入时显示全文
- 本组件基于`Pop`组件进行开发, 其他使用方式如触发方式、弹层位置，与之保持一致

### API

| 参数 | 说明 | 类型 | 是否必须 |默认值 | 备选值 |
|------|------|------|--------|--------|-----|
| text | 文本内容 | string\|inline-element | 是 | | |
| count | 字符个数 | number | 否 | | |
| width | 文本宽度 | number | 否 | | |
| line | 文本行数 | number | 否 | | |
| popClassName | 弹层类名 | string | 否 | | |
| prefix | 自定义前缀 | string | 否 | `'zent'` |  |

其余 API 请参考 [Pop 组件](pop)。