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
| value        | Selected value                         | `CascaderValue[]`     |    No     | `[]`                      |         |
| options      | Optional data source                   | `ICascaderItem[]`     |    Yes     | `[]`                      |         |
| onChange     | Callback when data changes             | `(value: CascaderValue[], selectedOptions: ICascaderItem[], meta: ICascaderChangeMeta) => void`                |    No     |     -          |         |
| loadOptions  | Function to load data dynamicly, must return a Promise         |  `(selectedOptions: ICascaderItem[], meta: ICascaderLoadMeta) => Promise<void | boolean>`                |    No     |     -    |         |
| changeOnSelect  | Trigger onChange on each selection        | `bool`                |    No     |  `false`                  | `true`   |
| placeholder  |  Placeholder text of input box               | `string`              |    No     |  `Please choose`          |         |
| className    |  Custom classname                      | `string`              |    No     |                           |         |
| popupClassName  | Custom classname of popover         | `string`               |    No     |  `zent-cascader__popup`  |         |
| renderValue   | Render option value                    | `(selectedOptions: ICascaderItem[]) =>  string`                |    No     |    `selectedOptions =>  selectedOptions.map(option => option.label).join(' / ')`   |         |
| disabled     |  Disable cascader                       | `bool`                 |    No     |  `false`                 | `true`  |
| clearable    |  Show clear button                      | `bool`                 |    No     |  `false`                 | `true`        |


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
}
```

### MenuCascader

| Props        | Description                            | Type                   | Required   | Default                | Alternatives |
| ------------ | -------------------------------------- | ---------------------- | --------  | -------------------- -- | -------- |
| multiple     | Multiple                              | `bool`                 |    No     | `false`                 | `true`   |
| expandTrigger | Secondary menu expand trigger type    | `string`               |    No     | `click`                 |  `hover`  |
| scrollable    | Can scroll load data dynamicly        | `bool`                 |    No     | `false`                 |  `true`   |
| searchable    | Can search                            | `bool`                |    No     | `false`                 |  `true`   |
| async         | Can async search                      | `bool`                |    No     | `false`                 | `true`    |
| asyncFilter   | Async filter by keyword               | `(keyword: string) => Promise<Array<ICascaderItem[]>>`                        |    No     |    -      |         |
| filter        | Filter options by keyword             | `(keyword: string, items: ICascaderItem[]) => boolean`                |    No     |   -    |         |
| highlight     | Highlight options by keyword          | `(keyword: string, items: ICascaderItem[]) => ReactNode`              |    No     |   -      |         |
| limit         | Limit search result count             | `number`              |    No     | `50`                    |         |


- When `multiple` is `true`，onChange params such as value  and selectedOptions are double dimensional array
- Use `scrollable` and Option `hasMore` property can judge node scroll loadable

### TabsCascader

| Props        | Description                            | Type                   | Required   | Default                | Alternatives |
| ------------ | -------------------------------------- | ---------------------- | --------  | -------------------- -- | -------- |
| title        | Title of tab                           | `ReactNode[]`          |    No     |  `[]`                   |          |
