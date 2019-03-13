---
title: SKU
subtitle: 规格选择器
path: component/sku
group: 业务组件
---

## SKU 规格选择器(已废弃)

请使用 `@zent/sku` 这个包。

这是一个规格选择组件。

### 使用场景

创建有多种规格的商品、服务的编辑页面


### API

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| className | 自定义额外类名 | string | `''` |  |
| value | 当前选中的sku列表 | array | `[]` |  |
| maxSize | 最大规格名称数 | number | `3` |  |
| maxSKUTextLength | 规格名称文字最大长度 | number | `4` |  |
| maxLeafTextLength | 规格值文字最大长度 | number | `20` |  |
| skuTree | 可选的规格列表 | array | `[]` |  |
| optionValue | 自定义sku的id的key值 | string | `'id'` |  |
| optionText | 自定义sku的文案的key值 | string | `'text'` |  |
| onFetchGroup | 异步获取可选的规格列表，如“颜色”、“尺寸” | function | `Promise` |  |
| onFetchSKU | 异步获取单个规格可选的值，如“红色”、“蓝色” | function | `Promise` |  |
| onCreateGroup | 创建新的规格名，如“星座” | function | `Promise` |  |
| onCreateSKU | 创建新的规格值，如“处女座” | function | `Promise` |  |
| onChange | 当sku发生改变时的回调，返回值为sku当前value | function | `noop` |  |
| prefix | 自定义前缀 | string | 'rc-sku' | null |

#### 工具方法

为了更方便操作规格数据，SKU组件提供了一些工具方法

#### SKU.flatten(sku, items, options)

通过计算笛卡尔积，将树形的value变成扁平的数组

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
|------|------|------|--------|--------|
| sku | 当前选中规格的value | array | `[]` |  |
| items | 当前已存在的数据 | array | `[]` |  |
| options | 可配置参数 | object | `{}` | `optionValue: 'id', optionText: 'text'` |
