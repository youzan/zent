---
title: Tag
subtitle: 标签
path: component/tag
group: 基础控件
scatter: true
---

## Tag 标签

结构化展示信息，并进行标记和分类。

### 使用指南

- 当需要对内容进行属性、维度的标记，或补充描述时使用
- 使用标签进行跨层级的检索
- 标签文本建议不超过7个字，展示标签的尺寸可根据需要配置

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
