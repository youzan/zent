# zent-alert

警告提示／公告组件, 为页面提供一个醒目的提示信息.

[![npm version](https://img.shields.io/npm/v/zent-alert.svg?style=flat)](https://www.npmjs.com/package/zent-alert) [![downloads](https://img.shields.io/npm/dt/zent-alert.svg)](https://www.npmjs.com/package/zent-alert)

## 使用场景

-  概况页通栏公告
-  业务公告提示
-  操作反馈提示

## 使用指南

**该组件渲染在常规文档流中, `style.position !== 'fixed'`.**

-  概况页通栏公告文字最多为45个字(含标点), 尽可能精简, 减少阅读障碍.
-  业务公告提示文字最多45个字(含标点), 尽可能精简, 减少阅读障碍.
-  操作反馈提示文字建议保持在20个字以内.
-  公告类按钮不要多于两个, 保持逻辑简单。
-  组件的宽度会填满containing block的宽度, 内容的布局需自定义, 组件本身仅提供了基本的布局和样式.
-  如果页面的公告结构复杂 (比如有多行不同样式的文案, 及一些按钮), 可以在此组件的基础上抽象一个业务组件再进行封装复用.

## API

| 参数        | 说明            | 类型     | 默认值        | 备选值                               |
| --------- | ------------- | ------ | ---------- | --------------------------------- |
| type      | 必填参数，警告提示的样式  | string | `'info'`   | `'info'`, `'warning'`, `'danger'` |
| size      | 可选参数，alert的大小 | string | `'normal'` | `'normal'`, `'large'`             |
| rounded   | 可选参数，是否圆角     | bool   | `false`    |                                   |
| closable  | 可选参数，默认不可关闭   | bool   | `false`    |                                   |
| onClose   | 可选参数，关闭时的回调   | func   | `noop`     |                                   |
| className | 可选参数，自定义额外类名  | string | `''`       |                                   |
| prefix    | 可选参数，自定义前缀    | string | `'zent'`   |                                   |
