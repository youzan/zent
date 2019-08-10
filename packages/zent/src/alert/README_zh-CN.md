---
title: Alert
subtitle: 公告
path: component/alert
group: 展示
---

## Alert 公告

公告，提供一个醒目的提示信息。

### 使用指南

- 内容文字尽可能精简, 减少阅读障碍。
- 公告类按钮不要多于两个, 保持逻辑简单。

### API

| 参数         | 说明                   | 类型      | 默认值   | 备选值                                        |
| ------------ | ---------------------- | --------- | -------- | --------------------------------------------- |
| className    | 自定义额外类名         | string    |          |                                               |
| type         | 警告提示的样式         | string    | `'info'` | `'info'`, `'success'`, `'warning'`, `'error'` |
| loading      | 是否是加载中模式       | bool      | `false`  | `true`, `false`                               |
| outline      | 是否是 outline 模式    | bool      | `false`  | `true`, `false`                               |
| closable     | 是否可以关闭           | bool      | `false`  | `true`, `false`                               |
| onClose      | 关闭时的回调           | func      | `noop`   |                                               |
| closeContent | 关闭触发器的自定义内容 | ReactNode |          |                                               |
| extraContent | 右侧额外内容           | ReactNode |          |                                               |
| title        | 内容标题               | ReactNode |          |                                               |
| description  | 内容描述               | ReactNode |          |                                               |
