---
title: Collapse
subtitle: 折叠面板
path: component/collapse
group: 信息展示
scatter: true
---

## Collapse 折叠面板

一个支持折叠和展开的面板

### 建议

- 对内容较多的信息进行分组和隐藏，提高页面阅读效率与美观，常用于 QA、帮助文档等；
- 当多组信息结构统一，如多组 标题+多行文本/图文 结构；

### 注意

- 信息组数量小于 2 组时或信息结构只有一级时折叠面板不适用；
- 不允许面板里嵌套折叠面板；

### 代码演示

<!-- demo-slot-3 -->
<!-- demo-slot-2 -->
<!-- demo-slot-5 -->

### API

#### Collpase

| 参数                  | 说明                                     | 类型      | 是否必须  | 默认值      | 备选值   |
| --------------------- | ---------------------------------------- | --------- | --------- | ----------- | -------- | --- |
| onChange              | 切换面板的回调函数                       | `func`    | 是        |             |          |
| activeKey             | 当前打开的面板 id                        | `string   | string[]`(注意手风琴模式时类型才为 `string`，否则类型为 `string[]`) | 否          |          |     |
| accordion             | 手风琴模式，一次只能有一个 active 的面板 | `bool`    | 否        | `false`     | `true`   |
| bordered              | 是否有外边框                             | `bool`    | 否        | `true`      | `false`  |
| panelTitleBackground  | Panel 标题底色                           | `string`  | 否        | `'default'` | `'none'` |
| showContentBackground | 是否显示 Panel 内容区底色                | `boolean` | 否        | `'false'`   | `'true'` |
| className             | 额外类名                                 | `string`  | 否        |             |          |

#### Collpase.Panel

| 参数      | 说明                                                                          | 类型        | 是否必须 | 默认值  | 备选值  |
| --------- | ----------------------------------------------------------------------------- | ----------- | -------- | ------- | ------- |
| key       | 面板 id，[React Keys 文档](https://reactjs.org/docs/lists-and-keys.html#keys) | `ReactText` | 是       |         |         |
| title     | 面板标题                                                                      | `node`      | 是       |         |         |
| extra     | 标题自定义内容                                                                | `node`      | 否       |         |         |
| disabled  | 禁用面板                                                                      | `bool`      | 否       | `false` | `true`  |
| showArrow | 是否显示箭头图标                                                              | `bool`      | 否       | `true`  | `false` |
| style     | 额外样式                                                                      | `object`    | 否       |         |         |
| className | 额外类名                                                                      | `string`    | 否       |         |         |

#### 以下功能新版设计语言已废弃，仅作为老版使用的参考

<!-- demo-slot-1 -->
<!-- demo-slot-4 -->
