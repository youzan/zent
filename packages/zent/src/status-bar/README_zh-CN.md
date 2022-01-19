---
title: StatusBar
subtitle: 任务状态条
path: component/status-bar
group: 信息反馈
---

## StatusBar 任务状态条

向用户传递任务相关的行为反馈

### 建议

- 使用：在任务期间响应用户的操作而展示，为用户提供直接、即时的反馈，确保用户知道如何在必要时采取行动；
- 位置：与操作对象位于同一容器，位于操作对象上方，随容器自适应；

### 注意

- 禁止多条状态叠加；

### API

| 参数         | 说明                                         | 类型        | 是否必须 | 默认值   | 备选值                              |
| ------------ | -------------------------------------------- | ----------- | -------- | -------- | ----------------------------------- |
| type         | 状态条类型                                   | string      | 否       | `'info'` | `'waiting'`\|`'success'`\|`'error'` |
| progress     | 状态条顶部任务进度，仅在`type=waiting`时显示 | number      | 否       |          |                                     |
| extraContent | 右侧自定义内容                               | `ReactNode` | 否       |          |
| closable     | 是否可以关闭                                 | boolean     | 否       | `true`   | `false`                             |

StatusBar 组件基于 Alert 实现，更多属性请参考 [Alert 文档](https://youzan.github.io/zent/zh/component/alert)
