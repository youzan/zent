---
title: Avatar
subtitle: 头像
path: component/avatar
group: 展示
---

## Avatar 头像

用来代表用户或事物，支持图标，图片或字符。

### API

| 参数     |   说明             | 类型     |   收否必须  | 默认值        | 备选值        |
| ---------| ----------------- | ------  | -------- | -------------|----------------- |
| shape    | 头像形状，圆形或正方形 | `string` | 否 | `'circle'` | `'square'` |
| size     | 头像大小，可以传入自定义尺寸  | `string` \| `number` | 否 | `'default'` | `'small'` \| `'large'` \| 像素值 |
| icon    | 图标名称   | `string`  | 否  | | |
| src     | 图片地址    | `string` | 否 | | |
| children  | 文字内容  | `string` | 否 | | |
| bordered  | 是否显示边框 | `bool` | 否 | `false` | `true` | 
| style   | 自定义样式  | `object` | 否 | | |
| className    | 自定义类名     |  `string`    |  否 |           |             |
| prefix | 自定义类前缀  | `string` | 否 | | |

**注意**：`icon`, `src` 以及 `children` 是三选一互斥的，同时传入多个的行为未定义，请不要这样用。
