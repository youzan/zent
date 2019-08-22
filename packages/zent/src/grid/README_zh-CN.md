---
title: Grid
subtitle: 网格
path: component/grid
group: 导航
---

## Grid 网格

功能和 [Table](table) 组件类似，`Grid` 是使用 `<table>` 标签实现的，而 `Table` 是使用 `div` + `flex` 布局实现的。

### API

| 参数            | 说明                                                          | 类型                                                                       | 默认值             | 是否必须 |
| --------------- | ------------------------------------------------------------- | -------------------------------------------------------------------------- | ------------------ | -------- |
| columns         | 表格列配置                                                    | array                                                                      |                    | 是       |
| datasets        | 需要展示的数据                                                | array                                                                      |                    | 是       |
| rowKey          | 每一行的 key                                                  | string                                                                     | `id`               | 否       |
| onChange        | 列表发生变化时自动触发的函数，页面筛选、排序均会触发          | (conf: any) => any                                                         | `noop`             | 否       |
| scroll          | 横向或纵向指定滚动区域的宽高度                                | { x?: number, y?: number }                                                 |                    | 否       |
| sortBy          | 根据哪一个字段排序, 应该等于 columns 中某一个元素的`key`字段  | string                                                                     | ''                 | 否       |
| sortType        | 排序方式                                                      | string                                                                     | ''                 | 否       |
| defaultSortType | 第一次点击的排序方式                                          | string                                                                     | `'desc'`           | 否       |
| emptyLabel      | 列表为空时的提示文案                                          | string                                                                     | `'没有更多数据了'` | 否       |
| selection       | 表格的选择功能配置                                            | object                                                                     |                    | 否       |
| expandation     | 展开配置                                                      | object                                                                     |                    |          | 否 |
| loading         | 表格是否处于 loading 状态                                     | bool                                                                       | `false`            | 否       |
| className       | 自定义额外类名                                                | string                                                                     | `''`               | 否       |
| rowClassName    | 表格行的类名                                                  | string \| (data: object, rowIndex: number) => string                       | ''                 | 否       |
| prefix          | 自定义前缀                                                    | string                                                                     | `'zent'`           | 否       |
| pageInfo        | table 对应的分页信息                                          | object                                                                     | null               | 否       |
| paginationType  | 分页器类型，可选 `'lite'` \| `'mini'`                                    | string                                                                     | `'default'`        | 否       |
| onRowClick      | 点击行时触发                                                  | (data: any, index: number, event: Event) => any                            |                    | 否       |
| ellipsis        | 是否需要文字超出宽度后省略号显示 (需配置 columns 中的 nowrap) | bool                                                                       | false              | 否       |
| onExpand        | 点击展开图标时触发                                            | (data: {expanded: boolean, data: any, event: Event, index: number}) => any |                    | 否       |
| components      | 自定义 table 内的组件                                         | object { row?: ComponentType }                                             |                    | 否       |
| rowProps        | 自定义传入 row 的属性                                         | (data: any, index: number) => object                                       |                    | 否       |
| bordered        | 是否展示外边框和列边框                                        | bool                                                                       | `false`            | 否       |

#### onChange 函数声明

onChange 会抛出一个对象，这个对象包含分页变化的参数：

```js
{
	current, // {Number} 表示当前第几页
	sortBy, // {String} 表示基于什么key进行排序
	sortType, // {String} ['asc', 'desc', ''] 排序的方式
	pageSize, // {Number} 表示每页数量
}
```

#### columns

| 参数        | 说明                                                              | 类型                                                                                                                 | 是否必须 |
| ----------- | ----------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------- |
| title       | 列头的名称                                                        | ReactNode                                                                                                            | 是       |
| name        | 对应数据中的 key (建议设置) 支持 `a.b.c` 的嵌套写法               | string                                                                                                               | 否       |
| width       | 列表宽度                                                          | string \| number                                                                                                     | 否       |
| bodyRender  | 渲染复杂组件                                                      | ((data: any, pos: {row: number, column: number, fixed?: 'left' \| 'right'}, name: string) => ReactNode) \| ReactNode | 否       |
| className   | 列头的 className                                                  | string                                                                                                               | 否       |
| needSort    | 是否支持排序 (使用此功能 请设置 name)                             | bool                                                                                                                 | 否       |
| colSpan     | 列合并 当为 0 时不渲染                                            | number                                                                                                               | 否       |
| fixed       | 是否固定列 可选值为 `left` `right` `true` (`true` 与 `left` 等效) | bool \| strig                                                                                                        | 否       |
| onCellClick | 点击单元格回调                                                    | (data: any, event: Event) => any                                                                                     | 否       |
| textAlign   | 文本对齐方式                                                      | string                                                                                                               | 否       |
| nowrap      | 是否换行 默认换行                                                 | bool                                                                                                                 | 否       |
| defaultText | 默认显示文字                                                      | ReactNode                                                                                                            | 否       |
| children    | 渲染分组表头                                                      | array                                                                                                                | 否       |

#### selection

| 参数             | 说明                                 | 类型                                                              | 是否必须      |
| ---------------- | ------------------------------------ | ----------------------------------------------------------------- | ------------- |
| selectedRowKeys  | 默认选中                             | array                                                             | 否            |
| onSelect         | 每次 check 的时候触发的函数          | (selectedkeys: string[], selectedRows: Array<any>, changeRow: any | any[]) => any | 否 |
| getCheckboxProps | 选择框属性配置 (当前仅支持 disabled) | (data: object) => { disabled?: boolean }                          | 否            |

#### pageInfo

| 参数            | 说明       | 类型     | 是否必须 |
| --------------- | ---------- | -------- | -------- |
| total           | 总条目个数 | number   | 否       |
| pageSize        | 每页个数   | number   | 否       |
| pageSizeOptions | 分页选项   | number[] | 否       |
| current         | 当前页码   | number   | 否       |

### expandation

| 参数         | 说明                    | 类型                                    | 默认值 | 是否必须 |
| ------------ | ----------------------- | --------------------------------------- | ------ | -------- |
| isExpanded   | 是否展开当前行          | (record: any, index: number) => boolean |        | 否       |
| expandRender | 展开行的补充内容 render | (data: any) => React.ReactNode          |        | 否       |

<style>
  .switch {
		margin-bottom: 10px;
  }
  .big-size {
  	font-size: 20px;
  }
</style>
