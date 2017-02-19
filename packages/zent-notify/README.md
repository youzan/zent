<p>
	<a href="https://github.com/youzan/">
		<img alt="有赞logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan" />
	</a>
</p>

# zent-notify

[![npm version](https://img.shields.io/npm/v/zent-notify.svg?style=flat)](https://www.npmjs.com/package/zent-notify) [![downloads](https://img.shields.io/npm/dt/zent-notify.svg)](https://www.npmjs.com/package/zent-notify)

提示信息组件

## 使用指南

1.  `Notify.error(text: node, duration: number)`

2.  `Notify.success(text: node, duration: number)`

3.  `Notify.clear()`

## API

| 参数       | 说明            | 类型     | 默认值    |
| -------- | ------------- | ------ | ------ |
| text     | notify通知文案    | node   | `''`   |
| duration | 持续时间          | number | `3000` |
| callback | 自定义notify结束回调 | func   |        |
