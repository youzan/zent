---
title: Cascader
subtitle: 级联选择
path: component/cascader
group: 数据
---

## Cascader 级联选择

适用于各类级联操作（例如城市级联）

### API

#### Cascader

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| value | 级联的选中值 | array | [] | '' |
| type | UI 类型，有标签形式和菜单形式 | string | `'tabs'` | `'menu'` |
| options | 可选项数据源 | array | [] | '' |
| title | tab子项的标题，每一项的默认值是 `标题` | array | [] | '' |
| onChange | 数据变化时的回调 | func | noop | '' |
| loadMore | 动态加载级联的数据，返回值需为 Promise | func | - | '' |
| changeOnSelect | 是否选择即触发改变 | boolean | false | '' |
| expandTrigger | 次级菜单的展开方式，可选 'click' 和 'hover'， 只针对type='menu' | string | 'click' | 'hover' |
| placeholder | 输入框占位文本 | string | '请选择' | '' |
| prefix | 自定义前缀 | string | 'zent' | '' |
| className | 自定义额外类名 | string | '' | '' |
| popClassName | popover自定义类名 | string | ''zent-cascader__popup'' | '' |
| displayText | 用于自定义选中展示文字的函数, selectedOptionArray => text | func | - | |

-   级联数据可以通过初始时传入全量 `options	` ，也可以通过 `loadMore` 动态加载
-   通过 `loadMore` 加载数据时，参数 `root` 表示当前点击元素的数据对象，`stage` 表示当前是第几层级
-   参数 `isLeaf` 是配合 `loadMore` 使用的，表示点击该节点时是否不再继续发请求

