---
title: Table
subtitle: 表格
path: component/table
group: 导航
---

## Table 表格（⚠️ 已废弃，请使用 `Grid` 替代）

表格组件

该组件已停止维护，请使用 `Grid`。

### 使用指南

表格中的页面筛选、排序均会触发 `onChange` 函数

### API

| 参数                     | 说明                                                                                                 | 类型                                 | 默认值             | 备选值  | 是否必须 |
| ------------------------ | ---------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------ | ------- | -------- |
| columns                  | 每一列需要的所有数据                                                                                 | array[object]                        |                    |         | 是       |
| datasets                 | 每一行需要展示的数据                                                                                 | array[object]                        |                    |         | 是       |
| rowKey                   | 每一行的 key, 让 react 提升性能, 并防止出现一系列的问题                                              | string                               | `id`               |         | 否       |
| sortBy                   | 根据哪一个字段排序, 应该等于 columns 中某一个元素的`key`字段，注意，组件内部不做排序，需要自己实现。 | string                               |                    |         | 否       |
| sortType                 | 排序方式                                                                                             | string                               | `'desc'`           | `'asc'` | 否       |
| defaultSortType          | 第一次点击的排序方式               | string                                                                     | `'desc'`                 |        | 否 |
| onChange                 | 列表发生变化时自动触发的函数，页面筛选、排序均会触发                                                 | func                                 |                    |         | 否       |
| emptyLabel               | 列表为空时的提示文案                                                                                 | node                                 | `'没有更多数据了'` |         | 否       |
| selection                | 表格的选择功能配置                                                                                   | object                               |                    |         | 否       |
| loading                  | 表格是否 loading 状态                                                                                | bool                                 | `false`            |         | 否       |
| getRowConf               | 每一行的配置函数，返回一个配置对象`{ canSelect, rowClass }`                                          | func                                 |                    |         | 否       |
| expandation              | 展开配置                                                                                             | object                               |                    |         | 否       |
| batchComponents          | 批量操作的组件列表，如何使用，看批量操作的示例                                                       | array[html/function/React Component] | `null`             |         | 否       |
| batchComponentsAutoFixed | 是否要自动 fix 批量操作                                                                              | bool                                 | `true`             |         | 否       |
| autoStick                | 是否自动将 head stick 到窗口                                                                         | bool                                 | `false`            |         | 否       |
| autoScroll               | 是否点击分页自动滚到 table 顶部                                                                      | bool                                | `false`            |         | 否       |
| className                | 自定义额外类名                                                                                       | string                               | `''`               |         | 否       |
| prefix                   | 自定义前缀                                                                                           | string                               | `'zent'`           |         | 否       |
| pageInfo                 | table 对应的分页信息                                                                                 | object                               | `null`             |         | 否       |
| paginationType  | 分页器类型，可选 `'lite'` \| `'mini'`                                    | string                                                                     | `'default'`        | 否       |

#### getRowConf 的特别声明：

```jsx

  /*
  * @param data {Object} 每一行的数据
  * @param index {number} 每一行在列表中的index
  * @return {
  *  canSelect {bool} 是否可选，默认为true
  *  rowClass {string} 这一行的特殊class，默认是空字符串
  * }
  */
  getRowConf(data, index) { // 每一行的数据和这一行在列表中的index
    return {
      canSelect: index % 2 === 0,
      rowClass: `row-${index}`
    }
  }

```

#### onChange 函数声明

onChange 会抛出一个对象，这个对象包含分页变化和排序的的参数：

```js
{
	sortBy, // {String} 表示基于什么key进行排序
	sortType, // {String} ['asc', 'desc'] 排序的方式
	current, // {Number} 表示当前第几页
	pageSize, // {Number} 表示每页数量
}
```

### columns

| 参数       | 说明                                                           | 类型   | 默认值  | 是否必须 |
| ---------- | -------------------------------------------------------------- | ------ | ------- | -------- |
| title      | 每一列显示在 thead 上的名称                                    | node   |         | 否       |
| name       | 每一列的主键, 影响到排序和筛选                                 | string |         | 否       |
| width      | 每一列在一行的宽度, 相对值和固定值 (如: 20% 或 100px)          | string |         | 否       |
| isMoney    | 表示是否是金额                                                 | bool   | `false` | 否       |
| needSort   | 这一列是否支持排序, 这一列必须设置了 key, 才能正常使用排序功能 | bool   | `false` | 否       |
| bodyRender | 这一列对应用来渲染的组件                                       | node   |         | 否       |
| textAlign  | 文本对齐方式                                                   | string | `''`    | 否       |

### selection

| 参数                                                | 说明                        | 类型  | 默认值  | 是否必须 |
| --------------------------------------------------- | --------------------------- | ----- | ------- | -------- |
| selectedRowKeys                                     | 默认选中                    | array |         | 否       |
| indeterminateRowKeys                                | 半选状态的行                | array |         | 否       |
| isSingleSelection                                   | 是否是单选                  | bool  | `false` | 否       |
| needCrossPage                                       | 是否需要跨页的时候多选      | bool  | `false` | 否       |
| onSelect(@selectedkeys, @selectedRows, @currentRow) | 每次 check 的时候触发的函数 | func  |         | 否       |

### pageInfo

| 参数            | 说明                                        | 类型     | 默认值 | 是否必须 |
| --------------- | ------------------------------------------- | -------- | ------ | -------- |
| total           | 总条目个数                                  | number   | `0`    | 否       |
| pageSize        | 每页个数                                    | number   |        | 否       |
| pageSizeOptions | 分页选项                                    | number[] |        | 否       |
| current         | 当前页码                                    | number   |        | 否       |
| totalItem       | 总条目个数**[deprecated], 请使用 `total`**  | number   | `0`    | 否       |
| limit           | 每页个数**[deprecated], 请使用 `pageSize`** | number   |        | 否       |

### expandation

| 参数         | 说明                    | 类型                | 默认值 | 是否必须 |
| ------------ | ----------------------- | ------------------- | ------ | -------- |
| isExpanded   | 是否展开当前行          | func(record, index) |        | 否       |
| expandRender | 展开行的补充内容 render | func(record)        |        | 否       |

<style>
  .row {
    &-0 {
      background: #2ecc71;
    }
    &-1 {
      background: #3498db;
    }
    &-2 {
      background: #e74c3c;
    }
  }
</style>
