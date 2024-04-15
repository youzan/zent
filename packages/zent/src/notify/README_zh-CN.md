---
title: Notify
subtitle: 轻提示
path: component/notify
group: 反馈
---

## Notify 轻提示

全局展示通知提醒信息。

### 使用指南

- 主要用于提示简要的文字信息。

### API

- `Notify.info(text: node, duration?: number, callback?: () => (), containerSelector?: string, className?: string): number`
- `Notify.success(text: node, duration?: number, callback?: () => (), containerSelector?: string, className?: string): number`
- `Notify.warn(text: node, duration?: number, callback?: () => (), containerSelector?: string, className?: string): number`
- `Notify.error(text: node, duration?: number, callback?: () => (), containerSelector?: string, className?: string): number`

`Notify.info`，`Notify.success`，`Notify.warn` 和 `Notify.error` 方法会返回一个 `id`，这个 `id` 可以作为 `Notify.clear(id)` 的入参，用于关闭指定notify。

| 参数       | 说明            | 类型     | 默认值    |
| -------- | ------------- | ------ | ------ |
| text     | 通知文案    | node   | `''`   |
| duration | 持续时间          | number | `3500` |
| callback | 关闭时的回调 | func   |        |
| containerSelector `v9.12.14` | 提示组件的父节点CSS selector | string   |  `'body'`   |
| className `v9.12.14` | 自定义类名 | string   |        |

- `Notify.clear(number: id): void`

如果 `Notify.clear` 调用时没有传入 `id` 参数，所有当前未关闭的实例都会被关闭。

- `Notify.config(options: Options): void`

### Options

| 参数         | 说明         | 类型   | 默认值 |
| ----------- | ------------ | ------ | ------ |
| duration    | 全局持续时间     | number | `3500` |
| containerSelector `v9.12.14` | 提示组件的父节点CSS selector | string |  `'body'` |
