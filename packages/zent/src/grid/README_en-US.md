---
title: Grid
path: component/grid
group: Navigation
---

## Grid

The function of the component is similar to the function of [Table](table) component. `Grid` is implemented by `<table>` tag, while `Table` is implemented by `div` and `flex` layout.

### API

| Property        | Descripition                                                                                               | Type                                                                       | Default     | Required |
| --------------- | ---------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ----------- | -------- |
| columns         | columns                                                                                                    | array                                                                      |             | Yes      |
| datasets        | data to be displayed                                                                                       | array                                                                      |             | Yes      |
| rowKey          | key for each row                                                                                           | string                                                                     | `id`        | No       |
| onChange        | callback fires when columns change, filtering and sorting included                                         | (conf: any) => any                                                         | `noop`      | No       |
| scroll          | can be scrolled in x/y direction, x or y can be a number that indicates the width and height of table body | { x?: number, y?: number }                                                 |             | No       |
| sortBy          | the field which rows are sorted accoring to, should be one of keys for columns                             | string                                                                     | ''          | No       |
| sortType        | The way to sort                                                                                            | string                                                                     | ''          | No       |
| defaultSortType | The way to sort when first click                                                                           | string                                                                     | `'desc'`    | No       |
| emptyLabel      | Text to be displayed when there's no data                                                                  | string                                                                     | `'No data'` | No       |
| selection       | the configuration for selection                                                                            | object                                                                     |             | No       |
| expandation     | Expand configuration                                                                                       | object                                                                     |             |          | no |
| loading         | determines whether data is being loaded or not                                                             | bool                                                                       | `false`     | No       |
| className       | extra custom class name                                                                                    | string                                                                     | `''`        | No       |
| rowClassName    | class name for row                                                                                         | string \| (data: object, rowIndex: number) => string                       | ''          | No       |
| prefix          | custom prefix                                                                                              | string                                                                     | `'zent'`    | No       |
| pageInfo        | pagination information                                                                                     | object                                                                     | null        | No       |
| paginationType  | Pagination type, `'default'` \| `'lite'` \| `'mini'`                                                                  | string                                                                     | `'default'` | No       |
| onRowClick      | callback fires when a row is clicked                                                                       | (data: any, index: number, event: Event) => any                            |             | No       |
| ellipsis        | whether ellipsis should be displayed when content overflows (nowrap of columns needs to be set)            | bool                                                                       | false       | No       |
| onExpand        | callback fires when the row expand icon is clicked                                                         | (data: {expanded: boolean, data: any, event: Event, index: number}) => any |             | No       |
| components      | custom table element                                                                                       | object { row?: ComponentType }                                             |             | No       |
| rowProps        | custom row props                                                                                           | (data: any, index: number) => object                                       |             | No       |
| bordered        | whether to display the outer border and column border                                                      | bool                                                                       | `false`     | No       |

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

#### columns

| Property    | Description                                                                                         | Type                                                                                                                 | Required |
| ----------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- | -------- |
| title       | column title                                                                                        | ReactNode                                                                                                            | Yes      |
| name        | key for the corresponding data(recommanded to be set). Nested description like `a.b.c` is supported | string                                                                                                               | No       |
| width       | column width                                                                                        | string \| number                                                                                                     | No       |
| bodyRender  | Render complex component                                                                            | ((data: any, pos: {row: number, column: number, fixed?: 'left' \| 'right'}, name: string) => ReactNode) \| ReactNode | No       |
| className   | class name of the column title                                                                      | string                                                                                                               | No       |
| needSort    | whether to support sorting                                                                          | bool                                                                                                                 | No       |
| colSpan     | span of columns. It won't be rendered if the value is set to 0                                      | number                                                                                                               | No       |
| fixed       | whether columns fixed or not. The value can be `left` `right` `true` (`true` is same to `left`)     | bool \| strig                                                                                                        | No       |
| onCellClick | callback fires when a cell is clicked                                                               | (data: any, event: Event) => any                                                                                     | No       |
| textAlign   | Text alignment                                                                                      | string                                                                                                               | No       |
| nowrap      | whether to wrap, true by default                                                                    | bool                                                                                                                 | No       |
| defaultText | default display text                                                                                | ReactNode                                                                                                            | No       |
| children    | render grouping table headers                                                                       | array                                                                                                                | No       |

#### selection

| Property         | Description                                | Type                                                              | Required      |
| ---------------- | ------------------------------------------ | ----------------------------------------------------------------- | ------------- |
| selectedRowKeys  | keys of selected rows by default           | array                                                             | No            |
| onSelect         | callback fires when a check changes        | (selectedkeys: string[], selectedRows: Array<any>, changeRow: any | any[]) => any | No |
| getCheckboxProps | function to get properties of the checkbox | (data: object) => { disabled?: boolean }                          | No            |

#### pageInfo

| Property        | Description                              | Type     | Required |
| --------------- | ---------------------------------------- | -------- | -------- |
| total           | Total number of items                    | number   | No       |
| pageSize        | Number of items to be displayed per page | number   | No       |
| pageSizeOptions | Page size options                        | number[] | No       |
| current         | current page                             | number   | No       |

### expandation

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
