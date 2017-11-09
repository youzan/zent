---
title: Notify
path: component/notify
group: Feedback
---

## Notify

Display a notification at top of the viewport.

### Guides

- Display a brief message

### API

- `Notify.success(text: node, duration?: number, callback?: () => ()): number`
- `Notify.error(text: node, duration?: number, callback?: () => ()): number`

`Notify.success` and `Notify.error` return an id, which can be used by `Notify.clear(id)` to close the specific notify instance;

| Property       | Description            | Type     | Default    |
| -------- | ------------- | ------ | ------ |
| text     | notify message    | node   | `''`   |
| duration | duration          | number | `2000` |
| callback | customize callabck when notify closes | func   |        |

- `Notify.clear(number?: id): void`

If no `id` is passed to `Notify.clear`, it will close all notify instances that are active.

- `Notify.config(options): void`

`duration` is the only supported parameter in `options`, it is used to set `Notify` duration globally.
