---
title: Card
subtitle: 卡片
path: component/card
group: 展示
---

## Card 卡片

用于在卡片容器内展示信息。

### 使用指南

- 通过 `title` 来控制是否显示标题
- 通过 `action` 来提供交互操作
- 通过 `bodyStyle` 来自定义内容样式

### API

| 参数        | 说明      | 类型     | 默认值  | 备选值 |
| --------- | ------- | ------ | ---- |-------|
| title     | 标题    | `node` |  |  |
| action    | 操作    | `node` |  |  |
| loading   | 加载状态 | `bool`  | `false` | `true` |
| type      | 卡片类型，现在有两种，普通和嵌套  | `string` | `'normal'` | `'nested'` |
| style     | 卡片容器自定义样式 | `object` | `{}` |  |
| bodyStyle | 内容区域自定义样式 | `object` | `{}` |  |
| className | 自定义额外类名 | `string` | `''` |  |
| prefix    | 自定义前缀 | `string` | `zent` |  |
