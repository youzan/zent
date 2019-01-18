---
title: Collapse
subtitle: 折叠面板
path: component/collapse
group: 展示
---

## Collapse 折叠面板

折叠/展开内容区域。

### 使用指南

- 对复杂区域进行分组和隐藏
- 手风琴是一种特殊的折叠面板，同一时刻只允许打开一个折叠区域

### API

#### Collpase

| 参数                 | 说明                                     | 类型     | 是否必须 | 默认值      | 备选值   |
| -------------------- | ---------------------------------------- | -------- | -------- | ----------- | -------- |
| onChange             | 切换面板的回调函数                       | `func`   | 是       |             |          |
| activeKey            | 当前打开的面板 id                        | `string` | 否       |             |          |
| accordion            | 手风琴模式，一次只能有一个 active 的面板 | `bool`   | 否       | `false`     | `true`   |
| bordered             | 是否有外边框                             | `bool`   | 否       | `true`      | `false`  |
| panelTitleBackground | Panel 标题底色                           | `string` | 否       | `'default'` | `'none'` |
| className            | 额外类名                                 | `string` | 否       |             |          |
| prefix               | 自定义类名前缀                           | `string` | 否       |             |          |

#### Collpase.Panel

| 参数      | 说明             | 类型     | 是否必须 | 默认值  | 备选值  |
| --------- | ---------------- | -------- | -------- | ------- | ------- |
| key       | 面板 id          | `string` | 是       |         |         |
| title     | 面板标题         | `node`   | 是       |         |         |
| disabled  | 禁用面板         | `bool`   | 否       | `false` | `true`  |
| showArrow | 是否显示箭头图标 | `bool`   | 否       | `true`  | `false` |
| style     | 额外样式         | `object` | 否       |         |         |
| className | 额外类名         | `string` | 否       |         |         |
| prefix    | 自定义类名前缀   | `string` | 否       |         |         |
