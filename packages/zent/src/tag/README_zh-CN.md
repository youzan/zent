---
title: Tag
subtitle: 标签
path: component/tag
group: 展示
scatter: true
---

## Tag 标签

标签用于进行标记和分类。

### 使用指南

- 用于添加特殊标记或者分类记号。
- 可添加多个标签。
- 标签内字数建议不超过四个字。

### 代码演示

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-3 -->

#### 以下功能新版设计语言已废弃，仅作为老版使用的参考

<!-- demo-slot-4 -->
<!-- demo-slot-5 -->
<!-- demo-slot-6 -->

### API

#### Tag

| 参数             | 说明               | 类型                | 默认值   | 备选值                                                     |
| ---------------- | ------------------ | ------------------- | -------- | ---------------------------------------------------------- |
| theme            | 标签的预置颜色     | string              | `'grey'` | `'red'` \| `'green'` \| `'yellow'` \| `'blue'` \| `'grey'` |
| outline          | 边框有颜色，无底色 | bool                | `false`  | `true` \| `false`                                          |
| rounded          | 是否有圆角         | bool                | `true`   | `true` \| `false`                                          |
| closable         | 是否可以关闭       | bool                | `false`  | `true` \| `false`                                          |
| visible          | 是否显示           | bool                | `true`   | `false`                                                    |
| onClose          | 关闭时的回调       | func                | `noop`   |                                                            |
| closeButtonStyle | 关闭按钮样式       | React.CSSProperties |          |                                                            |
| className        | 自定义额外类名     | string              |          |                                                            |
| style            | 自定义样式         | React.CSSProperties |          |                                                            |

> 所有参数都是可选，搭配 `visible` 和 `onClose` 可以实现关闭效果

#### LinkTag

| 参数          | 说明               | 类型                | 默认值 | 备选值 |
| ------------- | ------------------ | ------------------- | ------ | ------ |
| className     | 自定义额外类名     | string              |        |        |
| style         | 自定义样式         | React.CSSProperties |        |        |
| linkIconStyle | 自定义链接图标样式 | React.CSSProperties |        |        |

#### SelectTag

| 参数      | 说明             | 类型                | 默认值  | 备选值            |
| --------- | ---------------- | ------------------- | ------- | ----------------- |
| className | 自定义额外类名   | string              |         |                   |
| style     | 自定义样式       | React.CSSProperties |         |                   |
| selected  | 选中状态         | boolean             | `false` | `true` \| `false` |
| onChange  | 标签点击后的回调 | func                | `noop`  |                   |

> SelectTag 的选中状态是完全受控的
