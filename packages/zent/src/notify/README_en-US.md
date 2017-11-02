---
title: Notify
path: component/notify
group: Feedback
---

## Notify

to display a notification message at top of window

### Guides

- The widget is consists of three functions, which is rendered by using temporarily created DOM node
- Using to prompt a brief message
- When using `Notify.success` or `Notify.error` methods, it will return a id, which can be used by `Notify.clear(id)` to close specified notify;

### demos

### API

| Property       | Description            | Type     | Default    |
| -------- | ------------- | ------ | ------ |
| text     | notify通知文案    | any   | `''`   |
| duration | 持续时间          | number | `2000` |
| callback | 自定义notify结束回调 | func   |        |
