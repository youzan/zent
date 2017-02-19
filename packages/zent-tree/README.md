# zent-tree

Tree ui react component for zent

# Zent Tree

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

## Tree相关属性

| 参数       |  说明                                         |  类型             | 默认值            | 备选值   |
|-----------|-----------------------------------------------|------------------|-------------------|--------|
|dataType   |  数据类型，默认为tree类型                        | string            | 'tree'           | 'plain'|
|data       |  实际传入的数据(必填)，根据dataType进行识别        | array             | 必填              |        |
|render     |  自定义树条目渲染方法，传入参数为该节点数据(包含子树) | function(data)    | null             |         |
|operations |  自定义操作，包含name、icon、action、shouldRender属性 | array[object] | null             |         |
|foldable   |  是否支持点击条目时展开与收起动作，默认为true       | bool               | true            |         |
|checkable  |  是否支持checkbox选择，默认为false               | bool               | true            |         |
|onCheck    |  点击checkbox的回调函数，传入包含所有点击节点id数组 | function(data)     | null            |         |
|defaultCheckedKeys  | 默认选中节点id数组                     | array              | null            |         |
|disabledCheckedKeys | 默认禁选节点id数组                     | array              | null            |         |
|size       |  大小                                         | string             | 'medium'        |         |
|commonStyle|  设置整个tree的外层style                        | object             | null            |'small'、'large' |
|expandAll  |  是否展开所有节点                               | bool               | false           |true     |
|onExpand   |  展开节点之后的回调函数                          | function(data, config)    | null     |         |
|autoExpandOnSelect   |  点击节点是否展开                     | bool               | true            |         |
|onSelect   |  选择树的一个节点的回调函数                       | function(data, target)   | null      |         |
|isRoot     |  plain数据类型，判断节点是否为根节点的api          | function(node)     | null            |         |

### data包含字段(可自由扩展其他字段)
| 参数       |  说明                                         |  类型             | 默认值            | 备选值   |
|-----------|-----------------------------------------------|-------------------|-----------------|---------|
|id         |  必填，数据的唯一标识                            | number/string     | 必填             |         |
|title      |  显示内容                                      | string            | 必填             |         |
|children   |  子树(dataType="tree"生效)                     | array[object]     | null            |         |
|parentId   |  父节点Id(dataType="plain"生效)，根节点为0或不定义 | number/string     | null            |         |
|expand     |  是否展开                                      | bool              | false           | true    |
|isLeaf     |  是否叶子节点                                   | bool              | false           | true    |

### operations包含字段
| 参数       |  说明                                         |  类型             | 默认值            | 备选值   |
|-----------|-----------------------------------------------|------------------|------------------|---------|
|name        |  显示内容                                     | string            | 必填             |        |
|icon        |  显示icon的className                          | string            | null            |        |
|action      |  点击回调函数，参数为子树信息                     | function(data)    | 必填             |        |
|shouldRender|  是否更新，返回true/false                      | function(data)    | null             |        |
