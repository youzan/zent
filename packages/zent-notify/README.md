# zent-notify

[![npm version](https://img.shields.io/npm/v/zent-notify.svg?style=flat)](https://www.npmjs.com/package/zent-notify) [![downloads](https://img.shields.io/npm/dt/zent-notify.svg)](https://www.npmjs.com/package/zent-notify)

提示信息组件

## 使用指南

### 组件显示

提供两种预定样式

-  `Notify.error(text: node, duration: number)`

-  `Notify.success(text: node, duration: number)`

### 统一关闭接口

-  `Notify.clear()`

## API

| 参数       | 说明            | 类型     | 默认值    |
| -------- | ------------- | ------ | ------ |
| text     | notify通知文案    | node   | `''`   |
| duration | 持续时间          | number | `3000` |
| callback | 自定义notify结束回调 | func   |        |
