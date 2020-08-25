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

| 参数         | 说明                                    | 类型                    | 是否必填   | 默认值                   | 备选值 |
| ------------ | -------------------------------------- | ---------------------- | --------  | -------------------- -- | -------- |
| value        | 级联的选中值                             | `CascaderValue[]`     |    否     | `[]`                      |         |
| options      | 可选项数据源                             | `ICascaderItem[]`     |    是     | `[]`                      |         |
| onChange     | 选择完成后的回调                          | `func`                |    否     |  `(value: CascaderValue[], selectedOptions: ICascaderItem[], meta: ICascaderChangeMeta) => void`          |         |
| loadOptions  | 动态加载级联的数据                        | `func`                 |    否     | `(selectedOptions: ICascaderItem[], meta: ICascaderLoadMeta) => Promise<options>`        |         |
| changeOnSelect  | 是否选择即时触发改变                    | `bool`                |    否     |  `false`                  | `true`   |
| placeholder  |  输入框占位文本                           | `string`              |    否     |  `请选择`                  |         |
| className    |  自定义额外类名                           | `string`              |    否     |                           |         |
| popupClassName  | popover 自定义类名                    | `string`               |    否     |  `zent-cascader__popup`  |         |
| renderValue   | 渲染输入框中选项值                    | `func`                    |    否     |  `selectedOptions: ICascaderItem[] =>  selectedOptions.map(option => option.label).join(' / ')`                    |         |
| disabled     |  是否禁用                                | `bool`                 |    否     |  `false`                 | `true`  |
| clearable    |  显示清除按钮                             | `bool`                 |    否     |  `false`                 | `true`        |


#### ICascaderItem

```ts
interface ICascaderItem {
  value: string | number;
  label: string;
  children?: Option[];
  disabled?: boolean;
  isLeaf?: boolean;
  hasMore?: boolean;
}
```

#### ICascaderChangeMeta
```ts
interface ICascaderChangeMeta {
  action: CascaderChangeAction;
}
```

#### ICascaderLoadMeta
```ts
interface ICascaderLoadMeta {
  action: CascaderLoadAction;
  keyword?: string;
}
```


### MenuCascader

| 参数         | 说明                                    | 类型                    | 是否必填   | 默认值                   | 备选值    |
| ------------ | -------------------------------------- | ---------------------- | --------  | -------------------- -- | -------- |
| multiple     | 是否支持多选                             | `bool`                 |    否     | `false`                 | `true`   |
| expandTrigger | 次级菜单的展开方式                       | `string`               |    否     | `click`                 |  `hover`  |
| scrollable    | 是否支持滚动加载                         | `bool`                 |    否     | `false`                 |  `true`   |
| searchable    | 是否显示搜索框                           | `bool`                |    否     | `false`                 |  `true`   |
| async         | 是否异步搜索                             | `bool`                |    否     | `false`                 | `true`    |
| filter        | 根据关键词进行过滤                         | `func`                |    否     | `(keyword: string, items: ICascaderItem[]) => boolean`      |         |
| highlight     | 根据关键词高亮每一项                       | `func`                |    否     | `(keyword: string, items: ICascaderItem[]) => ReactNode`      |         |
| limit         | 搜索结果展示数量                          | `number`              |    否     | `50`                    |         |


- 当 `multiple` 为 `true` 时，`onChange` 中的 `value` 及 `selectedOptions` 为二维数组
- 参数 `scrollable` 与当前节点的 `hasMore` 属性组合可判断它的子节点是否可滚动加载

### TabsCascader

| 参数         | 说明                                    | 类型                    | 是否必填   | 默认值                   | 备选值    |
| ------------ | -------------------------------------- | ---------------------- | --------  | -------------------- -- | -------- |
| title        | 浮层中每一级的标题文案                     | `ReactNode[]`          |    否     |  `[]`                   |          |
