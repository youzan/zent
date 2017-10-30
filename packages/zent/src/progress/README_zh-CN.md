---
title: Progress 进度条
path: component/progress
group: 展示
---

## Progress 进度条

进度条，用来表示操作的当前进度和状态。

### 使用指南

-  用于时间较长的操作，为用户显示当前操作的进度和状态。
-  可显示操作进度的百分比。

### Progress API

| 参数           | 说明                | 类型             | 默认值                 |
| ------------ | ----------------- | -------------- | ------------------- |
| type | 进度条样式，可选`'line'` | string | `'line'`, `'circle'` |
| percent | 百分比 | number     | `0` |
| status | 状态，可选`'success'`,`'exception'` | string|  |
| showInfo | 是否显示状态信息 | boolean | `true`  |
| format | 文字模板函数 | func | 内置函数 |
| strokeWidth | 线条宽度，单位px | number | `10` | |
| width | 圆形进度条直径/条形进度条总长度 | number | `132(type=circle), 580(type=line)` |   
| className | 自定义额外类名 | string |                     |
| prefix | 自定义前缀 | string | `'zent'`            |

<style>
.zent-progress {
	margin-bottom: 10px;
}
.zent-progress-circle {
	margin-right: 10px;
}
</style>
