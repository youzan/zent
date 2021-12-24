---
title: Progress
path: component/progress
group: Data Display
scatter: true
---

## Progress

Displays the current progress of an operation when it takes a long time to complete.

### Suggestion

- It takes a long time to finish
- Is running in the background and may take more than 4 seconds
- The action needs to show a percentage of completion

### Note

- The process time cannot be estimated. `Loading` is recommended.
- Actions determined by the process within 4 seconds are not recommended

### Demos

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-3 -->
<!-- demo-slot-4 -->
<!-- demo-slot-5 -->
<!-- demo-slot-6 -->
<!-- demo-slot-7 -->

### API

| Property       | Description                                                               | Type    | Default           | Alternative                                |
| -------------- | ------------------------------------------------------------------------- | ------- | ----------------- | ------------------------------------------ |
| className      | The custom classname                                                      | string  |                   |                                            |
| type           | Style of progess                                                          | string  | `'line'`          | `'circle'`                                 |
| percent        | percentage of progress                                                    | number  | `0`               |                                            |
| status         | status of progress, has higher priority than percent                      | string  |                   | `'normal'` \| `'success'` \| `'exception'` |
| showInfo       | Whether to show status information                                        | boolean | `true`            | `false`                                    |
| format         | The format function of text, only work on normal status                   | func    | built-in function |                                            |
| strokeWidth    | The width of progess bar, unit: px                                        | number  | `10`              |                                            |
| width          | The diameter of the cicrle progress bar or the length of the line progess | number  |                   |                                            |
| bgColor        | The color of background                                                   | string  |                   |                                            |
| normalColor    | The color in normal state                                                 | string  |                   |                                            |
| successColor   | The color in successful state.                                            | string  |                   |                                            |
| exceptionColor | The color in exception state                                              | string  |                   |                                            |
| strokeLinecap  | Change the linecaps from round to square                                  | string  | `'round'`         | `'round'` \| `'square'`                    |

#### The following functions is obsolete in the new design system and is only used as a reference for the old version

<!-- demo-slot-9 -->
<!-- demo-slot-8 -->
