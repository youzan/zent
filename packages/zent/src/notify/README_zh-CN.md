---
title: Notify
subtitle: 消息通知
path: component/notify
group: 反馈
---

## Notify 消息通知

全局展示通知提醒信息。

### 使用指南

- 主要用于提示简要的文字信息。

### API

- `Notify.success(text: node, duration?: number, callback?: () => ()): number`
- `Notify.error(text: node, duration?: number, callback?: () => ()): number`

`Notify.success` 和 `Notify.error` 方法会返回一个 `id`，这个 `id` 可以作为 `Notify.clear(id)` 的入参，用于关闭指定notify。

| 参数       | 说明            | 类型     | 默认值    |
| -------- | ------------- | ------ | ------ |
| text     | 通知文案    | node   | `''`   |
| duration | 持续时间          | number | `2000` |
| callback | 关闭时的回调 | func   |        |

- `Notify.clear(number: id): void`

如果 `Notify.clear` 调用时没有传入 `id` 参数，所有当前未关闭的实例都会被关闭。

- `Notify.config(options): void`

`options` 当前只支持一个设置：`duration`，可以用来全局设置 `Notify` 的关闭延迟时间。
