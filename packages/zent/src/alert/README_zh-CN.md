---
title: Alert
subtitle: 公告
path: component/alert
group: 展示
---

## Alert 公告

公告，提供一个醒目的提示信息。

### 使用指南

-  内容文字尽可能精简, 减少阅读障碍。
-  公告类按钮不要多于两个, 保持逻辑简单。

### API

| 参数    |   说明          | 类型     | 默认值        | 备选值            |
| --------- | ------------- | ------ | ---------- | --------------------------------- |
| type      | 警告提示的样式  | string | `'info'`   | `'info'`, `'warning'`, `'danger'` |
| size      | alert 的大小 | string | `'normal'` | `'normal'`, `'large'`             |
| rounded   | 是否圆角     | bool   | `false`    |   `true`, `false`                   |
| closable  | 是否可以关闭   | bool   | `false`    |    `true`, `false`                |
| onClose   | 关闭时的回调   | func   | `noop`     |                                   |
| className | 自定义额外类名  | string | `''`       |                                   |
| prefix    | 自定义前缀    | string | `'zent'`   |                                   |


<style>
.zent-alert {
	.text {
		margin-bottom: 5px;
	}
}
</style>
