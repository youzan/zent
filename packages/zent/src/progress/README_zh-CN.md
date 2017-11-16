---
title: Progress
subtitle: 进度条
path: component/progress
group: 展示
---

## Progress 进度条

进度条，用来表示操作的当前进度和状态。

### 使用指南

-  用于时间较长的操作，为用户显示当前操作的进度和状态。
-  可显示操作进度的百分比。

### API

| 参数           | 说明     | 类型  | 默认值 |       可选值         |
| ------------ | --------| -------- | -----| ---------- |
| type | 进度条样式 | string | `'line'` | `'circle'` |
| percent | 百分比 | number     | `0` | |
| status | 状态 | string|  | `'success'`,`'exception'` |
| showInfo | 是否显示状态信息 | boolean | `true`  | `false` |
| format | 文字模板函数 | func | 内置函数 | |
| strokeWidth | 线条宽度，单位px | number | `10` | |
| width | 圆形进度条直径/条形进度条总长度 | number | `132(type=circle), 580(type=line)` | |
| bgColor | 背景颜色 | string | `'#f8f8f8'` | |
| normalColor | 进度条色彩 | string | `'#f44'` | |
| successColor | 成功状态下的的进度颜色和图标颜色 | string | `'#4b0'` | |
| exceptionColor | 错误状态的进度调颜色和图标颜色（如果未指定，使用`normalColor`） | string |`'#f44'` | |
| className | 自定义额外类名 | string |      | |
| prefix | 自定义前缀 | string | `'zent'`  | |
