---
title: Timeline
subtitle: 时间轴
path: component/timeline
group: 展示
---

## Timeline

## API

### Timeline

| 参数      | 说明           | 类型   | 默认值         | 备选值                      | 可选 |
| --------- | -------------- | ------ | -------------- | --------------------------- | ---- |
| type      | 水平或垂直     | string | `'horizontal'` | `'horizontal' | 'vertical'` | 是   |
| size      | 大小           | number |                |                             | 是   |
| timeline  | 时间轴数组     | Array  |                | 是                          | 是   |
| className | 自定义额外类名 | string | `''`           |                             | 是   |
| prefix    | 自定义前缀     | string | `'zent'`       |                             | 是   |
| style     | 自定义样式     | object |                |                             | 是   |

### Timeline Item

| 参数      | 说明                                | 类型    | 默认值         | 备选值                      | 可选 |
| --------- | ----------------------------------- | ------- | -------------- | --------------------------- | ---- |
| label     | 标签                                | node    |                |                             | 是   |
| tip       | hover 时的弹层提示                  | node    |                |                             | 是   |
| color     | 颜色，优先于`lineColor`和`dotColor` | string  |                |                             | 是   |
| lineColor | 线颜色                              | string  | `#999`         |                             | 是   |
| dotColor  | 圆点颜色                            | string  | `#00B90E`      |                             | 是   |
| type      | 水平或垂直                          | string  | `'horizontal'` | `'horizontal' | 'vertical'` | 是   |
| showLabel | 是否显示标签                        | boolean | `true`         | `true | false`              | 是   |
| showDot   | 是否显示圆点                        | boolean | `true`         | `true | false`              | 是   |
| size      | 大小                                | number  |                |                             | 是   |
| className | 自定义额外类名                      | string  | `''`           |                             | 是   |
| prefix    | 自定义前缀                          | string  | `'zent'`       |                             | 是   |
| style     | 自定义样式                          | object  |                |                             | 是   |

### Timeline 数组

支持`Timeline Item`的全部字段

| 额外字段 | 说明                                     | 类型   | 可选 |
| -------- | ---------------------------------------- | ------ | ---- |
| id       | 默认的`key`，若没有会采用数组下标为`key` | string | 是   |
| percent  | 动态大小时占用的比例(0 <= percent <= 1)  | number | 是   |
