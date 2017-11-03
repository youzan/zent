---
title: Pagination
path: component/pagination
group: Navigation
---

## Pagination

Pagination component

### Guide

- The total number of items to display need to be known.

### API

| Property            | Description      | Type            | Default      | Required |
| ---------------| --------- | -------------- | ---------- | ------- |
| current       | current page    | number        | `1`      | Yes    |
| totalItem     | number of total items     | number        |          | Yes    |
| pageSize      | number of items to be displayed per page    | number, array | `10`     | No    |
| maxPageToShow | max number of pages to be displayed | number        |          | No    |
| onChange      | callback for page changing    | function      |          | No    |
| className     | extra custom class name | string        | `''`     | No    |
| prefix        | custom prefix   | string        | `'zent'` | No   |

#### About `pageSize`

pageSize property supports 3 types of structure:

- number: `30`

- arrayOf(number): `[10,20,30]`

The initial value is 10.

- `[10, 20, { value: 30, isCurrent: true }]`

The initial value is 30.

### Component Mechanism

- The component is composed of core-pagination and zent-pagination.

The former is the core pagination component. The later simulates the interaction of www, based on the former.

- There's a built-in parser to parse input to `renderData`.

### Input/Output of the parser

#### Input

```
{ total: 20, current: 4 }
```

#### Output

```javascript
[{
  'content': '上一页',
  'target': 3
}, {
  'content': '1',
  'target': 1
}, {
  'content': '...',
}, {
  'content': '3',
  'target': 3,
}, {
  'content': '4',
  'target': 4,
  'current': true,
}, {
  'content': '5',
  'target': 5
}, {
  'content': '...',
  'target': 6
}, {
  'content': '20'
  'target': 20
}, {
  'content': '下一页'
  'target': 5
}];
```

<style>
.zent-pager-control-group {
	display: flex;
	
	.zent-pager-input {
		margin-left: 10px;
		width: 200px;
	}
}

</style>
