---
title: Progress
path: component/progress
group: Data Display
---

## Progress

Progress represents the current progress and status of the operation.

### Guides

- Progress is suitable for long-time operations, which shows the current progess and status of the current operation.
- Progres can display the percentage of the operation progress.

### API

| Property       | Description                                                               | Type    | Default           | Alternative                                |
| -------------- | ------------------------------------------------------------------------- | ------- | ----------------- | ------------------------------------------ |
| className      | The custom classname                                                      | string  |                   |                                            |
| type           | Style of progess                                                          | string  | `'line'`          | `'circle'`                                 |
| percent        | percentage of progress                                                    | number  | `0`               |                                            |
| status         | status of progress, has higher priority than percent                                                        | string  |                   | `'normal'` \| `'success'` \| `'exception'` |
| showInfo       | Whether to show status information                                        | boolean | `true`            | `false`                                    |
| format         | The format function of text, only work on normal status                   | func    | built-in function |                                            |
| strokeWidth    | The width of progess bar, unit: px                                        | number  | `10`              |                                            |
| width          | The diameter of the cicrle progress bar or the length of the line progess | number  |                   |                                            |
| bgColor        | The color of background                                                   | string  |                   |                                            |
| normalColor    | The color in normal state                                                 | string  |                   |                                            |
| successColor   | The color in successful state.                                            | string  |                   |                                            |
| exceptionColor | The color in exception state                                              | string  |                   |                                            |
