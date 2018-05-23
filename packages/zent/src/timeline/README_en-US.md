---
title: Timeline
subtitle: Timeline
path: component/timeline
group: Data Display
---

## Timeline

## API

### Timeline

| Property  | Description             | Type   | Default        | Alternative                 | Optional |
| --------- | ----------------------- | ------ | -------------- | --------------------------- | -------- |
| type      | horizontal or vertical  | string | `'horizontal'` | `'horizontal' | 'vertical'` | yes      |
| size      | size                    | number |                |                             | yes      |
| timeline  | pass an array as data   | Array  |                | yes                         | yes      |
| className | custom className        | string | `''`           |                             | yes      |
| prefix    | custom className prefix | string | `'zent'`       |                             | yes      |
| style     | custom style            | object |                |                             | yes      |

### Timeline Item

| Property  | Description                                            | Type    | Default        | Alternative                 | Optional |
| --------- | ------------------------------------------------------ | ------- | -------------- | --------------------------- | -------- |
| label     | label                                                  | node    |                |                             | yes      |
| tip       | hover pop content                                      | node    |                |                             | yes      |
| color     | color, higher priority than `lineColor` and `dotColor` | string  |                |                             | yes      |
| lineColor | line color                                             | string  | `#999`         |                             | yes      |
| dotColor  | dot color                                              | string  | `#00B90E`      |                             | yes      |
| type      | horizontal or vertical                                 | string  | `'horizontal'` | `'horizontal' | 'vertical'` | yes      |
| showLabel | should display the label                               | boolean | `true`         | `true | false`              | yes      |
| showDot   | should display the dot                                 | boolean | `true`         | `true | false`              | yes      |
| size      | size                                                   | number  |                |                             | yes      |
| className | custom className                                       | string  | `''`           |                             | yes      |
| prefix    | custom className prefix                                | string  | `'zent'`       |                             | yes      |
| style     | custom style                                           | object  |                |                             | yes      |

### Timeline Array

Support all properties of `Timeline Item`.

| Extra Property | Description                                                       | Type   | Optional |
| -------------- | ----------------------------------------------------------------- | ------ | -------- |
| id             | default `key`, or the array index will be used as `key`           | string | yes      |
| percent        | percent of total size when using dynamic size (0 <= percent <= 1) | number | yes      |
