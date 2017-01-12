# @youzan/zent-alert

警告提示／公告组件，注意: **该组件渲染在文档流中，并不是`position: fixed`**。

宽度会填满containing block的宽度，实际内容的布局需使用者自己控制，`zent-alert`仅仅提供了很
基本的布局和样式。

如果有一些页面的公告结构复杂（比如有多行不同样式的文案，以及一些按钮），可以在`zent-alert`的
基础上抽象一个业务组件将需求封装起来，然后在不同的页面重用。


[![version][version-image]][download-url]
[![download][download-image]][download-url]

[version-image]: http://npm.qima-inc.com/badge/v/@youzan/zent-alert.svg?style=flat-square
[download-image]: http://npm.qima-inc.com/badge/d/@youzan/zent-alert.svg?style=flat-square
[download-url]: http://npm.qima-inc.com/package/@youzan/zent-alert

## 使用场景

页面上需要一个醒目的提示信息时使用:

1. 概况页通栏公告
2. 业务公告提示
3. 操作反馈提示

注意：

1. 概况页通栏公告文字最多为45个字（包含标点符号），字数尽可能的精简，减少用户阅读障碍。
2. 业务公告提示文字最多45个字（包含标点符号），字数尽可能的精简，减少用户阅读障碍。
3. 操作反馈提示文字建议最多在20个字之内。

公告类按钮建议最多两个，尽量只有一个行动点。

## API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| type | 必填参数，警告提示的样式 | string | `'info'` | `'info'`, `'warning'`, `'danger'` |
| size | 可选参数，alert的大小 | string | `'normal'` | `'normal'`, `'large'` |
| rounded | 可选参数，是否圆角 | bool | `false` | `true`, `false` |
| closable | 可选参数，默认不可关闭 | bool | `false` | `true`, `false` |
| onClose | 可选参数，关闭时的回调 | func |  noop  |    |
| className | 可选参数，自定义额外类名 | string | `''` | `''` |
| prefix | 可选参数，自定义前缀 | string | `'zent'` | `null` |
