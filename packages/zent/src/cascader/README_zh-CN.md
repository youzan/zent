---
title: Cascader
subtitle: 级联选择
path: component/cascader
group: 数据
---

## Cascader 级联选择

适用于各类级联操作（例如城市级联）

### API

`Cascader` 包含 `MenuCascader` 及 `TabsCascader`，它们大部分 API 是共用的。

### 共用的 API

| 参数              | 说明                                                                    | 类型                                                                                                          | 是否必填 | 默认值       | 备选值 |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------- | ------------ | ------ |
| value             | 级联的选中值                                                            | `CascaderValue[]`                                                                                             | 否       | `[]`         |        |
| options           | 可选项数据源                                                            | `ICascaderItem[]`                                                                                             | 是       | `[]`         |        |
| onChange          | 选择完成后的回调                                                        | `(value: CascaderValue[], selectedOptions: ICascaderItem[], meta: ICascaderChangeMeta) => void`               | 是       | -            |        |
| loadOptions       | 动态加载级联的数据                                                      | `(selectedOptions: ICascaderItem[], meta: ICascaderLoadMeta) => Promise<void>`                                | 否       | -            |        |
| changeOnSelect    | 是否选择即时触发改变                                                    | `boolean`                                                                                                     | 否       | `false`      | `true` |
| placeholder       | 输入框占位文本                                                          | `string`                                                                                                      | 否       | `请选择`     |        |
| className         | 自定义额外类名                                                          | `string`                                                                                                      | 否       |              |        |
| popupClassName    | popover 自定义类名                                                      | `string`                                                                                                      | 否       |              |        |
| disabled          | 是否禁用                                                                | `boolean`                                                                                                     | 否       | `false`      | `true` |
| clearable         | 显示清除按钮                                                            | `boolean`                                                                                                     | 否       | `false`      | `true` |
| visible           | 和 `onVisibleChange` 一起使用时 `Cascader` 的打开关闭状态完全由外部控制 | `boolean`                                                                                                     | 否       |              |        |
| onVisibleChange   | 配合 `visible` 一起使用                                                 | `(visible: boolean) => void`                                                                                  | 否       |              |        |
| renderValue       | 渲染选中中的一个选项值                                                      | `(selectedOptions: ICascaderItem[]) => string`                                                                | 否       |              |        |
| renderItemContent | 自定义渲染选项内容                                                      | `(node: ICascaderItem) => ReactNode`                                                                          | 否       | `node.label` |        |
| getItemTooltip    | 自定义选项的 tooltip                                                    | `(node: ICascaderItem) => string`                                                                             | 否       | `node.label` |        |
| renderList        | 自定义渲染选项列表                                                      | `(nodes: ICascaderItem[], renderItem: (node: ICascaderItem, style: CSSProperties) => ReactNode) => ReactNode` | 否       |              |        |

#### ICascaderItem

```ts
interface ICascaderItem {
	value: string | number;
	label: string;
	children?: ICascaderItem[];
	disabled?: boolean;
	loadChildrenOnExpand?: boolean; // 展开下一级时触发加载数据
	loadChildrenOnScroll?: boolean; // 滚动时触发加载数据
}
```

#### Meta 参数

`ICascaderChangeMeta` 和 `ICascaderLoadMeta` 用于区分触发 `onChange` 和 `loadOptions` 的场景，使用时根据不同触发场景坑需要做不同逻辑处理。例如 `loadOptions` 可能是由于展开下一级或者滚动时触发的。

### MenuCascader

| 参数                 | 说明                       | 类型                                                    | 是否必填 | 默认值  | 备选值  |
| -------------------- | -------------------------- | ------------------------------------------------------- | -------- | ------- | ------- |
| multiple             | 是否支持多选               | `boolean`                                               | 否       | `false` | `true`  |
| expandTrigger        | 次级菜单的展开方式         | `string`                                                | 否       | `click` | `hover` |
| scrollable           | 是否支持滚动加载           | `boolean`                                               | 否       | `false` | `true`  |
| loadChildrenOnScroll | 第一级数据是否还有更多数据 | `boolean`                                               | 否       | `false` | `true`  |
| searchable           | 是否显示搜索框             | `boolean`                                               | 否       | `false` | `true`  |
| async                | 是否异步搜索               | `boolean`                                               | 否       | `false` | `true`  |
| asyncFilter          | 根据关键词异步搜索         | `(keyword: string) => Promise<Array<ICascaderItem[]>>`  | 否       | -       |         |
| filter               | 根据关键词进行过滤         | `(keyword: string, path: ICascaderItem[]) => boolean`   | 否       | -       |         |
| highlight            | 根据关键词高亮每一项       | `(keyword: string, path: ICascaderItem[]) => ReactNode` | 否       | -       |         |
| limit                | 搜索结果展示数量           | `number`                                                | 否       | `50`    |         |
| renderTags           | 自定义标签列表整体的展示   | `(props: ICascaderTagsProps) => ReactNode`              | 否       |         |         |

- 当 `multiple` 为 `true` 时，`onChange` 中的 `value` 及 `selectedOptions` 为二维数组
- `renderTags` 仅当多选模式下有效
- 组件参数 `scrollable` 与节点的 `loadChildrenOnScroll` 属性组合可判断它的子节点是否需要滚动加载更多数据；第一个层级由于无父节点，使用 `props` 上的 `loadChildrenOnScroll` 参数

### TabsCascader

| 参数  | 说明                   | 类型          | 是否必填 | 默认值 | 备选值 |
| ----- | ---------------------- | ------------- | -------- | ------ | ------ |
| title | 弹层中每一级的标题文案 | `ReactNode[]` | 否       | `[]`   |        |

### Options 处理函数

`Cascader` 实现了部分常用的操作 `options` 的函数，这些函数没有在 `zent` 里直接导出，如需使用需要从 `zent/es/cascader/public-options-fns` 引入。函数具体说明文档参考各自的文档注释，编辑器有提示。

- `clone(options: ICascaderItem[]): ICascaderItem[]`
- `insertPath(options: ICascaderItem[], path: ICascaderItem[]): ICascaderItem[]`
- `getNode(options: ICascaderItem[], path: ICascaderItem[]): ICascaderItem | null`
- `merge(options: ICascaderItem[], another: ICascaderItem[]): ICascaderItem[]`
