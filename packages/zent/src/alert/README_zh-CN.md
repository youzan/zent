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
- 滚动公告使用结构相同的子节点（高度一致）

### API

#### Alert

| 参数         | 说明                   | 类型      | 默认值   | 备选值                                                  |
| ------------ | ---------------------- | --------- | -------- | ------------------------------------------------------- |
| className    | 自定义额外类名         | string    |          |                                                         |
| type         | 警告提示的样式         | string    | `'info'` | `'info'`, `'success'`, `'warning'`, `'error'`, `'hint'` |
| loading      | 是否是加载中模式       | bool      | `false`  | `true`, `false`                                         |
| outline      | 是否是 outline 模式    | bool      | `false`  | `true`, `false`                                         |
| closable     | 是否可以关闭           | bool      | `false`  | `true`, `false`                                         |
| closed       | 外部控制组件的关闭状态 | bool      |          |                                                         |
| onClose      | 点击关闭触发器时的回调 | func      |          |                                                         |
| closeContent | 关闭触发器的自定义内容 | ReactNode |          |                                                         |
| extraContent | 右侧额外内容           | ReactNode |          |                                                         |
| title        | 内容标题               | ReactNode |          |                                                         |
| description  | 内容描述               | ReactNode |          |                                                         |
| bordered      | 是否有边框            | bool   | `false`  | `true`, `false`                                |
| icon           | 自定义左侧 icon       | node   |  |  |
| closeIconColor | 自定义 close 颜色     | string   |  |  |
| progress       | 顶部进度条进度         | number   |  |  |

#### Prompt
| 参数         | 说明                   | 类型      | 默认值   | 备选值                                                  |
| ------------ | ---------------------- | --------- | -------- | ------------------------------------------------------- |
| type         | 提示的默认类型           | string    | `'warning'`  | `'strongHint'`\|`'weakHint'`  

#### Banner
| 参数         | 说明                   | 类型      | 默认值   | 备选值                                                  |
| ------------ | ---------------------- | --------- | -------- | ------------------------------------------------------- |
| backgroundImage  | 背景图片           | string    |  |
| closeIconColor  | 自定义 close 颜色    | string    |  | `'grey'`\|`'white'` |


#### ScrollAlert

##### 只支持等高的子节点, 暂不支持动态渲染子节点

| 参数           | 说明                          | 类型   | 默认值   | 备选值                                                  |
| -------------- | ----------------------------- | ------ | -------- | ------------------------------------------------------- |
| className      | 自定义额外类名                | string |          |                                                         |
| type           | 警告提示的样式                | string | `'info'` | `'info'`, `'success'`, `'warning'`, `'error'`, `'hint'` |
| scrollInterval | 自定义滚动间隔 （单位：毫秒） | number | 5000     | 大于 1000                                               |
| loading        | 是否是加载中模式              | bool   | `false`  | `true`, `false`                                         |
| outline        | 是否是 outline 模式           | bool   | `false`  | `true`, `false`                                         |
| onClose        | 关闭所有节点时触发的回调      | func   |          |                                                         |
| closed         | 外部控制整个组件的关闭状态    | bool   |          |                                                         |

#### AlertItem

| 参数         | 说明                                         | 类型      | 默认值  | 备选值          |
| ------------ | -------------------------------------------- | --------- | ------- | --------------- |
| closable     | 是否可以关闭                                 | bool      | `false` | `true`, `false` |
| closeContent | 关闭触发器的自定义内容                       | ReactNode |         |                 |
| extraContent | 右侧额外内容                                 | ReactNode |         |                 |
| title        | 内容标题                                     | ReactNode |         |                 |
| description  | 内容描述                                     | ReactNode |         |                 |
| onClose      | 关闭当前节点时触发的回调（closable 为 true） | func      |         |                 |
