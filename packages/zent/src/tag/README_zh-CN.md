---
title: Tag
subtitle: 标签
path: component/tag
group: 展示
---

## Tag 标签

标签用于进行标记和分类。

### 使用指南

-  用于添加特殊标记或者分类记号。
-  可添加多个标签。
-  标签内字数建议不超过四个字。

### API

| 参数    |   说明          | 类型     | 默认值        | 备选值            |
| ------- | -------------  | ------  | -------------|----------------- |
| color   | 标签颜色        | string  | `'red'`      | `'red'` \| `'green'` \| `'yellow'` \| `'blue'` \| `'darkgreen'` |
| outline | 边框有颜色，无底色| bool    | `'false'`    |`true` \| `false`    |
| rounded | 是否有圆角 | bool | `true` | `true` \| `false` |
| closable| 是否可以关闭     | bool    | `false`      | `true` \| `false`   |
| onClose | 关闭时的回调     | func    | `noop`       |                  |
| borderColor | 边框颜色 | string | | |
| bgColor | 背景颜色 | string | | |
| fontColor | 文字颜色 | string | | |
| className| 自定义额外类名  | string   | `''`         |                  |
| prefix  | 自定义前缀      | string   | `'zent'`     |                  |
