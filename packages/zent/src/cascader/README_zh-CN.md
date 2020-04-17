---
title: Cascader
subtitle: 级联选择
path: component/cascader
group: 数据
---

## Cascader 级联选择

适用于各类级联操作（例如城市级联）

### API

`Cascader` 包含 `MenuCascader` 及 `TabsCascader`，它们大部分 api 是共用的。

### 共用的 api

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| value | 级联的选中值 | `array` | [] | '' |
| options | 可选项数据源 | `array` | [] | '' |
| onChange | 选择完成后的回调 | `(value, selectedOptions, meta) => void` | - | '' |
| loadOptions | 动态加载级联的数据 | `(selectedOptions, meta) => Promise<options>` | - | '' |
| changeOnSelect | 是否选择即时触发改变 | boolean | `false` | `true` |
| placeholder | 输入框占位文本 | string | '请选择' | '' |
| className | 自定义额外类名 | string | '' | '' |
| popupClassName | popover 自定义类名 | string | ''zent-cascader__popup'' | '' |
| displayRender | 选择后展示的渲染函数 | `selectedOptions =>  selectedOptions.map(option => option.label).join(' / ')` | '' |
| disabled | 是否禁用 | boolean | `false` | `true` |
| clearable | 显示清除按钮 | boolean | `false` | `true` |


#### Option

```
interface Option {
  value: string | number;
  label: string;
  children?: Option[];
  disabled?: boolean;
  isLeaf?: boolean;
  hasMore?: boolean;
}
```

#### meta
```
interface meta {
  keyword?: string;
  action?: string;
}
```


### MenuCascader

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| multiple | 是否支持多选 | boolean | `false` | `true` |
| expandTrigger | 次级菜单的展开方式 | string | `click` | `hover` |
| scrollable | 是否支持滚动加载  | boolean | `false` | `true` |
| searchable | 是否显示搜索框 | boolean | `false` | `true` |
| async | 是否异步搜索 | boolean | `false` | `true` |
| filter | 搜索每一项是否匹配 | `(keyword, options: Option[]) => ReactNode` |  | '' |
| limit | 搜索结果展示数量 | `number | false` | `50` | '' |

- 当 `multiple` 为 true 时，onChange 中的 value 及 selectedOptions 为二维数组
- 参数 `hasMore` 与 `scrollable` 配合时可判断它的子节点是否可滚动加载

### TabsCascader

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| title | tab 每项的标题，默认值为 `label` 字段的值 | `ReactNode[]` | [] | '' |
