---
title: Pagination
path: component/pagination
group: Navigation
---

## Pagination

Pagination has 3 different styles.

### API

#### Pagination

⚠️ Warning: API is not compatible with old versions.

| Property        | Description                               | Type                                                    | Default    | Required |
| --------------- | ----------------------------------------- | ------------------------------------------------------- | ---------- | -------- |
| onChange        | Callback when pageSize or current changes | `({pageSize: number, current: number}) => any`          |            | Yes      |
| current         | Current page number                       | `number`                                                | `1`        | No       |
| total           | Total number of items                     | `number`                                                | `0`        | No       |
| formatTotal     | Format total for display                  | `(total: number) => React.ReactNode`                    | `identity` | No       |
| pageSize        | Number of items per page                  | `number`                                                | `10`       | No       |
| pageSizeOptions | Page size options                         | `Array<number>` \| `Array<{text: node, value: number}>` |            | No       |
| showQuickJumper | Allow quick jump to page                  | `boolean`                                               | `true`     | No       |
| showSizeChanger | Allow change page size                    | `boolean`                                               | `true`     | No       |
| buttonBordered  | Button has border                         | `boolean`                                               | `true`     | No       |
| className       | Custom class name                         | `string`                                                |            | No       |

#### LitePagination

| Property        | Description                               | Type                                                    | Default | Required |
| --------------- | ----------------------------------------- | ------------------------------------------------------- | ------- | -------- |
| onChange        | Callback when pageSize or current changes | `({pageSize: number, current: number}) => any`          |         | Yes      |
| current         | Current page number                       | `number`                                                | `1`     | No       |
| total           | Total number of items                     | `number`                                                | `0`     | No       |
| pageSize        | Number of items per page                  | `number`                                                | `10`    | No       |
| pageSizeOptions | Page size options                         | `Array<number>` \| `Array<{text: node, value: number}>` |         | No       |
| showQuickJumper | Allow quick jump to page                  | `boolean`                                               | `false` | No       |
| showSizeChanger | Allow change page size                    | `boolean`                                               | `false` | No       |
| buttonBordered  | Button has border                         | `boolean`                                               | `false` | No       |
| className       | Custom class name                         | `string`                                                |         | No       |

#### MiniPagination

| Property       | Description                               | Type                                           | Default | Required |
| -------------- | ----------------------------------------- | ---------------------------------------------- | ------- | -------- |
| onChange       | Callback when pageSize or current changes | `({pageSize: number, current: number}) => any` |         | Yes      |
| current        | Current page number                       | `number`                                       | `1`     | No       |
| total          | Total number of items                     | `number`                                       | `0`     | No       |
| pageSize       | Number of items per page                  | `number`                                       | `10`    | No       |
| buttonBordered | Button has border                         | `boolean`                                      | `true`  | No       |
| className      | Custom class name                         | `string`                                       |         | No       |
