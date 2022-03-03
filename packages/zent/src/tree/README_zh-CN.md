---
title: Tree
subtitle: 树
path: component/tree
group: 信息展示
scatter: true
---

## Tree 树

可视化展示多层级结构的内容，支持展开和折叠。

### 建议

- 层级信息需要在一个窗口中展示时，可使用树组件。

### 注意

- 非层级关系或层级信息无需在一个窗口中展示时，不使用树结构。

### 代码演示

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-7 -->
<!-- demo-slot-8 -->
<!-- demo-slot-9 -->

### API

#### Tree

| 参数                    | 说明                                                                | 类型                | 默认值     | 备选值               |
| ----------------------- | ------------------------------------------------------------------- | ------------------- | ---------- | -------------------- | --- |
| dataType                | 数据类型, 默认为 tree 类型                                          | string              | `'tree'`   | `'plain'`            |
| data                    | 必填, 实际传入的数据, 根据 dataType 进行识别                        | array               |            |                      |
| renderKey               | 渲染节点所用到的 key 集合, 具体看下表                               | object              |            |                      |
| render                  | 自定义树条目渲染方法, 传入参数为该节点数据 (包含子树)               | func(data)          |            |                      |
| operations              | 自定义操作, 包含 `name`, `icon`, `action`, `shouldRender` 属性      | array[object]       |            |                      |
| foldable                | 是否支持点击条目时展开与收起动作                                    | bool                | `true`     |                      |
| onCheck                 | 点击 checkbox 的回调函数, 接受所选中节点的数组与帮助自定义的信息    | func(ids, helpInfo) |            |                      |
| checkable               | 是否支持 checkbox 选择                                              | bool                | `true`     |                      |     |
| checkedKeys             | checkbox 选中节点 id 数组                                           | array               |            |                      |
| disabledCheckedKeys     | checkbox 默认禁选节点 id 数组                                       | array               |            |                      |
| size                    | 大小                                                                | string              | `'medium'` | `'small'`, `'large'` |
| commonStyle             | 设置整个 tree 的外层 style                                          | object              |            |                      |
| expandAll               | 是否展开所有节点                                                    | bool                | `false`    |                      |
| onExpand                | 展开节点之后的回调函数                                              | func(data, config)  |            |                      |
| autoExpandOnSelect      | 点击节点是否展开                                                    | bool                | `false`    |                      |
| onSelect                | 点击树的一个节点的回调函数                                          | func(data, target)  |            |                      |
| isRoot                  | plain 数据类型，判断节点是否为根节点的 api                          | func(node)          |            |                      |
| loadMore                | 返回 Promise 的函数，必须支持 then 的回调, 用于节点异步加载更多内容 | func(data)          |            |                      |
| selectable              | 节点是否可选                                                        | bool                | `false`    |                      |
| selectedKey             | 当前选中的节点                                                      | `string`\|`number`  |            |                      |
| disabledSelectedKeys    | 禁选的节点 ID 集合                                                  | `(string            | number)[]` |                      |     |
| disableSelectedStrictly | 父级被禁选时是否同时禁选其子级                                      | `boolean`           | `false`    | `true`               |
| onlyShowOneLine         | title 是否只展示一行                                                | `boolean`           | `false`    | `true`               |

#### renderKey

针对 `data`  使用到的部分 key，定制化。

| 参数     | 说明                                       | Type   | Default      |
| -------- | ------------------------------------------ | ------ | ------------ |
| id       | 对应 数据的唯一标识                        | string | `'id'`       |
| title    | 对应 显示内容                              | string | `'title'`    |
| children | 对应 子树 (`dataType="tree"` 时生效)       | string | `'children'` |
| parentId | 对应 父节点 Id (`dataType="plain"` 时生效) | string | `'parentId'` |

#### data

可在每个节点任意添加初下列属性之外的 key-value，回调函数中会拿到用户传入的完整数据。
可以通过`renderKey`， 定制 key。

| 参数     | 说明                                                       | 类型          | 默认值  | 备选值 |
| -------- | ---------------------------------------------------------- | ------------- | ------- | ------ |
| id       | 必填, 数据的唯一标识                                       | number/string |         |        |
| title    | 必填, 显示内容                                             | string        |         |        |
| children | 子树 (`dataType="tree"` 时生效)                            | array[object] |         |        |
| parentId | 父节点 Id (`dataType="plain"` 时生效), 根节点为 0 或不定义 | number/string |         |        |
| expand   | 是否展开                                                   | bool          | `false` |        |
| isLeaf   | 是否叶子节点                                               | bool          | `false` |        |

#### operations

| 参数         | 说明                                 | 类型              | 默认值 | 备选值 |
| ------------ | ------------------------------------ | ----------------- | ------ | ------ |
| name         | 必填，显示内容                       | string            |        |        |
| icon         | 显示 icon 的 className, 或 ReactNode | string／ReactNode |        |        |
| action       | 必填，点击回调函数，参数为子树信息   | func(data)        |        |        |
| shouldRender | 是否更新，返回 true/false            | func(data)        | `true` |        |

#### 以下功能新版设计语言已废弃，仅作为老版使用的参考

<!-- demo-slot-3 -->
<!-- demo-slot-4 -->
<!-- demo-slot-5 -->
<!-- demo-slot-6 -->
