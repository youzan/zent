<p>
	<a href="https://github.com/youzan/">
		<img alt="有赞logo" width="36px" src="https://img.yzcdn.cn/public_files/2017/02/09/e84aa8cbbf7852688c86218c1f3bbf17.png" alt="youzan" />
	</a>
</p>

# zent-tree

[![npm version](https://img.shields.io/npm/v/zent-tree.svg?style=flat)](https://www.npmjs.com/package/zent-tree) [![downloads](https://img.shields.io/npm/dt/zent-tree.svg)](https://www.npmjs.com/package/zent-tree)

树形架构展示组件, 展现层级关系, 并提供展开/收起/选择等交互功能.

## 使用场景

需要展示文件夹、组织架构、生物分类、国家地区等等数据.

## API

### Tree

| 参数                  | 说明                                                    | 类型                 | 默认值        | 备选值                  |
| ------------------- | ----------------------------------------------------- | ------------------ | ---------- | -------------------- |
| dataType            | 数据类型, 默认为tree类型                                       | string             | `'tree'`   | `'plain'`            |
| data                | 必填, 实际传入的数据, 根据dataType进行识别                           | array              |            |                      |
| render              | 自定义树条目渲染方法, 传入参数为该节点数据 (包含子树)                         | func(data)         |            |                      |
| operations          | 自定义操作, 包含 `name`, `icon`, `action`, `shouldRender` 属性 | array[object]      |            |                      |
| foldable            | 是否支持点击条目时展开与收起动作                                      | bool               | `true`     |                      |
| checkable           | 是否支持checkbox选择                                        | bool               | `true`     |                      |
| onCheck             | 点击checkbox的回调函数, 传入包含所有点击节点id数组                       | func(data)         |            |                      |
| defaultCheckedKeys  | 默认选中节点id数组                                            | array              |            |                      |
| disabledCheckedKeys | 默认禁选节点id数组                                            | array              |            |                      |
| size                | 大小                                                    | string             | `'medium'` | `'small'`, `'large'` |
| commonStyle         | 设置整个tree的外层style                                      | object             |            |                      |
| expandAll           | 是否展开所有节点                                              | bool               | `false`    |                      |
| onExpand            | 展开节点之后的回调函数                                           | func(data, config) |            |                      |
| autoExpandOnSelect  | 点击节点是否展开                                              | bool               | `true`     |                      |
| onSelect            | 选择树的一个节点的回调函数                                         | func(data, target) |            |                      |
| isRoot              | plain数据类型，判断节点是否为根节点的api                              | func(node)         |            |                      |

### data

| 参数       | 说明                                        | 类型            | 默认值     |
| -------- | ----------------------------------------- | ------------- | ------- |
| id       | 必填, 数据的唯一标识                               | number/string |         |
| title    | 必填, 显示内容                                  | string        |         |
| children | 子树 (`dataType="tree"` 时生效)                | array[object] |         |
| parentId | 父节点Id (`dataType="plain"` 时生效), 根节点为0或不定义 | number/string |         |
| expand   | 是否展开                                      | bool          | `false` |
| isLeaf   | 是否叶子节点                                    | bool          | `false` |

### operations

| 参数           | 说明                | 类型         | 是否必填 |
| ------------ | ----------------- | ---------- | ---- |
| name         | 显示内容              | string     | 是    |
| icon         | 显示icon的className  | string     | 否    |
| action       | 点击回调函数，参数为子树信息    | func(data) | 是    |
| shouldRender | 是否更新，返回true/false | func(data) | 否    |
