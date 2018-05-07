---
title: Mention
subtitle: 提及
path: component/mention
group: 数据
---

## Mention 提及

用于自动补全提及的内容，例如常见的 @某人。

### API

| 参数 | 说明 | 类型 | 是否必须 |默认值 | 备选值 |
|------|------|------|--------|--------|-----|
| value | 输入框的内容 | `string` | 是 | | |
| onChange | 输入框内容变化时的回调函数 | `(val: string): void` | 是 | | |
| onSearchChange | 触发提及的搜索文字变化时的回调函数 | `(search: string): void` | 否 | | |
| multiLine | 输入框是否是多行模式 | `bool` | 否 | `false` | `true` |
| position | 弹层相对文字的位置 | `string` | 否 | `bottom` | `top` |
| suggestions | 提及的提示内容 | `array` | 否 | | |
| suggestionNotFoundContent | 提及的提示为空时的提示内容 | `node` | `'无匹配结果，轻敲空格完成输入'` | |
| triggerText | 提及的触发前缀 | `string` | 否 | `'@'` | |
| prefix | 自定义类名前缀 | `string` | 否 | `'zent'` | |
| className | 自定义类名 | `string` | 否 | | |

> `Mention` 支持 `Input` 的 props，例如 `placeholder` 等。

#### 支持的 `suggestions` 数组形式

`suggestions` 数组中每一项可以是以下任意一种：

* 字符串
* 数字
* 对象

对象形式支持的字段如下:

| 字段 | 说明 | 类型 | 是否必须 |
|------|------|------|--------|
| value | 选中时对应的值 | `string` | 是 |
| content | 选项的描述，不填默认使用 `value` | `node` | 否 |
| icon | 图标类型 | `string` | 否 |
| disabled | 选项是否禁用 | `bool` | 否 |
| isGroup | 是否是分组标题 | `bool` | 否 |
| isDivider | 是否是分割线 | `bool` | 否 |
