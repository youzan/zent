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

- `Notify.info(text: node, duration?: number, callback?: () => (), containerSelector?: string, className?: string): number`
- `Notify.success(text: node, duration?: number, callback?: () => (), containerSelector?: string, className?: string): number`
- `Notify.warn(text: node, duration?: number, callback?: () => (), containerSelector?: string, className?: string): number`
- `Notify.error(text: node, duration?: number, callback?: () => (), containerSelector?: string, className?: string): number`

`Notify.info`, `Notify.success`, `Notify.warn` and `Notify.error` return an id, which can be used by `Notify.clear(id)` to close the specific notify instance;

| Property       | Description            | Type     | Default    |
| -------- | ------------- | ------ | ------ |
| text     | notify message    | node   | `''`   |
| duration | duration          | number | `3500` |
| callback | customize callabck when notify closes | func   |        |
| containerSelector `v10.0.11` | notify's parent node CSS selector | string   |  `'body'` |
| className `v10.0.11` | Custom class name | string   |        |

- `Notify.clear(number?: id): void`

If no `id` is passed to `Notify.clear`, it will close all notify instances that are active.

- `Notify.config(options: Options): void`

### Options

| Property         | Description         | Type   | Default |
| ----------- | ------------ | ------ | ------ |
| duration    | global duration     | number | `3500` |
| containerSelector `v10.0.11` | notify's parent node CSS selector  | string |  `'body'` |
