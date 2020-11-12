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

| Props             | Description                                            | Type                                                                                                          | Required | Default         | Alternatives |
| ----------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- | -------- | --------------- | ------------ |
| value             | Selected value                                         | `CascaderValue[]`                                                                                             | No       | `[]`            |              |
| options           | Optional data source                                   | `ICascaderItem[]`                                                                                             | Yes      | `[]`            |              |
| onChange          | Callback when data changes                             | `(value: CascaderValue[], selectedOptions: ICascaderItem[], meta: ICascaderChangeMeta) => void`               | No       | -               |              |
| loadOptions       | Function to load data dynamicly, must return a Promise | `(selectedOptions: ICascaderItem[], meta: ICascaderLoadMeta) => Promise<void>`                                | No       | -               |              |
| changeOnSelect    | Trigger onChange on each selection                     | `boolean`                                                                                                     | No       | `false`         | `true`       |
| placeholder       | Placeholder text of input box                          | `string`                                                                                                      | No       | `Please choose` |              |
| className         | Custom classname                                       | `string`                                                                                                      | No       |                 |              |
| popupClassName    | Custom classname of popover                            | `string`                                                                                                      | No       |                 |              |
| disabled          | Disable cascader                                       | `boolean`                                                                                                     | No       | `false`         | `true`       |
| clearable         | Show clear button                                      | `boolean`                                                                                                     | No       | `false`         | `true`       |
| visible           | Use with `onVisibleChange` to control open/close       | `boolean`                                                                                                     | No       |                 |              |
| onVisibleChange   | Use with `visible`                                     | `(visible: boolean) => void`                                                                                  | No       |
| renderValue       | Render selected option value                           | `(selectedOptions: ICascaderItem[]) => string`                                                                | No       |                 |              |
| renderItemContent | Customize rendering of item content                    | `(node: ICascaderItem) => ReactNode`                                                                          | No       | `node.label`    |              |
| getItemTooltip    | Customize item tooltip                                 | `(node: ICascaderItem) => string`                                                                             | No       | `node.label`    |              |
| renderList        | Customize rendering of item list                       | `(nodes: ICascaderItem[], renderItem: (node: ICascaderItem, style: CSSProperties) => ReactNode) => ReactNode` | No       |                 |              |

#### ICascaderItem

```ts
interface ICascaderItem {
	value: string | number;
	label: string;
	children?: ICascaderItem[];
	disabled?: boolean;
	loadChildrenOnExpand?: boolean; // Load children when expanding next level
	loadChildrenOnScroll?: boolean; // Load children when scrolling beyound bottom
}
```

#### Meta object

`onChange` and `loadOptions` has a `meta` parameter, you can use it to distinguish between different actions that trigger `onChange` or `loadOptions`.

### MenuCascader

| Props                | Description                                 | Type                                                    | Required | Default | Alternatives |
| -------------------- | ------------------------------------------- | ------------------------------------------------------- | -------- | ------- | ------------ |
| multiple             | Multiple                                    | `boolean`                                               | No       | `false` | `true`       |
| expandTrigger        | Secondary menu expand trigger type          | `string`                                                | No       | `click` | `hover`      |
| scrollable           | Can scroll load data dynamicly              | `boolean`                                               | No       | `false` | `true`       |
| loadChildrenOnScroll | Load children when scrolling in first level | `boolean`                                               | No       | `false` | `true`       |
| searchable           | Can search                                  | `boolean`                                               | No       | `false` | `true`       |
| async                | Can async search                            | `boolean`                                               | No       | `false` | `true`       |
| asyncFilter          | Async filter by keyword                     | `(keyword: string) => Promise<Array<ICascaderItem[]>>`  | No       | -       |              |
| filter               | Filter options by keyword                   | `(keyword: string, path: ICascaderItem[]) => boolean`   | No       | -       |              |
| highlight            | Highlight options by keyword                | `(keyword: string, path: ICascaderItem[]) => ReactNode` | No       | -       |              |
| limit                | Limit search result count                   | `number`                                                | No       | `50`    |              |
| renderTags           | Render tag list                             | `(props: ICascaderTagsProps) => ReactNode`              | No       |         |              |

- When `multiple` is `true`，`onChange` parameters such as `value` and `selectedOptions` are two dimensional arrays
- `renderTags` is only available in multi select mode
- Use `scrollable` and `loadChildrenOnScroll` to control auto loading data when scrolling to bottom

### TabsCascader

| Props | Description   | Type          | Required | Default | Alternatives |
| ----- | ------------- | ------------- | -------- | ------- | ------------ |
| title | Title of tabs | `ReactNode[]` | No       | `[]`    |              |

### Options manipulate functions

`Cascader` implements a few functions for manipulating `options`, these functions are not exported directly from `zent`, you need to manually import them from `zent/es/cascader/public-options-fns`. Check doc comments for detailed explaination for each function.

- `clone(options: ICascaderItem[]): ICascaderItem[]`
- `insertPath(options: ICascaderItem[], path: ICascaderItem[]): ICascaderItem[]`
- `getNode(options: ICascaderItem[], path: ICascaderItem[]): ICascaderItem | null`
- `merge(options: ICascaderItem[], another: ICascaderItem[]): ICascaderItem[]`
