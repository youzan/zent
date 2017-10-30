---
title: Breadcrumb
subtitle: 面包屑
path: component/breadcrumb
group: 导航
---

## Breadcrumb 面包屑

面包屑，提供一个有层次的导航结构, 并标明当前位置。

### 使用指南

-   系统拥有超过两级以上的层级结构。
-   需要告知用户『你在哪里』。
-   需要向上导航的功能。

### API

#### Breadcrumb

| 参数    |   说明          | 类型     | 默认值        |
| --------- | ------------- | ------ | ---------- |
| breads      | 数据  | array | `[]`   |
| className | 自定义额外类名  | string | `''`       |
| prefix    | 自定义前缀    | string | `'zent'`   |

#### Item

| 参数        | 说明      | 类型                      | 默认值  |
| --------- | ------- | ----------------------- | ---- |
| className | 自定义额外类名 | string                  | `''` |
| name      | 内容      | string or React node |  -    |
| href      | 链接      | string                  |   -   |
