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


### API

| Property       | Description            | Type     | Default    |
| -------- | ------------- | ------ | ------ |
| text     | notify message    | any   | `''`   |
| duration | duration          | number | `2000` |
| callback | customize callabck when notify finishs | func   |        |
