---
title: Pagination
path: component/pagination
group: Navigation
---

## Pagination

Pagination has 3 different styles.

### API

⚠️ Warning: API is not compatible with old versions.

| Property        | Description                               | Type                                                    | Default                                                                                    | Required |
| --------------- | ----------------------------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------ | -------- |
| onChange        | Callback when pageSize or current changes | `({pageSize: number, current: number}) => any`          |                                                                                            | Yes      |
| current         | Current page number                       | `number`                                                | `1`                                                                                        | No       |
| total           | Total number of items                     | `number`                                                | `0`                                                                                        | No       |
| type            | Pagination type                           | `'normal'` \| `'lite'` \| `'mini'`                      | `'normal'`                                                                                 | No       |
| pageSize        | Number of items per page                  | `number`                                                | `10`                                                                                       | No       |
| pageSizeOptions | Page size options                         | `Array<number>` \| `Array<{text: node, value: number}>` |                                                                                            | No       |
| showQuickJumper | Allow quick jump to page                  | `boolean`                                               | `true` if `type` is `normal`, `false` if `type` is `lite`, not allowed if `type` is `mini` | No       |
| showSizeChanger | Allow change page size                    | `boolean`                                               | `true` if `type` is `normal`, `false` if `type` is `lite`, not allowed if `type` is `mini` | No       |
| buttonBordered  | Button has border                         | `boolean`                                               | `true` if `type` is `normal`, otherwise `false`                                            | No       |
| className       | Custom class name                         | `string`                                                |                                                                                            | No       |
