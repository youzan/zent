---
title: Rate
path: component/rate
group: Data Entry
---

## Rate

Rate component.

### API

| Property   | Description                             | type                      | Required | Default                | Alternative |
| ---------- | --------------------------------------- | ------------------------- | -------- | ---------------------- | ----------- |
| onChange   | allback when select value               | `Function(value: number)` | Yes      | -                      |             |
| value      | current value                           | `number`                  | No       | 0                      |             |
| allowClear | whether to allow clear when click again | `boolean`                 | No       | `true`                 |             |
| allowHalf  | whether to allow semi selection         | `boolean`                 | No       | `false`                |             |
| character  | custom character of rate                | `ReactNode`               | No       | `<Icon type="star" />` |             |
| className  | custom class name of rate               | `string`                  | No       | -                      |             |
| count      | star count                              | `number`                  | No       | 5                      |             |
| disabled   | read only, unable to interact           | `boolean`                 | No       | `false`                |             |
| style      | custom style object of rate             | `object`                  | No       | -                      |             |
