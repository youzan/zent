---
title: Grid
path: component/grid
group: Navigation
---

## Grid

The function of the component is similar to the function of [Table](table) component. `Grid` is implemented by `<table>` tag, while `Table` is implemented by `div` and `flex` layout.

### API

| Property     | Descripition                     | Type    | Default   | Required |
| -------- | ------------------------------------ | ----- | ------- | ------- |
| columns  | columns                            | array |         |   Yes    |
| datasets | data to be displayed                         | array |         |   Yes    |
| rowKey   | key for each row                          | string |  `id`    |   No    |
| onChange | callback fires when columns change, filtering and sorting included  | func | `noop` | No    |
| scroll |  can be scrolled in x/y direction, x or y can be a number that indicates the width and height of table body：{{ x: 1300, y: 300 }}  | object |  | No   |
| sortBy   | the field which rows are sorted accoring to, should be one of keys for columns| string | '' | No |
| sortType | The way to sort                            | string  |     ''   |   No    |
| emptyLabel | Text to be displayed when there's no data                | string   | `'No data'` | No |
| selection  | the configuration for selection                | object     |         | No    |
| loading    | determines whether data is being loaded or not          | bool          | `false` | No  |
| className  | extra custom class name                    | string        | `''`   | No   |
| rowClassName | class name for row                  | string or func(data, index) |  ''   | No   |
| prefix     | custom prefix                       | string       | `'zent'` | No  |
| pageInfo   | pagination information               | object        | null   | No  |
| onRowClick | callback fires when a row is clicked                     | func(data, index, event) | | No |
| ellipsis   | whether ellipsis should be displayed when content overflows (nowrap of columns needs to be set) | bool | false | No |

#### onChange function declaration
onChange will throw an object, which includes parameters about the change part of pagination.

```js
{
	current, // {Number} the current page
	sortBy, // {String} the key which rows are sorted according to
	sortType, // {String} ['asc', 'desc', ''] the way to sort
}
```

#### columns

| Property         | Description                               | Type        | Required |
| ---------- | ----------------------------------- | ---------- | ---- |
| title      | column title                       |  node       | Yes    |
| name       | key for the corresponding data(recommanded to be set). Nested description like `a.b.c` is supported  | string   | No    |
| width      | column width                             | string or number | No    |
| bodyRender | Render complex component                        | func(data, pos, name) or node |  No  |
| className  | class name of the column title                 | string |  No  |
| needSort   | whether to support sorting  | bool   | No   |
| colSpan    | span of columns. It won't be rendered if the value is set to 0             | number | No    |
| fixed      | whether columns fixed or not. The value can be `left` `right` `true` (`true` is same to `left`) | bool or strig | No |
| onCellClick | callback fires when a cell is clicked                     | func(data, event) | 否 |
| textAlign  | Text alignment                        | string | No |
| nowrap     | whether to wrap, true by default                    | bool | No |


#### selection

| Property              | Description              | Type    | Required |
| --------------- | --------------- | ----- | ---- |
| selectedRowKeys | keys of selected rows by default            | array | No    |
| onSelect | callback fires when a check changes | func(selectedKeys, selectedRows, currentRow)  | No |
| getCheckboxProps | function to get properties of the checkbox | func(data) | No |


#### pageInfo

| Property              | Description              | Type  | Required |
| --------------- | --------------- | --- | ----- |
| totalItem | Total number of items | number| No    |
| pageSize | Number of items to be displayed per page   | number | No    |
| current | current page | number | No |


<style>
  .switch {
		margin-bottom: 10px;
  }
  .big-size {
  	font-size: 20px;
  }
</style>
