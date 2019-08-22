---
title: Table
path: component/table
group: Navigation
---

## Table(⚠️ Deprecated, use `Grid` instead)

### Guides

- Both page screening and sorting will trigger `onChange` callback.

### API

| Props                    | Description                                                                                                | Type                                 | Default     | Alternatives | Required |
| ------------------------ | ---------------------------------------------------------------------------------------------------------- | ------------------------------------ | ----------- | ------------ | -------- |
| columns                  | All data needed of each column                                                                             | array[object]                        |             |              | yes      |
| datasets                 | Data need to display of each row                                                                           | array[object]                        |             |              | yes      |
| rowKey                   | Key of each row                                                                                            | string                               | `id`        |              | no       |
| sortBy                   | Field which used to sort, should be one element's key of columns. Note: you have to sort data by yourself. | string                               |             |              | no       |
| sortType                 | Sort order                                                                                                 | string                               | `'desc'`    | `'asc'`      | no       |
| defaultSortType          | The way to sort when first click                                                                           | string                               | `'desc'`    |              | No       |
| onChange                 | Change callback                                                                                            | func                                 |             |              | no       |
| emptyLabel               | Prompt text when list is empty                                                                             | node                                 | `'No data'` |              | no       |
| selection                | Form selection function configuration                                                                      | object                               |             |              | no       |
| loading                  | Loading status of form                                                                                     | bool                                 | `false`     |              | no       |
| getRowConf               | The configuration function for each line, return a configuration object `{canSelect, rowClass}`            | func                                 |             |              | no       |
| expandation              | Expand configuration                                                                                       | object                               |             |              | no       |
| batchComponents          | List for batch operations                                                                                  | array[html/function/React Component] | `null`      | `null`       | no       |
| batchComponentsAutoFixed | Whether to automatically fix batch operation                                                               | bool                                 | `true`      |              | no       |
| autoStick                | Whether to stick the head to the window automatically                                                      | bool                                 | `false`     |              | no       |
| autoScroll               | Whether to click the page automatically scroll to the top of the table                                     | bool                                 | `false`     |              | no       |
| className                | Custom classname                                                                                           | string                               | `''`        |              | no       |
| prefix                   | Custom prefix                                                                                              | string                               | `'zent'`    |              | no       |
| pageInfo                 | Paging information corresponding to the table                                                              | object                               | `null`      |              | no       |
| paginationType  | Pagination type, `'default'` \| `'lite'` \| `'mini'`                                                                  | string                                                                     | `'default'` | No       |

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
	pageSize, // {Number} page size
}
```

### columns

| Props      | Description                                                              | Type     | Default | Required |
| ---------- | ------------------------------------------------------------------------ | -------- | ------- | -------- |
| title      | Name shows on thead of each column                                       | node     |         | No       |
| name       | Primary key of each column, affects sorting and filtering                | string   |         | No       |
| width      | The width of each column, can be relative or fixed value. e.g. 20%/100px | string   |         | No       |
| isMoney    | Whether is amount of money                                               | bool     | `false` | No       |
| needSort   | Whether support sorting, this column must has key.                       | bool     | `false` | No       |
| bodyRender | Render function of this column                                           | function |         | No       |
| textAlign  | Text alignment                                                           | string   | `''`    | No       |

### selection

| Props                                               | Description                       | Type  | Default | Required |
| --------------------------------------------------- | --------------------------------- | ----- | ------- | -------- |
| selectedRowKeys                                     | Selected by default               | array |         | No       |
| indeterminateRowKeys                                | indeterminate rows                | array |         | No       |
| isSingleSelection                                   | Radio or not                      | bool  | `false` | No       |
| needCrossPage                                       | Cross-page multiple choice or not | bool  | `false` | No       |
| onSelect(@selectedkeys, @selectedRows, @currentRow) | Check callback                    | func  |         | No       |

### pageInfo

| Props           | Description                                          | Type     | Default | Required |
| --------------- | ---------------------------------------------------- | -------- | ------- | -------- |
| total           | Total number of entries                              | number   | `0`     | No       |
| pageSize        | Number per page                                      | number   |         | No       |
| pageSizeOptions | Page size options                                    | number[] |         | No       |
| current         | Current page number                                  | number   |         | No       |
| totalItem       | Total number of entries**[deprecated], use `total`** | number   | `0`     | No       |
| limit           | Number per page**[deprecated], use `pageSize`**      | number   |         | No       |

### expandation

| Props        | Description                                          | Type                | Default | Required |
| ------------ | ---------------------------------------------------- | ------------------- | ------- | -------- |
| isExpanded   | Whether to expand the current row                    | func(record, index) |         | No       |
| expandRender | Render function of expanded row's additional content | func(record)        |         | No       |

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
