---
title: Progress
subtitle: 进度条
path: component/progress
group: 展示
---

## Progress 进度条

进度条，用来表示操作的当前进度和状态。

### 使用指南

- 用于时间较长的操作，为用户显示当前操作的进度和状态。
- 可显示操作进度的百分比。

### API

| 参数           | 说明                                   | 类型                           | 默认值   | 可选值                                     |
| -------------- | -------------------------------------- | ------------------------------ | -------- | ------------------------------------------ |
| className      | 自定义额外类名                         | string                         |          |                                            |
| type           | 进度条样式                             | string                         | `'line'` | `'circle'`                                 |
| percent        | 百分比                                 | number                         | `0`      |                                            |
| status         | 进度条状态, 优先级比 percent 高        | string                         |          | `'normal'` \| `'success'` \| `'exception'` |
| showInfo       | 是否显示状态信息                       | boolean                        | `true`   | `false`                                    |
| format         | 文字模板函数, 只会在 normal 状态下显示 | (percent: number) => ReactNode | 内置函数 |                                            |
| strokeWidth    | 线条宽度，单位 px                      | number                         | `10`     |                                            |
| width          | 圆形进度条直径/条形进度条总长度        | number                         |          |                                            |
| bgColor        | 背景颜色                               | string                         |          |                                            |
| normalColor    | 正常状态下的颜色                       | string                         |          |                                            |
| successColor   | 成功状态下的颜色                       | string                         |          |                                            |
| exceptionColor | 错误状态的颜色                         | string                         |          |                                            |
