---
title: Breadcrumb
subtitle: 面包屑
path: component/breadcrumb
group: 导航
---

## Breadcrumb 面包屑

用于展示当前页面在系统层级中的位置，可定位跳转，只有一行高度。

### 建议

- 当系统拥有两级以上的层级结构时，可使用面包屑；
- 当需要告知用户「你在哪里 」时，可使用面包屑；
- 当需要向上导航的功能时，可使用面包屑。

### 注意

- 面包屑不允许超过一行
- 禁止直接使用面包屑描述操作路径

### API

#### Breadcrumb

| 参数         | 说明                   | 类型   | 默认值 |
| ------------ | ---------------------- | ------ | ------ |
| breads       | 数据                   | array  | `[]`   |
| className    | 自定义额外类名         | string | `''`   |
| maxItemCount | 超出多少个进行自动折叠 | number |

#### Item

| 参数      | 说明           | 类型                 | 默认值 |
| --------- | -------------- | -------------------- | ------ |
| className | 自定义额外类名 | string               | `''`   |
| name      | 内容           | string or React node | -      |
| href      | 链接           | string               | -      |
