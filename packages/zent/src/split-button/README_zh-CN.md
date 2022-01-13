---
title: GroupButton
subtitle: 按钮组
path: component/split-button
group: 基础控件
scatter: true
---

## 按钮按钮

### SplitButton 下拉按钮

##### SplitButton 带有下拉菜单功能的按钮

主按钮组用于主行动点有多个操作时使用。

次按钮组用于次行动点有多个操作时使用。

文字按钮组用于三级行动点有多个操作时使用。
<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-3 -->
<!-- demo-slot-4 -->
### RadioButton 带选中状态的按钮组

<!-- demo-slot-5 -->
- [`RadioButton` api 和 `radio` 一致](https://youzan.github.io/zent/zh/component/radio)

### SPLIT BUTTON API

| 参数             | 说明                                                                         | 类型   | 默认值               | 备选值                               |
| ---------------- | ---------------------------------------------------------------------------- | ------ | -------------------- | ------------------------------------ |
| type             | 按钮风格                                                                     | string | `'default'`          | `'primary'`、`'text'`                  |
| disabled         | 按钮是否禁用                                                                 | bool   | `false`              | `true`、`false`                      |
| loading          | 是否显示 loading 图标                                                        | bool   | `false`              | `true`, `false`                      |
| size             | 按钮尺寸                                                                     | string | `'medium'`           | `'large'`、`'medium'`、`'small'`     |
| dropdownTrigger  | 下拉菜单触发方式                                                             | string | `'click'`            | `'click'`、`'hover'`                 |
| dropdownData     | 下拉菜单数据                                                                 | array  | []                   |                                      |
| dropdownValue    | 自定义选项的值对应的 key, 如{ id: 1, name: '文案' }, dropdownValue="id"      | string | `'value'`            |                                      |
| dropdownText     | 自定义选项显示文案对应的 key, 如{ id: 1, name: '文案' }, dropdownText="name" | string | `'text'`             |                                      |
| dropdownIcon		 | 自定义下拉按钮																																															| string | `'down'`							| icon类型
| dropdownPosition | 下拉菜单位置                                                                 | string | `'auto-bottom-left'` | 同 Pop 中的 position                 |
| onClick          | 左侧按钮点击时的回调函数                                                     | func   |                      |                                      |
| onSelect         | 右侧下拉菜单选择时的回调函数                                                 | func   |                      |                                      |
| className        | 自定义额外类名                                                               | string | `''`                 |                                      |

### onSelect

回调函数内参数为 dropdownValue

