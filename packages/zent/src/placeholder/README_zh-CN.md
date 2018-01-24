---
title: Placeholder
subtitle: 占位块
path: component/placeholder
group: 反馈
---

## Placeholder 占位块

占位块，用于区块等待状态时的占位展示。

### 使用指南

-  当区块处于渲染中或者加载异步数据时，可以使用此组件减少用户等待时的焦虑感。

### API

| 参数             | 说明                                                     | 类型     | 默认值 |
| -------------- | ------------------------------------------------------ | ------ | -------- |
| show           | 显示控制                                                   | bool   | `false`  |
| float         | 是否脱离文档流，一般全局加载的时候设置为 `true`        | bool   | `false`   |
| height       | float 为 false 时设置高度，如果包裹了组件，将会表现为组件高度，否则将会使用默认高度 | number | `160`    |
| zIndex         | 设置 z-index                                             | number | `9998`   |
| className      | 自定义额外类名                                                | string | `''`     |
| containerClass | 自定义额外类名，外部包裹的容器使用                                      | string | `''`     |
| prefix         | 自定义前缀                                                  | string | `'zent'` |
