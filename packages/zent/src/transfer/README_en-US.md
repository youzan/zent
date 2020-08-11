---
title: Transfer
subtitle: Transfer
path: component/transfer
group: Data Entry
---

## Transfer

Double column transfer choice box.

### Guides

### API

| Property          | Description                                                                                                                                                                | Type                                                                 | Default                | Alternative | Required |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------- | ----------- | -------- |
| keyName           | The primary key of `dataSource`                                                                                                                                            | `string`                                                             |                        |             | Yes      |
| dataSource        | Used for setting the source data. The elements that are part of this array will be present the left column. Except the elements whose keys are included in targetKeys prop | `ITransferData[]`                                                    |                        |             | Yes      |
| onChange          | A callback function that is executed when the transfer between columns is completed                                                                                        | `({ targetKeys, transferredKeys, direction, selectedKeys }) => void` |                        |             | Yes      |
| targetKeys        | A set of keys of elements that are listed on the right column                                                                                                              | `string[]`                                                           | `[]`                   |             | No       |
| selectedKeys      | A set of keys of selected items                                                                                                                                            | `string[]`                                                           | `[]`                   |             | No       |
| onSelectChange    | A callback function which is executed when a check changes                                                                                                                 | `(selectedKeys: string[]) => void`                                   |                        |             | No       |
| titles            | A set of titles that are sorted from left to right                                                                                                                         | `React.ReactNode[]`                                                  | `['Source', 'Target']` |             | No       |
| showSearch        | If included, a search box is shown on each column                                                                                                                          | `boolean`                                                            | `false`                | `true`      | No       |
| searchPlaceholder | Search input placeholder                                                                                                                                                   | `string`                                                             | `Please Enter`         |             | No       |
| filterOption      | A function to determine whether an item should show in search result list                                                                                                  | `(inputValue: string, option: ITransferData) => boolean`             |                        |             | No       |
| pagination        | List pagination. Not work in render props. PageSize is 10 by default                                                                                                       | `boolean | { pageSize: number }`                                     | false                  |             | No       |
| className         | Extra custom class name                                                                                                                                                    | `string`                                                             | ''                     |             | No       |
| list              | Set list props                                                                                                                                                             | `Object ListType`                                                    |                        |             | No       |

#### Render Props

Transfer accept children to customize render list, using follow props:

| Property           | Description             | Type                       |
| ------------------ | ----------------------- | -------------------------- |
| direction          | List render direction   | `left \| right`            |
| selectedKeys       | Selected items          | `string[]`                 |
| handleSelectChange | Select a group of items | `(keys: string[]) => void` |

#### list

| Property   | Descripition                                                                                               | Type                                                                                                       | Default                     | Required |
| ---------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | --------------------------- | -------- |
| columns    | Columns                                                                                                    | `TransferColumnType | [TransferColumnType, TransferColumnType]`                                            |                             | Yes      |
| selection  | The configuration for selection(Currently only supports `getCheckboxProps`)                                | `object { getCheckboxProps: ( data: ITransferData) => { disabled?: boolean; reason?: React.ReactNode }; }` |                             | No       |
| rowKey     | Key for each row                                                                                           | `string`                                                                                                   | Take the value of `keyName` | No       |
| scroll     | Can be scrolled in x/y direction, x or y can be a number that indicates the width and height of table body | `{ x?: number, y?: number }`                                                                               | { y: 240 }                  | No       |
| emptyLabel | Text to be displayed when there's no data                                                                  | `string`                                                                                                   | `'No data'`                 | No       |

The above props are different from `Grid`, `onChange`, `sortBy`, `sortType`, `defaultSortType`, `bordered`, `onRowClick`, `ellipsis`, `components`, `rowProps`, `autoStick`, `autoStickOffsetTop`, `disableHoverHighlight` will be passed down.([View props description](https://youzan.github.io/zent/en/component/grid#api)).

#### columns

| Property | Description                    | Type        | Default | Required |
| -------- | ------------------------------ | ----------- | ------- | -------- |
| name     | Key for the corresponding data | `string`    |         | Yes      |
| title    | Column title                   | `ReactNode` | ''      | No       |

The above props are different from `Grid`, [View other props descriptions](https://youzan.github.io/zent/en/component/grid#columns).

### useTransfer

Hook for sending left and right data.

#### Params

| Property     | Description                                       | Type       | Default | Required |
| ------------ | ------------------------------------------------- | ---------- | ------- | -------- |
| selectedKeys | Default Selected items                            | `string[]` | `[]`    | No       |
| targetKeys   | Default items that are listed on the right column | `string[]` | `[]`    | No       |

#### Result

| Property       | Description                                                                         | Type                                                     |
| -------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------- |
| selectedKeys   | A set of keys of selected items                                                     | `string[]`                                               |
| targetKeys     | A set of keys of elements that are listed on the right column                       | `string[]`                                               |
| onChange       | A callback function that is executed when the transfer between columns is completed | `(direction: Direction) => void`                         |
| onSelectChange | A callback function which is executed when a check changes                          | `(direction: Direction, selectedKeys: string[]) => void` |
