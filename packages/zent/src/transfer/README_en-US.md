---
title: Transfer
path: component/transfer
group: Data Entry
---

## Transfer

Double column transfer choice box.

### API

| Property          | Description                                                                                                                                                                | Type                                                                 | Default                                | Required |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------- | -------- |
| keyName           | The primary key of `dataSource`                                                                                                                                            | `string`                                                             |                        | Yes      |
| dataSource        | Used for setting the source data. The elements that are part of this array will be present the left column. Except the elements whose keys are included in targetKeys prop | `ITransferData[]`                                                    |                        | Yes      |
| onChange          | A callback function that is executed when the transfer between columns is completed                                                                                        | `({ targetKeys, transferredKeys, direction, selectedKeys }) => void` |                        | Yes      |
| targetKeys        | A set of keys of elements that are listed on the right column                                                                                                              | `string[]`                                                           | `[]`                   | No       |
| selectedKeys      | A set of keys of selected items                                                                                                                                            | `string[]`                                                           | `[]`                   | No       |
| onSelectChange    | A callback function which is executed when a check changes                                                                                                                 | `(selectedKeys: string[]) => void`                                   |                        | No       |
| titles            | A set of titles that are sorted from left to right                                                                                                                         | `[React.ReactNode, React.ReactNode]`                                 | `['Source', 'Target']` | No       |
| showSearch        | If included, a search box is shown on each column                                                                                                                          | `boolean`                                                            | `false`                | No       |
| searchPlaceholder | Search input placeholder                                                                                                                                                   | `string`                                                             | `Please Enter`         | No       |
| filterOption      | A function to determine whether an item should show in search result list                                                                                                  | `(inputValue: string, option: ITransferData) => boolean`             |                        | No       |
| pagination        | List pagination. Not work in render props. PageSize is 10 by default                                                                                                       | `boolean` \| `{ pageSize: number }`                                     |                        | No       |
| disabled          | Whether disabled transfer                                                                                                                                                  | `boolean`                                                            |                 |  No       |
| className         | Extra custom class name                                                                                                                                                    | `string`                                                             | `''`                     | No       |
| list              | Set list props                                                                                                                                                             | `Object ListType` \| `[ListType, ListType]`                          |                        | No       |

#### Render Props

Transfer accept children to customize render list, using follow props:

| Property           | Description             | Type                       |
| ------------------ | ----------------------- | -------------------------- |
| direction          | List render direction   | `left` \| `right`            |
| selectedKeys       | Selected items          | `string[]`                 |
| handleSelectChange | Select a group of items | `(keys: string[]) => void` |

#### list

| Property  | Descripition                                                                | Type                                                                                                       | Required |
| --------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | -------- |
| columns   | Columns                                                                     | `TransferColumnType`                                                                                       | Yes      |
| selection | The configuration for selection(Currently only supports `getCheckboxProps`) | `object { getCheckboxProps: ( data: ITransferData) => { disabled?: boolean; reason?: React.ReactNode }; }` | No       |

The above props are different from `Grid`, `rowKey`、`scroll`、`emptyLabel`、`onRowClick`、`sortBy`、`sortType`、`defaultSortType`、`bordered`、`ellipsis`、`components`、`rowProps`、`autoStick`、`autoStickOffsetTop`、`disableHoverHighlight`、`onChange`、`loading`、`className`、`rowClassName` will be passed down.([View props description](https://youzan.github.io/zent/en/component/grid#api)).

#### columns

| Property | Description                    | Type        | Default | Required |
| -------- | ------------------------------ | ----------- | ------- | -------- |
| name     | Key for the corresponding data | `string`    |         | Yes      |
| title    | Column title                   | `ReactNode` | `''`      | No       |

The above props are different from `Grid`, [View other props descriptions](https://youzan.github.io/zent/en/component/grid#columns).

### useTransfer

Hook for sending left and right data.

#### Params

| Property     | Description                                       | Type       | Default | Required |
| ------------ | ------------------------------------------------- | ---------- | ------- | -------- |
| selectedKeys | Default Selected items                            | `string[]` | `[]`    | No       |
| targetKeys   | Default items that are listed on the right column | `string[]` | `[]`    | No       |
| disabledKeys | disabled items                                    | `string[]` | `[]`    | No       |

#### Result

| Property           | Description                                                   | Type                                                     |
| ------------------ | ------------------------------------------------------------- | -------------------------------------------------------- |
| selectedKeys       | A set of keys of selected items                               | `string[]`                                               |
| targetKeys         | A set of keys of elements that are listed on the right column | `string[]`                                               |
| transferKeys       | A function that transfer selected items on the left or right  | `(direction: Direction) => void`                         |
| changeSelectedKeys | A function that set selected items on the left or right       | `(direction: Direction, selectedKeys: string[]) => void` |
| resetSelectedKeys  | A function that reset selected items                          | `(keys: string[]) => void`                               |
| resetTargetKeys    | A function that reset targetKeys                              | `(keys: string[]) => void`                               |
