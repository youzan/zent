---
title: Table
path: component/table
group: Navigation
---

## Table

### Guides

- Both page screening and sorting will trigger `onChange` callback.

### API

| Props         | Description                                         | Type            | Default         | Alternatives     | Required |
| ---------- | ------------------------------------------ | ------------- | ----------- | ------- | ---- |
| columns    | All data needed of each column                                 | array[object] |             |         | yes    |
| datasets   | Data need to display of each row                               | array[object] |             |         | yes    |
| rowKey     | Key of each row           | string        | `id`        |         | no    |
| sortBy     | Field which used to sort, should be one element's key of columns       | string        |             |         | no    |
| sortType   | Sort order                                       | string        | `'desc'`    | `'asc'` | no    |
| onChange   | Change callback  | func          |             |         | no    |
| emptyLabel | Prompt text when list is empty                                | node        | `'No data'` |         | no    |
| selection  | Form selection function configuration | object        |             |         | no    |
| loading    | Loading status of form | bool          | `false`     |         | no    |
| getRowConf | The configuration function for each line, return a configuration object `{canSelect, rowClass}` | func          |             |         | no    |
| expandation     |  Expand configuration                                      | object        |     |         | no    |
| batchComponents     |  List for batch operations   | array[html/function/React Component] |   `null`  |   `null` | no    |
| batchComponentsAutoFixed  |   Whether to automatically fix batch operation      | bool          | `true`     |         | no    |
| autoStick  | Whether to stick the head to the window automatically                         | bool          | `false`     |         | no    |
| autoScroll | Whether to click the page automatically scroll to the top of the table                          | boll          | `false`     |         | no    |
| className  | Custom classname                                    | string        | `''`        |         | no    |
| prefix     | Custom prefix                           | string        | `'zent'`    |         | no    |
| pageInfo   | Paging information corresponding to the table | object        | `null`    |         | no    |

#### Special declaration of getRowConf

```js

  /*
  * @param data {Object} The data for each line
  * @param index {number} The index of each row in the list
  * @return {
  *  canSelect {bool} default is true
  *  rowClass {string} The special class of this line, the default is empty string
  * }
  */
  getRowConf(data, index) { // The data for each line and the index of this line in the list
    return {
      canSelect: index % 2 === 0,
      rowClass: `row-${index}`
    }
  }

```

#### onChange
onChange will throw an object containing pagination and sorting parameters：

```js
{
	sortBy, // {String} based on what to sort
	sortType, // {String} ['asc', 'desc'] sort way
	current, // {Number} current page
}
```

### columns

| Props         | Description                                  | Type                   | Default     | Required |
| ---------- | ----------------------------------- | -------------------- | ------- | ---- |
| title      | Name shows on thead of each column                     |  node               |         | no    |
| name       | Primary key of each column, affects sorting and filtering                    | string               |         | no    |
| width      | The width of each column, can be relative or fixed value. e.g. 20%/100px | string               |         | no    |
| isMoney    | Whether is amount of money | bool                 | `false` | no    |
| needSort   | Whether support sorting, this column must has key.  | bool                 | `false` | no    |
| bodyRender | Render function of this column | function |  |         | no    |
| textAlign  | Text alignment | string |    `''`     | no    |

### selection

| Props              | Description              | Type    |  Default | Required |
| --------------- | --------------- | ----- | ---- | ----- |
| selectedRowKeys | Selected by default            | array |  | no    |
| isSingleSelection | Radio or not           | bool | `false` | no    |
| needCrossPage |   Cross-page multiple choice or not | bool | `false` | no    |
| onSelect(@selectedkeys, @selectedRows, @currentRow) | Check callback | func  |  | no    |

### pageInfo

| Props              | Description              | Type    |  Default | Required |
| --------------- | --------------- | ----- | ---- | ----- |
| totalItem | Total number of entries            | number | `0` | no    |
| pageSize | Number per page   | number |  | no    |
| current | Current page number | number | | |
| maxPageToShow    | Maximum items to display | number  |  | no  
| total | Total number of entries**[deprecated]**   | number | `0` | no    |
| limit | Number per page**[deprecated]**   | number |  | no    |

### expandation

| Props              | Description              | Type    |  Default | Required |
| --------------- | --------------- | ----- | ---- | ----- |
| isExpanded | Whether to expand the current row | bool | `false` | no    |
| expandRender        | Render function of expanded row's additional content | func  |  | no  

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
