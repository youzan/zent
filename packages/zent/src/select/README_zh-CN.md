---
title: Select
subtitle: 下拉选择
path: component/select
group: 数据
---

## Select 下拉选择

下拉选择，提供多种选择器功能。

### 使用指南

组件分层：主要分成 Select, Popup, Trigger 三个模块

#### Select

核心控制器，主要职责是格式化数据，负责 Popup 和 Trigger 间的数据传输

#### Popup

选项列表弹出层，主要负责展示选项，数据过滤控制

#### Trigger

- 触发器，暴露给使用者，可以通过 trigger 属性进行配置
- 核心的 trigger 有 SelectTrigger 和 InputTrigger
- TagsTrigger 是基于 InputTrigger 扩展出来的拥有多选功能的 trigger
- 使用者可以自行扩展或开发 trigger

### API

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|------|------|------|--------|--------|
| data | 选项数据 | array | `[]` | 是 |
| value | 选中的值，当为tags类型时，可以传入数组 | any | `null` | 否 |
| index | 选中索引 | any | `null` | 否 |
| disabled | 禁用组件 | bool | `false` | 否 |
| placeholder | 默认提示文案 | string | `'请选择'` | 否 |
| searchPlaceholder | 搜索框默认文案 | string | `''` | 否 |
| emptyText | 空列表提示文案 | string | `'没有找到匹配项'` | 否 |
| trigger | 自定义触发器 | function | `Select.SelectTrigger` | 否 |
| optionText | 自定义选项显示文案对应的key, 如{ id: 1, name: '文案' }, 设置optionText="name" | string | `'text'` | 否 |
| optionValue | 自定义选项的值对应的key, 如{ id: 1, name: '文案' }, 设置optionValue="id" | string | `'value'` | 否 |
| onChange | 选择变更后的回调函数 | function | `noop` | 否 |
| onDelete | 删除标签后的回调函数 | function | `noop` | 否 |
| filter | 过滤条件，设置以后才会开启过滤功能 | function | `null` | 否 |
| maxToShow | 在有过滤条件时，设置 Option 的最大显示数量 | number | | 否 |
| onAsyncFilter | 异步设置过滤后的数据 | function | `null` | 否 |
| onEmptySelected | 选中过滤条件为空时的回调 | function | `noop` | 否 |
| onOpen | 展开时的回调 | function | `noop` | 否 |
| className | 可选，自定义trigger额外类名 | string | `''` | 否 |
| popupClassName | 可选，自定义popup的类名 | string | `''`    | 否 |
| autoWidth | 是否自动设置弹出层与输入框等宽 | bool | `false` | 否 |
| resetOption | 是否加入一个重置选项 | bool | `false` | 否 |
| resetText | 重置选项文本 | string | `'...'` | 否 |
| width |  输入框宽度 | string or number |  | 否 |
| prefix | 自定义前缀 | string | `'zent'` | 否 |

如果 `data` 和 `children` 两种方式同时使用，`data` 会将 `children` 覆盖，主要是为了可以接收异步数据直接改变 `data` 属性来改变选项。

### Trigger开发API

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
|------|------|------|--------|--------|
| selectedItems | 已选择的条目 | array | `[]` | 否 |
| extraFilter | 是否自带过滤功能 | boolean | `false` | 否 |
| open | 是否打开Popup | boolean | `false` | 否 |

Trigger 可以通过调用 `this.props.onChange({...})` 通过改变 Popup 的 props 实现参数传递。
