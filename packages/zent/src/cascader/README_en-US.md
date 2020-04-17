---
title: Cascader
path: component/cascader
group: Data Entry
---

## Cascader

Cascader is used for cascade operation, e.g. cascade location selection.

### API

`Cascader` contains `MenuCascader` and `TabsCascader`, most of their apis are shared.

### shared apis

| Props | Description | Type | Default | Alternatives |
|------|------|------|--------|--------|
| value | The selected value | `array` | [] | '' |
| options | Optional data source | `array` | [] | '' |
| onChange | The callback when data changes | `(value, selectedOptions, meta) => void` | - | '' |
| loadOptions | Function to load data dynamicly, must return Promise | `(selectedOptions, meta) => Promise<options>` | - | '' |
| changeOnSelect | Wether trigger change once sth. is seleted | boolean | `false` | `true` |
| placeholder | The placeholder text of input box | string | Please choose | '' |
| className | Custom classname | string | '' | '' |
| popupClassName | Custom classname of popover | string | ''zent-cascader__popup'' | '' |
| displayRender | Function to customize the display text | `selectedOptions =>  selectedOptions.map(option => option.label).join(' / ')` | '' |
| disabled |  Whether disabled select | boolean | `false` | `true` |
| clearable | Whether show clear | boolean | `false` | `true` |


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

| Props | Description | Type | Default | Alternatives |
|------|------|------|--------|--------|
| multiple | Whether multiple | boolean | `false` | `true` |
| expandTrigger | Secondary menu expand trigger type | string | `click` | `hover` |
| scrollable | Whether can scroll load data dynamicly  | boolean | `false` | `true` |
| searchable | Whether can search | boolean | `false` | `true` |
| async | Whether can async search | boolean | `false` | `true` |
| filter | Filter options by keyword | `(keyword, options: Option[]) => ReactNode` |  | '' |
| limit | Limit search result count | `number | false` | `50` | '' |

- When `multiple` is `true`，onChange params such as value  and selectedOptions are double dimensional array
- Use `hasMore` and `scrollable` can judge node scroll loadable

### TabsCascader

| Props | Description | Type | Default | Alternatives |
|------|------|------|--------|--------|
| title | Title of tab, tab title default is `'Title'` | `ReactNode[]` | [] | '' |
