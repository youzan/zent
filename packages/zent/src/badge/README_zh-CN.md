---
title: Badge
subtitle: 徽标数
path: component/badge
group: 展示
---

## Badge 徽标数

徽标数，一般出现在通知图标或头像的右上角，用于显示需要处理的消息条数，通过醒目视觉形式吸引用户处理。

### 使用指南

-  用于提示新的消息，放在文字或者图标右上角或右侧。
-  可以显示具体消息的条数。

### API

| 参数     |   说明             | 类型     | 默认值        | 备选值            |
| ---------| ----------------- | ------  | -------------|----------------- |
| count    | 消息条数            | int     | `0`          |                  |
| maxCount | 最大完全显示消息条数  | int     | `99`         |                  |
| dot      | 是否显示为小红点     | bool    | `false`      | `true`,`false`   |
| showZero | 消息数为0时是否显示  | bool     | `false`      | `true`,`false`  |
| className| 自定义额外类名      | string   | `''`         |                  |
| prefix   | 自定义前缀          | string   | `'zent'`    |                  |
