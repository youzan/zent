---
title: Card
subtitle: 卡片
path: component/card
group: 信息展示
scatter: true
---

## Card 卡片

最基础的信息容器，圆角矩形，视觉上定义为一个独立的信息单元。

### 使用指南

- 通过 `title` 来控制是否显示标题
- 通过 `action` 来提供交互操作
- 通过 `bodyStyle` 来自定义内容样式

### 代码演示

<!-- demo-slot-2 -->
<!-- demo-slot-3 -->
<!-- demo-slot-4 -->
<!-- demo-slot-6 -->

### API

| 参数        | 说明                                     | 类型     | 默认值     | 备选值     |
| ----------- | ---------------------------------------- | -------- | ---------- | ---------- |
| title       | 标题                                     | `node`   |            |            |
| action      | 操作                                     | `node`   |            |            |
| loading     | 加载状态                                 | `bool`   | `false`    | `true`     |
| type        | 卡片类型，现在有两种，普通和嵌套         | `string` | `'normal'` | `'nested'` |
| style       | 卡片容器自定义样式                       | `object` | `{}`       |            |
| bodyStyle   | 内容区域自定义样式                       | `object` | `{}`       |            |
| className   | 自定义额外类名                           | `string` | `''`       |            |
| size        | 卡片尺寸                                 | `string` | `'large'`  | `'small'`  |
| leftExtra   | 卡片左侧自定义内容（仅在小尺寸卡片有效） | `node`   |            |            |
| rightExtra  | 卡片右侧自定义内容（仅在小尺寸卡片有效） | `node`   |            |            |
| bottomExtra | 卡片底部自定义内容（仅在小尺寸卡片有效） | `node`   |            |            |

#### 以下功能新版设计语言已废弃，仅作为老版使用的参考

<!-- demo-slot-1 -->
<!-- demo-slot-5 -->
