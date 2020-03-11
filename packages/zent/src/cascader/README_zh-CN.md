---
title: Cascader
subtitle: 级联选择
path: component/cascader
group: 数据
---

## Cascader 级联选择

适用于各类级联操作（例如城市级联）

### API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| value | 级联的选中值 | array | [] | '' |
| type | UI 类型，有标签形式和菜单形式 | string | `menu` | `tabs` |
| options | 可选项数据源 | array | [] | '' |
| title | tab子项的标题，每一项的默认值是标题 | array | [] | '' |
| onChange | 选择完成后的回调 | `(value, selectedOptions, type) => void` | - | '' |
| loadOptions | 动态加载级联的数据，返回值需为 Promise | func | - | '' |
| changeOnSelect | 是否选择即时触发改变 | boolean | false | '' |
| expandTrigger | 次级菜单的展开方式，可选 'click' 和 'hover'， 只支持type为menu | string | 'click' | 'hover' |
| placeholder | 输入框占位文本 | string | '请选择' | '' |
| className | 自定义额外类名 | string | '' | '' |
| popupClassName | popover自定义类名 | string | ''zent-cascader__popup'' | '' |
| displayRender | 选择后展示的渲染函数 | selectedOptionArray => ReactNode | selectedOptions =>  selectedOptions.map(option => option.title).join(' / ') | '' |
| disabled | 是否禁用 | boolean | false | true |
| clearable | 显示清除按钮 | boolean | `false` | '' |
| multiple | 是否支持多选， 只支持type为menu | boolean | `false` | '' |
| scrollLoadable | 是否支持滚动加载，配合loadOptions使用  | boolean | `false` | '' |
| searchable | 是否显示搜索框 | boolean | `false` | '' |
| searchOptions | 异步搜索返回options | keyword => options | - | '' |
| emptyContent | 搜索结果为空的展示 | string | `无搜索结果` | '' |

-   通过 `loadOptions` 加载数据时，参数 `root` 表示当前点击元素的数据对象，`stage` 表示当前是第几层级
-   参数 `isLeaf` 是配合 `loadOptions` 使用的，表示点击该节点时是否不再继续发请求

