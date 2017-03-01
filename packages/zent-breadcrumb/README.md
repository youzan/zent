# zent-breadcrumb

[![npm version](https://img.shields.io/npm/v/zent-breadcrumb.svg?style=flat)](https://www.npmjs.com/package/zent-breadcrumb) [![downloads](https://img.shields.io/npm/dt/zent-breadcrumb.svg)](https://www.npmjs.com/package/zent-breadcrumb)

面包屑组件, 提供一个有层次的导航结构, 并标明当前位置.

## 使用场景

-   系统拥有超过两级以上的层级结构.
-   需要告知用户『你在哪里』.
-   需要向上导航的功能.

## 使用指南

-   支持向 Breadcrumb 传递 `breads` 对象数组以生成面包屑, 数组中的对象应遵循 Item 组件规范.
-   支持自定义 Item 组件.

## API

#### Breadcrumb

| 参数        | 说明      | 类型     | 默认值      |
| --------- | ------- | ------ | -------- |
| breads    | 数据      | array  | `[]`     |
| className | 自定义额外类名 | string | `''`     |
| prefix    | 自定义前缀   | string | `'zent'` |

#### Item

| 参数        | 说明      | 类型                      | 默认值  |
| --------- | ------- | ----------------------- | ---- |
| name      | 内容      | string or react element |      |
| href      | 链接      | string                  |      |
| className | 自定义额外类名 | string                  | `''` |
