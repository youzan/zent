---
title: Tree
path: component/tree
group: Data Display
scatter: true
---

## Tree

Visually display multilevel content, supporting expansion and collapse.

### Suggestion

- Use the `Tree` component when hierarchical information needs to be displayed in a window.

### Note

- Do not use `Tree` when non-hierarchical or hierarchical information does not need to be displayed in a window.

### Demos

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-7 -->
<!-- demo-slot-8 -->
<!-- demo-slot-9 -->

### API

#### Tree

| Property                | Description                                                                                       | Type                | Default    | Alternative          |
| ----------------------- | ------------------------------------------------------------------------------------------------- | ------------------- | ---------- | -------------------- | --- |
| dataType                | data structure, default is tree                                                                   | string              | `'tree'`   | `'plain'`            |
| data                    | required, input data, identified by dataType                                                      | array               |            |                      |
| renderKey               | the key map for render node, see the following table                                              | object              |            |                      |
| render                  | you can customize function to render tree , the parameter is node data (includings children tree) | func(data)          |            |                      |
| operations              | custom operate, includes `name`, `icon`, `action`, `shouldRender` attributes                      | array[object]       |            |                      |
| foldable                | whether to support item show and hide                                                             | bool                | `true`     |                      |
| onCheck                 | when you click checkbox, callback function will call, params is a checked id list and help info   | func(ids, helpInfo) |            |                      |
| checkable               | whether to support checkbox                                                                       | bool                | `true`     |                      |     |
| checkedKeys             | checked node id array                                                                             | array               |            |                      |
| disabledCheckedKeys     | default disabled selected node id array                                                           | array               |            |                      |
| size                    | size                                                                                              | string              | `'medium'` | `'small'`, `'large'` |
| commonStyle             | set entire tree style                                                                             | object              |            |                      |
| expandAll               | whether to expand all nodes                                                                       | bool                | `false`    |                      |
| onExpand                | after node expands, callback is trigger                                                           | func(data, config)  |            |                      |
| autoExpandOnSelect      | node auto expands when you select it                                                              | bool                | `false`    |                      |
| onSelect                | the callback when you choose tree node                                                            | func(data, target)  |            |                      |
| isRoot                  | plain data, to determine whether the node is the api of the root node                             | func(node)          |            |                      |
| loadMore                | return Promise func, support thenable callback, be used to asynchronously load more content       | func(data)          |            |                      |
| selectable              | whether the node is selectable                                                                    | bool                | `false`    |                      |
| selectedKey             | The currently selected node                                                                       | `string`\|`number`  |            |                      |
| disabledSelectedKeys    | A collection of forbidden nodes id                                                                | `(string            | number)[]` |                      |     |
| disableSelectedStrictly | Whether the parent is prohibited from selecting its children at the same time                     | `boolean`           | `false`    | `true`               |
| onlyShowOneLine         | Title Whether only show one line                                                                  | `boolean`           | `false`    | `true`               |

#### renderKey

The Key for customized for `data`.

| Property | Description                                        | Type   | Default      |
| -------- | -------------------------------------------------- | ------ | ------------ |
| id       | key for unique key                                 | string | `'id'`       |
| title    | key for show title                                 | string | `'title'`    |
| children | key for children tree (`dataType="tree"` it works) | string | `'children'` |
| parentId | key for parent Id (`dataType="plain"` it works)    | string | `'parentId'` |

#### data

Except for key-value below, you can add attributes on any node, the callback will get entire data that user input.
You can customize key through `renderKey`.

| Property | Description                                                          | Type          | Default |
| -------- | -------------------------------------------------------------------- | ------------- | ------- |
| id       | required, unique key                                                 | number/string |         |
| title    | required, show title                                                 | string        |         |
| children | children tree (`dataType="tree"` it works)                           | array[object] |         |
| parentId | parent Id (`dataType="plain"` it works), root node is 0 or undefined | number/string |         |
| expand   | whether to expand or not                                             | bool          | `false` |
| isLeaf   | whether is leaf node or not                                          | bool          | `false` |

#### operations

| Property     | Description                                              | Type             | Default |
| ------------ | -------------------------------------------------------- | ---------------- | ------- |
| name         | required, show content                                   | string           |         |
| icon         | display icon className, or ReactNode                     | string/ReactNode |         |
| action       | required, click callback, the parameter is children tree | func(data)       |         |
| shouldRender | is it need to update, return true/false                  | func(data)       | `true`  |

#### The following functions is obsolete in the new design system and is only used as a reference for the old version

<!-- demo-slot-3 -->
<!-- demo-slot-4 -->
<!-- demo-slot-5 -->
<!-- demo-slot-6 -->
