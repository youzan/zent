---
title: Transfer
subtitle: 穿梭框
path: component/transfer
group: 数据
---

## Transfer

双栏穿梭选择框。

### 使用指南

穿梭框列表使用`Grid`组件实现，会透传部分`Grid`组件的 props（具体见`grid`属性）。

### API

| 参数                | 说明                                                                  | 类型                                                       | 默认值                    | 备选值    | 是否必填 |
|-------------------|---------------------------------------------------------------------|----------------------------------------------------------|------------------------|--------|------|
| keyName           | 指定`dataSource`的主键               | `string`                                                 |                        |        | 是    |
| dataSource        | 数据源，其中的数据将会被渲染到左边一栏中，`targetKeys`中指定的除外                             | `ITransferData[]`                                        |                        |        | 是    |
| onChange          | 选项在两栏之间转移时的回调函数                                                     | `(params: ITransferDirectionChangeProps) => void`        |                        |        | 是    |
| targetKeys        | 显示在右侧框数据的`key`集合                                                    | `string[]`                                               | `[]`                   |        | 否    |
| selectedKeys      | 设置哪些项应该被选中，会和勾选的项合并                                                 | `string[]`                                               | `[]`                   |        | 否    |
| onSelectChange    | 选中项发生改变时的回调函数                                                       | `(selectedKeys: string[]) => void`                       |                        |        | 否    |
| titles            | 标题集合，顺序从左至右                                                         | `React.ReactNode[]`                                      | `['Source', 'Target']` |        | 否    |
| showSearch        | 是否显示搜索框                                                             | `boolean`                                                | `false`                | `true` | 否    |
| searchPlaceholder | 搜索框文案                                                               | `string`                                                 | `请输入搜索内容`              |        | 否    |
| filterOption      | 接收`inputValue`、`option`两个参数，当`option`符合筛选条件时，应返回`true`，反之则返回`false` | `(inputValue: string, option: ITransferData) => boolean` |                        |        | 否    |
| className         | 自定义类名                                                               | `string`                                                 | ''                     |        | 否    |
| grid              | 设置列表属性                                                              | `GridType`                                               |                        |        | 否    |

#### Render Props

Transfer 支持接收 children 自定义渲染列表，并返回以下参数：

| 参数                  | 说明           | 类型                      |
| --------------------- | -------------- | ------------------------- |
| direction             | 渲染列表的方向 | `left` \| `right`             |
| selectedKeys       | 选中项     | `string[]`               |        |
| handleSelectChange | 修改选中项       | `(keys: string[]) => void` |


#### grid

| 参数                    | 说明                                        | 类型                                                                                                         | 默认值              | 备选值    | 是否必填 |
|-----------------------|-------------------------------------------|------------------------------------------------------------------------------------------------------------|------------------|--------|------|
| columns               | 表格列配置                                     | `TransferColumnType | [TransferColumnType, TransferColumnType]`                                            |                  |        | 是    |
| selection             | 表格的选择功能配置，(当前仅支持`getCheckboxProps`)       | `object { getCheckboxProps: ( data: ITransferData) => { disabled?: boolean; reason?: React.ReactNode }; }` |                  |        | 否    |
| rowKey                | 每一行的`key`                                 | `string`                                                                                                   | 取`keyName`的值     |        | 否    |
| onChange              | 列表发生变化时自动触发的函数，页面筛选、排序均会触发                | `(conf: any) => any`                                                                                       | `noop`           |        | 否    |
| scroll                | 横向或纵向指定滚动区域的宽高度                           | `{ x?: number, y?: number }`                                                                               | { y: 240 } |        | 否    |
| sortBy                | 根据哪一个字段排序, 应该等于`columns`中某一个元素的`key`字段    | `string`                                                                                                   | ''               |        | 否    |
| sortType              | 排序方式                                      | `string`                                                                                                   | ''               |        | 否    |
| defaultSortType       | 第一次点击的排序方式                                | `string`                                                                                                   | `desc`           |        | 否    |
| emptyLabel            | 列表为空时的提示文案                                | `string`                                                                                                   | `暂无数据`           |        | 否    |
| bordered              | 是否展示外边框和列边框                               | `bool`                                                                                                     | `false`          | `true` | 否    |
| onRowClick            | 点击行时触发                                    | `(data: any, index: number, event: Event) => any`                                                          |                  |        | 否    |
| ellipsis              | 是否需要文字超出宽度后省略号显示 (需配置 columns 中的`nowrap`) | `bool`                                                                                                     | `false`          | `true` | 否    |
| components            | 自定义`table`内的组件                            | `object { row?: ComponentType }`                                                                           |                  |        | 否    |
| rowProps              | 自定义传入 row 的属性                             | `(data: any, index: number) => object`                                                                     |                  |        | 否    |
| autoStick             | 是否自动将 head stick 到窗口                      | `bool`                                                                                                     | `false`          | `true` | 否    |
| autoStickOffsetTop    | 自定义表头吸顶的offsetTop                         | `number`                                                                                                   | `0`                |        | 否    |
| disableHoverHighlight | 禁用鼠标hover高亮效果                             | `bool`                                                                                                     | `false`          | `true` | 否    |

#### columns

| 参数          | 说明                                                    | 类型                                                                                                                   | 默认值 | 是否必须 |
|-------------|-------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------|-----|------|
| name        | 列表展示数据的`key`                                          | string                                                                                                               |     | 是    |
| title       | 列头的名称                                                 | ReactNode                                                                                                            | ''  | 否    |
| width       | 列表宽度                                                  | string \| number                                                                                                     |     | 否    |
| bodyRender  | 渲染复杂组件                                                | ((data: any, pos: {row: number, column: number, fixed?: 'left' \| 'right'}, name: string) => ReactNode) \| ReactNode |     | 否    |
| className   | 列头的 className                                         | string                                                                                                               |     | 否    |
| needSort    | 是否支持排序 (使用此功能 请设置 name)                               | bool                                                                                                                 |     | 否    |
| colSpan     | 列合并 当为 0 时不渲染                                         | number                                                                                                               |     | 否    |
| fixed       | 是否固定列 可选值为 `left` `right` `true` (`true` 与 `left` 等效) | bool \| strig                                                                                                        |     | 否    |
| onCellClick | 点击单元格回调                                               | (data: any, event: Event) => any                                                                                     |     | 否    |
| textAlign   | 文本对齐方式                                                | string                                                                                                               |     | 否    |
| nowrap      | 是否换行 默认换行                                             | bool                                                                                                                 |     | 否    |
| defaultText | 默认显示文字                                                | ReactNode                                                                                                            |     | 否    |
| children    | 渲染分组表头                                                | array                                                                                                                |     | 否    |

### useTransfer
传送左右两边数据的hook。

#### Params

| 参数           | 说明                  | 类型         | 默认值  | 是否必填 |
|--------------|---------------------|------------|------|------|---|
| selectedKeys | 初始选中项 | `string[]` | `[]` | 否    |
| targetKeys   | 初始显示在右侧框数据的`key`集合    | `string[]` | `[]` | 否    |

#### Result

| 参数             | 说明                  | 类型                                                       |
|----------------|---------------------|----------------------------------------------------------|
| selectedKeys   | 设置哪些项应该被选中，会和勾选的项合并 | `string[]`                                               |
| targetKeys     | 显示在右侧框数据的`key`集合    | `string[]`                                               |
| onChange       | 选项在两栏之间转移时的回调函数     | `(direction: Direction) => void`                         |
| onSelectChange | 选中项发生改变时的回调函数       | `(direction: Direction, selectedKeys: string[]) => void` |
