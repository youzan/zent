---
title: Pagination
subtitle: 分页
path: component/pagination
group: 导航
---

## Pagination 分页

共有 3 种样式。

### API

#### Pagination

⚠️ 注意：API 不向下兼容老版的分页组件。

| 参数            | 说明                       | 类型                                                    | 默认值     | 是否必填 |
| --------------- | -------------------------- | ------------------------------------------------------- | ---------- | -------- |
| onChange        | 翻页和分页大小改变时的回调 | `({pageSize: number, current: number}) => any`          |            | 是       |
| current         | 当前页数                   | `number`                                                | `1`        | 否       |
| total           | 总个数                     | `number`                                                | `0`        | 否       |
| formatTotal     | 格式化展示的总数           | `(total: number) => React.ReactNode`                    | `identity` | 否       |
| pageSize        | 每页个数                   | `number`                                                | `10`       | 否       |
| pageSizeOptions | 分页选项                   | `Array<number>` \| `Array<{text: node, value: number}>` |            | 否       |
| showQuickJumper | 是否可以快速跳转到指定页   | `boolean`                                               | `true`     | 否       |
| showSizeChanger | 是否可以改变分页大小       | `boolean`                                               | `true`     | 否       |
| buttonBordered  | 按钮是否有边框             | `boolean`                                               | `true`     | 否       |
| className       | 自定义额外类名             | `string`                                                |            | 否       |

#### LitePagination

| 参数            | 说明                       | 类型                                                    | 默认值  | 是否必填 |
| --------------- | -------------------------- | ------------------------------------------------------- | ------- | -------- |
| onChange        | 翻页和分页大小改变时的回调 | `({pageSize: number, current: number}) => any`          |         | 是       |
| current         | 当前页数                   | `number`                                                | `1`     | 否       |
| total           | 总个数                     | `number`                                                | `0`     | 否       |
| pageSize        | 每页个数                   | `number`                                                | `10`    | 否       |
| pageSizeOptions | 分页选项                   | `Array<number>` \| `Array<{text: node, value: number}>` |         | 否       |
| showQuickJumper | 是否可以快速跳转到指定页   | `boolean`                                               | `false` | 否       |
| showSizeChanger | 是否可以改变分页大小       | `boolean`                                               | `false` | 否       |
| buttonBordered  | 按钮是否有边框             | `boolean`                                               | `false` | 否       |
| className       | 自定义额外类名             | `string`                                                |         | 否       |

#### MiniPagination

| 参数           | 说明                       | 类型                                           | 默认值  | 是否必填 |
| -------------- | -------------------------- | ---------------------------------------------- | ------- | -------- |
| onChange       | 翻页和分页大小改变时的回调 | `({pageSize: number, current: number}) => any` |         | 是       |
| current        | 当前页数                   | `number`                                       | `1`     | 否       |
| total          | 总个数                     | `number`                                       | `0`     | 否       |
| pageSize       | 每页个数                   | `number`                                       | `10`    | 否       |
| buttonBordered | 按钮是否有边框             | `boolean`                                      | `false` | 否       |
| className      | 自定义额外类名             | `string`                                       |         | 否       |
