---
title: Tree
subtitle: 树
path: component/tree
group: 导航
---

## Tree 树

树形控件，展示文件结构、组织架构、地理信息等分层数据的控件。

### 使用指南

-  支持两种数据格式，递归树形结构和单层列表结构。
-  组件展示对应传入的data属性，内部不会改变data，具体请看自定义操作的例子。

### API

#### Tree

| 参数                 | 说明                                                        | 类型                | 默认值      | 备选值                |
| ------------------- | ----------------------------------------------------------- | ------------------ | ---------- | -------------------- |
| dataType            | 数据类型, 默认为tree类型                                       | string             | `'tree'`   | `'plain'`            |
| data                | 必填, 实际传入的数据, 根据dataType进行识别                       | array              |            |                      |
| renderKey           | 渲染节点所用到的key集合, 具体看下表                              | object             |            |                      |
| render              | 自定义树条目渲染方法, 传入参数为该节点数据 (包含子树)               | func(data)         |            |                      |
| operations          | 自定义操作, 包含 `name`, `icon`, `action`, `shouldRender` 属性 | array[object]      |            |                      |
| foldable            | 是否支持点击条目时展开与收起动作                                 | bool               | `true`     |                      |
| onCheck             | 点击checkbox的回调函数, 传入包含所有点击节点id数组                 | func(data)         |            |                      |
| checkable           | 是否支持checkbox选择																					| bool               | `true`     |                      |                   | 
| checkedKeys         | 选中节点id数组                                                | array              |            |                      |
| disabledCheckedKeys | 默认禁选节点id数组                                             | array              |            |                      |
| size                | 大小                                                         | string             | `'medium'` | `'small'`, `'large'` |
| commonStyle         | 设置整个tree的外层style                                        | object             |            |                      |
| expandAll           | 是否展开所有节点                                               | bool               | `false`    |                      |
| onExpand            | 展开节点之后的回调函数                                          | func(data, config) |            |                      |
| autoExpandOnSelect  | 点击节点是否展开                                               | bool               | `true`     |                      |
| onSelect            | 选择树的一个节点的回调函数                                       | func(data, target) |            |                      |
| isRoot              | plain数据类型，判断节点是否为根节点的api                          | func(node)         |            |                      |
| loadMore            | 返回Promise的函数，必须支持then的回调, 用于节点异步加载更多内容      |  func(data)        |            |                      |

#### renderKey

针对 `data` 使用到的部分key，定制化。

| 参数      | 说明                                         | Type   | Default      |
| -------- | -------------------------------------------- | ------ | ------------ |
| id       | 对应 数据的唯一标识                             | string | `'id'`       |
| title    | 对应 显示内容                                  | string | `'title'`    |
| children | 对应 子树 (`dataType="tree"` 时生效)           | string | `'children'` |
| parentId | 对应 父节点Id (`dataType="plain"` 时生效)       | string | `'parentId'` |

#### data

可在每个节点任意添加初下列属性之外的key-value，回调函数中会拿到用户传入的完整数据。
可以通过`renderKey`， 定制key。

| 参数      | 说明                                                | 类型           | 默认值   | 备选值 |
| -------- | --------------------------------------------------- | ------------- | ------- |--------|
| id			 | 必填, 数据的唯一标识                                   | number/string |         |       |
| title    | 必填, 显示内容                                        | string        |         |       |
| children | 子树 (`dataType="tree"` 时生效)                       | array[object] |         |       |
| parentId | 父节点Id (`dataType="plain"` 时生效), 根节点为0或不定义  | number/string |         |       |
| expand   | 是否展开                                              | bool          | `false` |       |
| isLeaf   | 是否叶子节点                                           | bool          | `false` |       |

#### operations

| 参数           | 说明                            | 类型              |  默认值   | 备选值 |
| ------------ | -------------------------------- | ----------------- | ------- |--------|
| name         | 必填，显示内容                     | string            |         |        |
| icon         | 显示icon的className, 或ReactNode  | string／ReactNode  |         |       |
| action       | 必填，点击回调函数，参数为子树信息    | func(data)        |         |        |
| shouldRender | 是否更新，返回true/false           | func(data)        | `true`  |        |
