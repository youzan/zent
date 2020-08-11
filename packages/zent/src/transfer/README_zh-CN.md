---
title: Transfer
subtitle: 穿梭框
path: component/transfer
group: 数据
---

## Transfer

双栏穿梭选择框。

### 使用指南

### API

| 参数              | 说明                                                                                          | 类型                                                                 | 默认值                 | 备选值 | 是否必填 |
| ----------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------- | ------ | -------- |
| keyName           | 指定`dataSource`的主键                                                                        | `string`                                                             |                        |        | 是       |
| dataSource        | 数据源，其中的数据将会被渲染到左边一栏中，`targetKeys`中指定的除外                            | `ITransferData[]`                                                    |                        |        | 是       |
| onChange          | 选项在两栏之间转移时的回调函数                                                                | `({ targetKeys, transferredKeys, direction, selectedKeys }) => void` |                        |        | 是       |
| targetKeys        | 显示在右侧框数据的`key`集合                                                                   | `string[]`                                                           | `[]`                   |        | 否       |
| selectedKeys      | 设置哪些项应该被选中                                                                          | `string[]`                                                           | `[]`                   |        | 否       |
| onSelectChange    | 选中项发生改变时的回调函数                                                                    | `(selectedKeys: string[]) => void`                                   |                        |        | 否       |
| titles            | 标题集合，顺序从左至右                                                                        | `React.ReactNode[]`                                                  | `['Source', 'Target']` |        | 否       |
| showSearch        | 是否显示搜索框                                                                                | `boolean`                                                            | `false`                | `true` | 否       |
| searchPlaceholder | 搜索框文案                                                                                    | `string`                                                             | `请输入搜索内容`       |        | 否       |
| filterOption      | 接收`inputValue`、`option`两个参数，当`option`符合筛选条件时，应返回`true`，反之则返回`false` | `(inputValue: string, option: ITransferData) => boolean`             |                        |        | 否       |
| pagination        | 列表分页，自定义渲染列表下无效，pageSize 默认 10 条                                           | `boolean | { pageSize: number }`                                     | false                  |        | 否       |
| className         | 自定义类名                                                                                    | `string`                                                             | ''                     |        | 否       |
| list              | 设置列表属性                                                                                  | `Object ListType`                                                    |                        |        | 否       |

#### Render Props

Transfer 支持接收 children 自定义渲染列表，并返回以下参数：

| 参数               | 说明           | 类型                       |
| ------------------ | -------------- | -------------------------- |
| direction          | 渲染列表的方向 | `left` \| `right`          |
| selectedKeys       | 选中项         | `string[]`                 |  |
| handleSelectChange | 修改选中项     | `(keys: string[]) => void` |

#### list

| 参数       | 说明                                               | 类型                                                                                                       | 默认值          | 备选值 | 是否必填 |
| ---------- | -------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------- | ------ | -------- |
| columns    | 表格列配置                                         | `TransferColumnType | [TransferColumnType, TransferColumnType]`                                            |                 |        | 是       |
| selection  | 表格的选择功能配置，(当前仅支持`getCheckboxProps`) | `object { getCheckboxProps: ( data: ITransferData) => { disabled?: boolean; reason?: React.ReactNode }; }` |                 |        | 否       |
| rowKey     | 每一行的`key`                                      | `string`                                                                                                   | 取`keyName`的值 |        | 否       |
| scroll     | 横向或纵向指定滚动区域的宽高度                     | `{ x?: number, y?: number }`                                                                               | { y: 240 }      |        | 否       |
| emptyLabel | 列表为空时的提示文案                               | `string`                                                                                                   | `暂无数据`      |        | 否       |

以上 props 和`Grid`不同，支持透传的属性有`onChange`、`sortBy`、`sortType`、`defaultSortType`、`bordered`、`onRowClick`、`ellipsis`、`components`、`rowProps`、`autoStick`、`autoStickOffsetTop`、`disableHoverHighlight`（[查看属性说明](https://youzan.github.io/zent/zh/component/grid#api)）。

#### columns

| 参数  | 说明                | 类型      | 默认值 | 是否必须 |
| ----- | ------------------- | --------- | ------ | -------- |
| name  | 列表展示数据的`key` | string    |        | 是       |
| title | 列头的名称          | ReactNode | ''     | 否       |

以上 props 和 `Grid` 不同，[查看其他属性说明](https://youzan.github.io/zent/zh/component/grid#columns)。

### useTransfer

传送左右两边数据的 hook。

#### Params

| 参数         | 说明                            | 类型       | 默认值 | 是否必填 |
| ------------ | ------------------------------- | ---------- | ------ | -------- |
| selectedKeys | 设置选中项                      | `string[]` | `[]`   | 否       |
| targetKeys   | 设置显示在右侧框数据的`key`集合 | `string[]` | `[]`   | 否       |

#### Result

| 参数           | 说明                           | 类型                                                     |
| -------------- | ------------------------------ | -------------------------------------------------------- |
| selectedKeys   | 选中项                         | `string[]`                                               |
| targetKeys     | 显示在右侧框数据的`key`集合    | `string[]`                                               |
| onChange       | 选项在两栏之间转移时的回调函数 | `(direction: Direction) => void`                         |
| onSelectChange | 选中项发生改变时的回调函数     | `(direction: Direction, selectedKeys: string[]) => void` |
