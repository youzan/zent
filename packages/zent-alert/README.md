<p>
	<a href="https://github.com/youzan/">
		<img alt="有赞logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan" />
	</a>
</p>

# zent-alert

警告提示／公告组件, 为页面提供一个醒目的提示信息.

[![npm version](https://img.shields.io/npm/v/zent-alert.svg?style=flat)](https://www.npmjs.com/package/zent-alert) [![downloads](https://img.shields.io/npm/dt/zent-alert.svg)](https://www.npmjs.com/package/zent-alert)

## 使用场景

1. 概况页通栏公告
2. 业务公告提示
3. 操作反馈提示

## 使用指南

**该组件渲染在常规文档流中, `style.position !== 'fixed'`.**

1. 概况页通栏公告文字最多为45个字(含标点), 尽可能精简, 减少阅读障碍.
2. 业务公告提示文字最多45个字(含标点), 尽可能精简, 减少阅读障碍.
3. 操作反馈提示文字建议保持在20个字以内.
4. 公告类按钮不要多于两个, 保持逻辑简单。

## API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| type | 必填参数，警告提示的样式 | string | `'info'` | `'info'`, `'warning'`, `'danger'` |
| size | 可选参数，alert的大小 | string | `'normal'` | `'normal'`, `'large'` |
| rounded | 可选参数，是否圆角 | bool | `false` | `true`, `false` |
| closable | 可选参数，默认不可关闭 | bool | `false` | `true`, `false` |
| onClose | 可选参数，关闭时的回调 | func |  `noop`  |    |
| className | 可选参数，自定义额外类名 | string | `''` | `''` |
| prefix | 可选参数，自定义前缀 | string | `'zent'` | `null` |
