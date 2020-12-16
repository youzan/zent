---
title: Select
subtitle: 下拉选择
path: component/select
group: 数据
---

## Select 下拉选择

下拉选择，提供多种选择器功能。

### API

| 参数                | 说明                                                               | 类型                                              | 默认值                      | 是否必填 |
| ------------------- | ------------------------------------------------------------------ | ------------------------------------------------- | --------------------------- | -------- |
| options             | 选项数据                                                           | array                                             | `[]`                        | 是       |
| value               | 选中的值，当为 tags 类型时，可以传入数组                           | any                                               | `null`                      | 否       |
| disabled            | 禁用组件                                                           | bool                                              | `false`                     | 否       |
| placeholder         | 默认提示文案                                                       | string                                            | `'请选择'`                  | 否       |
| notFoundContent     | 空列表提示文案                                                     | string                                            | `'没有找到匹配项'`          | 否       |
| onChange            | 选择变更后的回调函数                                               | function                                          | `noop`                      | 否       |
| filter              | 过滤条件，设置以后才会开启过滤功能                                 | function                                          | `noop`                      | 否       |
| highlight           | 对搜索结果进行高亮                                                 | function                                          | `noop`                      | 否       |
| className           | 可选，自定义 trigger 额外类名                                      | string                                            | `''`                        | 否       |
| width               | 输入框宽度                                                         | string or number                                  | `''`                        | 否       |
| popupWidth          | 弹层宽度                                                           | string or number                                  | `''`                        | 否       |
| multiple            | 是否多选                                                           | bool                                              | `false`                     | 否       |
| collapsable         | 多选时是否折叠进行单行显示                                         | bool                                              | `false`                     | 否       |
| hideCollapsePop     | 多选折叠模式下隐藏展示数据的气泡                                   | bool                                              | `false`                     | 否       |
| collapseAt          | 多选折叠模式下显示的数据                                           | number                                            | `1`                         | 否       |
| clearable           | 显示清除按钮                                                       | bool                                              | `false`                     | 否       |
| loading             | 是否加载中                                                         | bool                                              | `false`                     | 否       |
| creatable           | 允许创建不存在的项                                                 | bool                                              | `false`                     | 否       |
| onCreate            | 创建新选项的回调函数                                               | `(keyword: string) => Promise<void>`              |                             | 否       |
| isValidNewOption    | 基于当前的输入判断是否显示点击新建，默认不区分大小写进行文字全匹配 | `(keyword: string, options: Item) => boolean`     |                             | 否       |
| keyword             | 搜索的关键词                                                       | string                                            | `''`                        | 否       |
| onKeywordChange     | 搜索关键词变更后的回调函数                                         | function                                          | `noop`                      | 否       |
| isEqual             | 比较两个选项是否相等                                               | `(a: Item, b: Item) => boolean`                   | `(a, b) => a.key === b.key` | 否       |
| inline              | 是否行内展示                                                       | bool                                              | `false`                     | 否       |
| open                | 是否展示浮层                                                       | bool                                              | `false`                     | 否       |
| onOpenChange        | 打开状态变更后的回调函数                                           | function                                          | `noop`                      | 否       |
| renderValue         | 渲染输入框中选项值                                                 | `(item: Item) => ReactNode`                       |                             | 否       |
| renderTagList       | 仅在多选模式可用；渲染输入框中已选择的选项列表                     | `(props: ISelectTagListProps) => React.ReactNode` |                             | 否       |
| renderOptionList    | 渲染选项列表                                                       | `(options: Items[], renderOption) => ReactNode`   |                             | 否       |
| renderOptionContent | 渲染浮层中的每一项                                                 | `(option: Item) => ReactNode``                    |                             | 否       |
| disableSearch       | 关闭搜索功能                                                       | boolean                                           | `false`                     | 否       |

### `Select.reviveValue`

`reviveValue` 仅可用于受控模式下，一般是表单内数据需要从服务器回填并且选项列表是动态从服务器加载的场景。接受 3 种类型的参数：

- 函数：`(item: ISelectItem) => ISelectItem | null` 返回非 `null` 值将使用该值替换原来的值
- 对象：`{ key: K; [k: string]: unknown; }` 按对象字面值做全等比较，使用选项数组中第一个匹配的值替换原来的值
- 其他（数字/字符串）：等价于 `{ key: K }` 的对象形式
