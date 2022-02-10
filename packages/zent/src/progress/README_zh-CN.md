---
title: Progress
subtitle: 进度条
path: component/progress
group: 信息反馈
scatter: true
---

## Progress 进度条

在操作需要较长时间才能完成时，展示操作的当前进度。

### 建议

- 需要较长时间才能完成
- 在后台运行，且耗时可能超过 4 秒时
- 操作需要展示一个完成进度的百分比

### 注意

- 无法预估进程的时间，建议使用「加载 Loading」
- 进程确定在 4 秒内的操作不推荐使用

### 代码演示

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-3 -->
<!-- demo-slot-4 -->
<!-- demo-slot-5 -->
<!-- demo-slot-6 -->
<!-- demo-slot-7 -->

### API

| 参数           | 说明                                   | 类型                           | 默认值    | 可选值                                     |
| -------------- | -------------------------------------- | ------------------------------ | --------- | ------------------------------------------ |
| className      | 自定义额外类名                         | string                         |           |                                            |
| type           | 进度条样式                             | string                         | `'line'`  | `'circle'`                                 |
| percent        | 百分比                                 | number                         | `0`       |                                            |
| status         | 进度条状态, 优先级比 percent 高        | string                         |           | `'normal'` \| `'success'` \| `'exception'` |
| showInfo       | 是否显示状态信息                       | boolean                        | `true`    | `false`                                    |
| format         | 文字模板函数, 只会在 normal 状态下显示 | (percent: number) => ReactNode | 内置函数  |                                            |
| strokeWidth    | 线条宽度，单位 px                      | number                         | `10`      |                                            |
| width          | 圆形进度条直径/条形进度条总长度        | number                         |           |                                            |
| bgColor        | 背景颜色                               | string                         |           |                                            |
| normalColor    | 正常状态下的颜色                       | string                         |           |                                            |
| successColor   | 成功状态下的颜色                       | string                         |           |                                            |
| exceptionColor | 错误状态的颜色                         | string                         |           |                                            |
| strokeLinecap  | 进度条边缘形状                         | string                         | `'round'` | `'round'` \| `'square'`                    |

#### 以下功能新版设计语言已废弃，仅作为老版使用的参考

<!-- demo-slot-9 -->
<!-- demo-slot-8 -->
