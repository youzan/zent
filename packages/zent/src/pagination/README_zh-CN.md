---
title: Pagination
subtitle: 分页
path: component/pagination
group: 导航
---

## Pagination 分页

分页组件

### 使用指南

- 展示条目的总数量必须已知

### API

| 参数            | 说明      | 类型            | 默认值      | 是否必填 |
| ---------------| --------- | -------------- | ---------- | ------- |
| current       | 当前页数    | `number`        | `1`      | 是    |
| totalItem     | 总个数     | `number`        |          | 是    |
| pageSize      | 每页个数    | `number` \| `array` | `10`     | 否    |
| onPageSizeChange | 分页大小改变时候的回调函数 | `(pageSize: number) => any` | | 否 |
| maxPageToShow | 最大可显示页数 | `number`        |          | 否    |
| onChange      | 翻页回调    | `func`      |          | 否    |
| className     | 自定义额外类名 | `string`        | `''`     | 否    |
| prefix        | 自定义前缀   | `string`        | `'zent'` | 否    |

#### 关于 `pageSize` 属性

`pageSize` 属性支持3种格式：

- number: `30`

- arrayOf(number): `[10,20,30]`

初始值为 10

- `[10, 20, { value: 30, isCurrent: true }]`

初始值为 30

> ⚠️ 由于设计上的历史原因：当 `pageSize` 是数组时，切换分页大小时会触发 `onPageSizeChange` 回调。这种场景下请把 `pageSize` 当成一个初始值（不受控），当前选中的分页大小需要单独存储。如果 `onPageSizeChange` 返回 `false` 当前选中的分页大小不会改变。

### 组件原理

- 组件结构上分为 core-pagination 和 zent-pagination

前者是核心的分页组件, 只提供分页功能, 后者是基于前组件的扩展, 模拟 www 的交互

- 组件内置独立的 parser 模块作为数据的中台, 将输入的条目信息统一为 `renderData`.

### parser 的输入与输出

#### 输入

```
{ total: 20, current: 4 }
```

#### 输出

```javascript
[{
  'content': '上一页',
  'target': 3
}, {
  'content': '1',
  'target': 1
}, {
  'content': '...',
}, {
  'content': '3',
  'target': 3,
}, {
  'content': '4',
  'target': 4,
  'current': true,
}, {
  'content': '5',
  'target': 5
}, {
  'content': '...',
  'target': 6
}, {
  'content': '20'
  'target': 20
}, {
  'content': '下一页'
  'target': 5
}];
```

<style>
.zent-pager-control-group {
	display: flex;
	
	.zent-pager-input {
		margin-left: 10px;
		width: 200px;
	}
}

</style>
