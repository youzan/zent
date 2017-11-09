---
title: Tree
path: component/tree
group: Navigation
---

## Tree

Tree widget is used to build and manipulate trees. such as files, organization structures, geographic infomation

### Guides

- Supports two types of data structure, nested tree and array.
- The widget only display input data, but not change itself.


### API


#### Tree

| Property                 | Description                                                        | Type                 | Default     | Alternative                |
| ------------------- | ------------------------------------------------------------| ------------------- | ---------- | -------------------- |
| dataType            | data structure, default is tree                                    | string             | `'tree'`   | `'plain'`            |
| data                | required, input data, identified by dataType                       | array              |            |                      |
| render              | you can customize function to render tree , the parameter is node data (includings children tree)            | func(data)         |            |                      |
| operations          | custom operate, includings `name`, `icon`, `action`, `shouldRender` 属性 | array[object]      |            |                      |
| foldable            | whether to support item show and hide                                  | bool               | `true`     |                      |
| checkable           | whether to support checkbox                                          | bool               | `true`     |                      |
| onCheck             | when you click checkbox, callback function will call, params is a array includes all nodes id array               | func(data)         |            |                      |
| defaultCheckedKeys  | default choosen node id array                                            | array              |             |                      |
| disabledCheckedKeys | default forbidden choosen node id array                                            | array              |             |                      |
| size                | size                                                         | string             | `'medium'` | `'small'`, `'large'` |
| commonStyle         | set entire tree style                                      | object             |             |                      |
| expandAll           | whether to expand all nodes                                              | bool               | `false`     |                      |
| onExpand            | after node expands, callback is trigger                                         | func(data, config) |             |                      |
| autoExpandOnSelect  | node auto expands when you select it                                               | bool               | `true`      |                      |
| onSelect            | the callback when you choose tree node                                     | func(data, target) |            |                      |
| isRoot              | plain data, to determine whether the node is the api of the root node                         | func(node)         |            |                      |

#### data

Except for key-value below, you can add attributes on anynode,  the callback will get entire data that user input

| Property      | Description                                                | Type           | Default   | Alternative |
| -------- | --------------------------------------------------- | ------------- | ------- |--------|
| id       | required, uniuqe key                                   | number/string |         |       |
| title    | required, show title                                        | string        |         |       |
| children | children tree (`dataType="tree"` it works)                       | array[object] |         |       |
| parentId | parent Id (`dataType="plain"` it works), roort node is 0 or undefined | number/string |         |       |
| expand   | whether to expand or not                                             | bool          | `false` |       |
| isLeaf   | whether is leaf node or not                                        | bool          | `false` |       |

#### operations

| Property           | Description                            | Type              |  Default   | Alternative |
| ------------ | -------------------------------- | ----------------- | ------- |--------|
| name         | required，show content                     | string            |         |        |
| icon         | display icon className, or ReactNode  | string／ReactNode  |         |       |
| action       | required，click callback，the parameter is children tree   | func(data)        |         |        |
| shouldRender | is it need to update，return true/false           | func(data)        | `true`  |        |
