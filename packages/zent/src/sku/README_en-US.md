---
title: SKU
path: component/sku
group: Domain-specific
---

## SKU Selector(DEPRECATED)

Please use `@zent/sku`.

A widget for SKU selection.

### Guides

You can create a editable page with a variety of goods and services


### API

| Property | Description | Type | Default | Alternative |
|------|------|------|--------|--------|
| className | custom extra class name | string | `''` |  |
| value | current chosen sku array | array | `[]` |  |
| maxSize | sku key maximum size | number | `3` |  |
| maxSKUTextLength | sku text value maximum length | number | `4` |  |
| maxLeafTextLength | left text value maximum length | number | `20` |  |
| skuTree | choosable sku array | array | `[]` |  |
| optionValue | custom sku id  | string | `'id'` |  |
| optionText | custom sku text | string | `'text'` |  |
| onFetchGroup | async get choosable sku array, such as "color"、"size" | function | `Promise` |  |
| onFetchSKU | async get one sku value, such as "red"、"blue" | function | `Promise` |  |
| onCreateGroup | create a new sku key, such as "constellation" | function | `Promise` |  |
| onCreateSKU | create a new sku value, such as "virgo"  | function | `Promise` |  |
| onChange | the callback will return current sku value when sku changes | function | `noop` |  |
| prefix | custom prefix | string | 'rc-sku' | null |

#### Utility methods

In order to easily manipulate sku date, sku widget supports some utility methods

#### SKU.flatten(sku, items, options)

Using cartesian product, transform tree value to platten array

| Property | Description | Type | Default | Alternative |
|------|------|------|--------|--------|
| sku | current chosen sku value | array | `[]` |  |
| items | exist array | array | `[]` |  |
| options | optional parameter | object | `{}` | `optionValue: 'id', optionText: 'text'` |
