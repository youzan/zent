---
title: Transfer
subtitle: 穿梭框
path: component/transfer
group: 数据
---

## Transfer

双栏穿梭选择框。

### API

| 参数              | 说明                                                                                          | 类型                                                                 | 默认值                 | 是否必填                     |
| ----------------- | --------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------- | -------- |
| keyName           | 指定`dataSource`的主键                                                                        | `string`                                                             |                        | 是                  |
| dataSource        | 数据源，其中的数据将会被渲染到左边一栏中，`targetKeys`中指定的除外                            | `ITransferData[]`                                                    |                        | 是       |
| onChange          | 选项在两栏之间转移时的回调函数                                                                | `({ targetKeys, transferredKeys, direction, selectedKeys }) => void` |                        | 是       |
| targetKeys        | 显示在右侧框数据的`key`集合                                                                   | `string[]`                                                           | `[]`                   | 否       |
| selectedKeys      | 设置哪些项应该被选中                                                                          | `string[]`                                                           | `[]`                   | 否       |
| onSelectChange    | 选中项发生改变时的回调函数                                                                    | `(selectedKeys: string[]) => void`                                   |                        | 否       |
| titles            | 标题集合，顺序从左至右                                                                        | `[React.ReactNode, React.ReactNode]`                                 | `['Source', 'Target']` | 否       |
| showSearch        | 是否显示搜索框                                                                                | `boolean`                                                            | `false`                | 否       |
| searchPlaceholder | 搜索框文案                                                                                    | `string`                                                             | `请输入搜索内容`       | 否       |
| filterOption      | 接收`inputValue`、`option`两个参数，当`option`符合筛选条件时，应返回`true`，反之则返回`false` | `(inputValue: string, option: ITransferData) => boolean`             |                        | 否       |
| pagination        | 列表分页，自定义渲染列表下无效，pageSize 默认 10 条                                           | `boolean` \| `{ pageSize: number }`                                   |                        | 否       |
| disabled          | 是否禁用                                                                                      | `boolean`                                                            |                  | 否       |
| className         | 自定义类名                                                                                    | `string`                                                             | `''`                     | 否       |
| list              | 设置列表属性                                                                                  | `Object ListType` \| `[ListType, ListType]`                          |                        | 否       |

#### Render Props

Transfer 支持接收 children 自定义渲染列表，并返回以下参数：

| 参数               | 说明           | 类型                       |
| ------------------ | -------------- | -------------------------- |
| direction          | 渲染列表的方向 | `left` \| `right`          |
| selectedKeys       | 选中项         | `string[]`                 |  |
| handleSelectChange | 修改选中项     | `(keys: string[]) => void` |

#### list

| 参数        | 说明                                  | 类型                                                                                                         | 是否必填                     |
|-----------|-------------------------------------|------------------------------------------------------------------------------------------------------------|------|
| columns   | 表格列配置                               | `TransferColumnType`                                                                                       | 是                   |
| selection | 表格的选择功能配置，(当前仅支持`getCheckboxProps`) | `object { getCheckboxProps: ( data: ITransferData) => { disabled?: boolean; reason?: React.ReactNode }; }` | 否            |

以上 props 和`Grid`不同，支持透传的属性有`rowKey`、`scroll`、`emptyLabel`、`onRowClick`、`sortBy`、`sortType`、`defaultSortType`、`bordered`、`ellipsis`、`components`、`rowProps`、`autoStick`、`autoStickOffsetTop`、`disableHoverHighlight`、`onChange`、`loading`、`className`、`rowClassName`（[查看属性说明](https://youzan.github.io/zent/zh/component/grid#api)）。

#### columns

| 参数  | 说明                | 类型        | 默认值 | 是否必须 |
| ----- | ------------------- | ----------- | ------ | -------- |
| name  | 列表展示数据的`key` | `string`    |        | 是       |
| title | 列头的名称          | `ReactNode` | `''`     | 否       |

以上 props 和 `Grid` 不同，[查看其他属性说明](https://youzan.github.io/zent/zh/component/grid#columns)。

### useTransfer

传送左右两边数据的 hook。

#### Params

| 参数         | 说明                            | 类型       | 默认值 | 是否必填 |
| ------------ | ------------------------------- | ---------- | ------ | -------- |
| selectedKeys | 初始选中项                      | `string[]` | `[]`   | 否       |
| targetKeys   | 初始显示在右侧框数据的`key`集合 | `string[]` | `[]`   | 否       |
| disabledKeys   | 禁用的`key`集合 | `string[]` | `[]`   | 否       |

#### Result

| 参数               | 说明                       | 类型                                                     |
| ------------------ | -------------------------- | -------------------------------------------------------- |
| selectedKeys       | 选中项                     | `string[]`                                               |
| targetKeys         | 显示在右侧数据的`key`集合  | `string[]`                                               |
| transferKeys       | 转移左侧或右侧选项的函数   | `(direction: Direction) => void`                         |
| changeSelectedKeys | 设置左侧或右侧选中项的函数 | `(direction: Direction, selectedKeys: string[]) => void` |
| resetSelectedKeys  | 重置选中项的函数           | `(keys: string[]) => void`                               |
| resetTargetKeys    | 重置`targetKeys`的函数     | `(keys: string[]) => void`                               |
