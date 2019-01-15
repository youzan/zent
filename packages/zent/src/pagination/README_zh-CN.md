---
title: Pagination
subtitle: 分页
path: component/pagination
group: 导航
---

## Pagination 分页

共有 3 种样式。

### API

⚠️ 注意：API 不向下兼容老版的分页组件。

| 参数            | 说明                       | 类型                                                    | 默认值                                                                                 | 是否必填 |
| --------------- | -------------------------- | ------------------------------------------------------- | -------------------------------------------------------------------------------------- | -------- |
| onChange        | 翻页和分页大小改变时的回调 | `({pageSize: number, current: number}) => any`          |                                                                                        | 是       |
| current         | 当前页数                   | `number`                                                | `1`                                                                                    | 否       |
| total           | 总个数                     | `number`                                                | `0`                                                                                    | 否       |
| type            | 分页器类型                 | `'normal'` \| `'lite'` \| `'mini'`                      | `'normal'`                                                                             | 否       |
| pageSize        | 每页个数                   | `number`                                                | `10`                                                                                   | 否       |
| pageSizeOptions | 分页选项                   | `Array<number>` \| `Array<{text: node, value: number}>` |                                                                                        | 否       |
| showQuickJumper | 是否可以快速跳转到指定页   | `boolean`                                               | `type` 为 `normal` 时为 `true`，`type` 为 `lite` 时为 `false`，`type` 为 `mini` 时无效 | 否       |
| showSizeChanger | 是否可以改变分页大小       | `boolean`                                               | `type` 为 `normal` 时为 `true`，`type` 为 `lite` 时为 `false`，`type` 为 `mini` 时无效 | 否       |
| buttonBordered  | 按钮是否有边框             | `boolean`                                               | `type` 为 `normal` 时为 `true`，其他情况为 `false`                                     | 否       |
| className       | 自定义额外类名             | `string`                                                |                                                                                        | 否       |
