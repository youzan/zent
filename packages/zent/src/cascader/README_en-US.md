---
title: Cascader
path: component/cascader
group: Data Entry
---

## Cascader

Cascader is used for cascade operation, e.g. cascade location selection.

### API

`Cascader` contains `MenuCascader` and `TabsCascader`, most of their APIS are shared.

### Shared APIS

| Props        | Description                            | Type                   | Required   | Default                 | Alternatives |
| ------------ | -------------------------------------- | ---------------------- | --------  | -------------------- -- | -------- |
| value        | Selected value                         | `CascaderValue[]`     |    no     | `[]`                      |         |
| options      | Optional data source                   | `ICascaderItem[]`     |    yes     | `[]`                      |         |
| onChange     | Callback when data changes             | `func`                |    no     |  `(value: CascaderValue[], selectedOptions: ICascaderItem[], meta: ICascaderChangeMeta) => void`          |         |
| loadOptions  | Function to load data dynamicly, must return a Promise         | `func`                 |    no     | `(selectedOptions: ICascaderItem[], meta: ICascaderLoadMeta) => Promise<options>`        |         |
| changeOnSelect  | Trigger onChange on each selection        | `bool`                |    no     |  `false`                  | `true`   |
| placeholder  |  Placeholder text of input box               | `string`              |    no     |  `Please choose`          |         |
| className    |  Custom classname                      | `string`              |    no     |                           |         |
| popupClassName  | Custom classname of popover         | `string`               |    no     |  `zent-cascader__popup`  |         |
| renderValue   | Render option value                    | `func`                 |    no     |  `selectedOptions: ICascaderItem[] =>  selectedOptions.map(option => option.label).join(' / ')`                    |         |
| disabled     |  Disable cascader                       | `bool`                 |    no     |  `false`                 | `true`  |
| clearable    |  Show clear button                      | `bool`                 |    no     |  `false`                 | `true`        |


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

| Props        | Description                            | Type                   | Required   | Default                | Alternatives |
| ------------ | -------------------------------------- | ---------------------- | --------  | -------------------- -- | -------- |
| multiple     | Multiple                              | `bool`                 |    no     | `false`                 | `true`   |
| expandTrigger | Secondary menu expand trigger type    | `string`               |    no     | `click`                 |  `hover`  |
| scrollable    | Can scroll load data dynamicly        | `bool`                 |    no     | `false`                 |  `true`   |
| searchable    | Can search                            | `bool`                |    no     | `false`                 |  `true`   |
| async         | Can async search                      | `bool`                |    no     | `false`                 | `true`    |
| filter        | Filter options by keyword             | `func`                |    no     | `(keyword: string, options: ICascaderItem[]) => ReactNode`      |         |
| limit         | Limit search result count             | `number`              |    no     | `50`                    |         |


- When `multiple` is `true`，onChange params such as value  and selectedOptions are double dimensional array
- Use `scrollable` and Option `hasMore` property can judge node scroll loadable

### TabsCascader

| Props        | Description                            | Type                   | Required   | Default                | Alternatives |
| ------------ | -------------------------------------- | ---------------------- | --------  | -------------------- -- | -------- |
| title        | Title of tab                           | `ReactNode[]`          |    no     |  `[]`                   |          |
