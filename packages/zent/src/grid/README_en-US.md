---
title: Grid
path: component/grid
group: Data Display
---

## Grid

A table component. `Grid` is implemented using `<table>` tag.

### API

| Property              | Descripition                                                                                               | Type                                                                       | Default     | Required |
| --------------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------- | -------- | --- |
| columns               | columns                                                                                                    | array                                                                      |             | Yes      |
| datasets              | Data to be displayed                                                                                       | array                                                                      |             | Yes      |
| rowKey                | Key for each row                                                                                           | string                                                                     | `id`        | No       |
| onChange              | Callback fires when columns change, filtering and sorting included                                         | (conf: any) => any                                                         | `noop`      | No       |
| scroll                | Can be scrolled in x/y direction, x or y can be a number that indicates the width and height of table body | { x?: number, y?: number }                                                 |             | No       |
| sortBy                | The field which rows are sorted by, should be one of keys for columns                                      | string                                                                     | ''          | No       |
| sortType              | The way to sort                                                                                            | string                                                                     | ''          | No       |
| defaultSortType       | The way to sort when first click                                                                           | string                                                                     | `'desc'`    | No       |
| emptyLabel            | Text to be displayed when there's no data                                                                  | string                                                                     | `'No data'` | No       |
| selection             | Configuration for selection                                                                                | object                                                                     |             | No       |
| expandation           | Expand configuration                                                                                       | object                                                                     |             |          | no  |
| loading               | Determines whether data is being loaded or not                                                             | bool                                                                       | `false`     | No       |
| className             | Extra custom class name                                                                                    | string                                                                     | `''`        | No       |
| rowClassName          | Class name for row                                                                                         | string \| (data: object, rowIndex: number) => string                       | ''          | No       |
| pageInfo              | Pagination information                                                                                     | object                                                                     | null        | No       |
| paginationType        | Pagination type, `'default'` \| `'lite'` \| `'mini'`                                                       | string                                                                     | `'default'` | No       |
| onRowClick            | Callback fires when a row is clicked                                                                       | (data: any, index: number, event: Event) => any                            |             | No       |
| ellipsis              | Whether ellipsis should be displayed when content overflows (noWrap of columns needs to be set)            | bool                                                                       | false       | No       |
| onExpand              | Callback fires when the row expand icon is clicked                                                         | (data: {expanded: boolean, data: any, event: Event, index: number}) => any |             | No       |
| components            | Custom table element                                                                                       | object { row?: ComponentType }                                             |             | No       |
| rowProps              | Custom row props                                                                                           | (data: any, index: number) => object                                       |             | No       |
| bordered              | Whether to display the outer border and column border                                                      | bool                                                                       | `false`     | No       |
| batchRender           | Render batch operations                                                                                    | (data: array, position?: 'header' \| 'foot') => React.ReactNode            |             | No       |
| stickyBatch           | Automatically stick batch operation                                                                        | bool                                                                       | `false`     | No       |
| autoStick             | Whether to stick the head to the window automatically                                                      | bool                                                                       | `false`     | No       |
| autoStickOffsetTop    | Custom offset of sticky head                                                                               | number                                                                     | `false`     | No       |
| disableHoverHighlight | Whether to disable mouse hover highlighting                                                                | boolean                                                                    | `false`     | No       |
| loadingProps          | All props in `BlockLoading`, exclude `loading`                                                             | `Omit<IBlockLoadingProps, 'loading'>`                                      | -           | No       |
| size                  | Table Size                                                                                                 | string                                                                     | `'medium'`  | No       |

#### onChange function declaration

onChange will throw an object, which includes parameters about the change part of pagination.

```js
{
	current, // {Number} the current page
	sortBy, // {String} the key which rows are sorted according to
	sortType, // {String} ['asc', 'desc', ''] the way to sort
	pageSize, // {Number} page size
}
```

#### Columns

| Property     | Description                                                                                     | Type                                                                                                                 | Required |
| ------------ | ----------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------- |
| title        | column title                                                                                    | ReactNode                                                                                                            | Yes      |
| name         | key for the corresponding data(recommended to be set).                                          | string                                                                                                               | No       |
| width        | column width                                                                                    | string \| number                                                                                                     | No       |
| bodyRender   | Render complex component                                                                        | ((data: any, pos: {row: number, column: number, fixed?: 'left' \| 'right'}, name: string) => ReactNode) \| ReactNode | No       |
| className    | class name of the column title                                                                  | string                                                                                                               | No       |
| needSort     | whether to support sorting                                                                      | bool                                                                                                                 | No       |
| colSpan      | span of columns. It won't be rendered if the value is set to 0                                  | number                                                                                                               | No       |
| fixed        | whether columns fixed or not. The value can be `left` `right` `true` (`true` is same to `left`) | bool \| strig                                                                                                        | No       |
| onCellClick  | callback fires when a cell is clicked                                                           | (data: any, event: Event) => any                                                                                     | No       |
| textAlign    | Text alignment                                                                                  | string                                                                                                               | No       |
| noWrap       | Don't wrap text                                                                                 | bool                                                                                                                 | No       |
| defaultText  | Default display text                                                                            | ReactNode                                                                                                            | No       |
| children     | Render grouping table headers                                                                   | array                                                                                                                | No       |
| isValueEmpty | Callback to test whether show the default text                                                  | (value: any) => boolean                                                                                              | No       |

#### Selection

| Property          | Description                                                                            | Type                                                              | Required      |
| ----------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------- | --- |
| selectedRowKeys   | keys of selected rows by default                                                       | array                                                             | No            |
| onSelect          | callback fires when a check changes                                                    | (selectedkeys: string[], selectedRows: Array<any>, changeRow: any | any[]) => any | No  |
| getCheckboxProps  | **Depreciated use getSelectionProps** function to get properties of the checkbox/radio | (data: object) => { disabled?: boolean, reason?: ReactNode }      | No            |
| getSelectionProps | function to get properties of the checkbox/radio                                       | (data: object) => { disabled?: boolean, reason?: ReactNode }      | No            |
| isSingleSelection | Radio or not                                                                           | bool                                                              | No            |

### GridColumnProvider

Support all `columns` props.

#### pageInfo

| Property        | Description                              | Type     | Required |
| --------------- | ---------------------------------------- | -------- | -------- |
| total           | Total number of items                    | number   | No       |
| pageSize        | Number of items to be displayed per page | number   | No       |
| pageSizeOptions | Page size options                        | number[] | No       |
| current         | current page                             | number   | No       |

### Expandation

| Props        | Description                                          | Type                                    | Default | Required |
| ------------ | ---------------------------------------------------- | --------------------------------------- | ------- | -------- |
| isExpanded   | Whether to expand the current row                    | (record: any, index: number) => boolean |         | no       |
| expandRender | Render function of expanded row's additional content | (data: any) => ReactNode                |         | no       |

<style>
  .switch {
		margin-bottom: 10px;
  }
  .big-size {
  	font-size: 20px;
  }
</style>
