---
title: Notify
path: component/notify
group: Feedback
---

## Notify 消息通知

全局展示通知提醒信息。

### 使用指南

-  组件由 3 个函数构成, 使用临时创建的 DOM 节点来渲染组件。
-  主要用于提示简要的文字信息。
-  `Notify.success` 和 `Notify.error` 方法会返回一个id，这个id可以作为 `Notify.clear(id)` 的入参，用于关闭指定notify。

### API

| 参数       | 说明            | 类型     | 默认值    |
| -------- | ------------- | ------ | ------ |
| text     | notify通知文案    | any   | `''`   |
| duration | 持续时间          | number | `2000` |
| callback | 自定义notify结束回调 | func   |        |
