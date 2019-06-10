---
title: Tag
subtitle: 标签
path: component/tag
group: 展示
---

## Tag 标签

标签用于进行标记和分类。

### 使用指南

- 用于添加特殊标记或者分类记号。
- 可添加多个标签。
- 标签内字数建议不超过四个字。

### API

| 参数             | 说明               | 类型   | 默认值    | 备选值                                                                      |
| ---------------- | ------------------ | ------ | --------- | --------------------------------------------------------------------------- |
| color            | 标签颜色           | string | `'red'`   | `'red'` \| `'green'` \| `'yellow'` \| `'blue'` \| `'darkgreen'` \| `'grey'` |
| outline          | 边框有颜色，无底色 | bool   | `'false'` | `true` \| `false`                                                           |
| rounded          | 是否有圆角         | bool   | `true`    | `true` \| `false`                                                           |
| closable         | 是否可以关闭       | bool   | `false`   | `true` \| `false`                                                           |
| visible          | 是否显示           | bool   | `true`    | `false`                                                                     |
| onClose          | 关闭时的回调       | func   | `noop`    |                                                                             |
| closeButtonStyle | 关闭按钮样式       | object |           |                                                                             |
| className        | 自定义额外类名     | string | `''`      |                                                                             |
| prefix           | 自定义前缀         | string | `'zent'`  |                                                                             |

> 所有参数都是可选，搭配 `visible` 和 `onClose` 可以实现关闭效果
