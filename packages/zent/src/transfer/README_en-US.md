---
title: Transfer
subtitle: Transfer
path: component/transfer
group: Data Entry
---

## Transfer

Double column transfer choice box.

### Guides

Transfer list is implemented using the `Grid` component, and the partial prop of the `Grid` component will be passed down (See the `grid` property for details).

### API

| Property          | Description                                                                                                                                                                | Type                                                     | Default                | Alternative | Required |
|-------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------|------------------------|-------------|----------|
| keyName           | The primary key of `dataSource`                                                                                                                                            | `string`                                                 |                        |             | Yes      |
| dataSource        | Used for setting the source data. The elements that are part of this array will be present the left column. Except the elements whose keys are included in targetKeys prop | `ITransferData[]`                                        |                        |             | Yes      |
| onChange          | A callback function that is executed when the transfer between columns is completed                                                                                        | `(params: ITransferDirectionChangeProps) => void`        |                        |             | Yes      |
| targetKeys        | A set of keys of elements that are listed on the right column                                                                                                              | `string[]`                                               | `[]`                   |             | No       |
| selectedKeys      | A set of keys of selected items                                                                                                                                            | `string[]`                                               | `[]`                   |             | No       |
| onSelectChange    | A callback function which is executed when a check changes                                                                                                                 | `(selectedKeys: string[]) => void`                       |                        |             |    No      |
| titles            | A set of titles that are sorted from left to right                                                                                                                         | `React.ReactNode[]`                                      | `['Source', 'Target']` |             |     No     |
| showSearch        | If included, a search box is shown on each column                                                                                                                          | `boolean`                                                | `false`                | `true`      | No       |
| searchPlaceholder | Search input placeholder                                                                                                                                                   | `string`                                                 | `Please Enter`         |             | No       |
| filterOption      | A function to determine whether an item should show in search result list                                                                                                  | `(inputValue: string, option: ITransferData) => boolean` |                        |             | No       |
| className         | Extra custom class name                                                                                                                                                    | `string`                                                 | ''                     |             | No       |
| grid              | Set grid props                                                                                                                                                             | `Object GridType`                                        |                        |             | No       |


#### Render Props

Transfer accept children to customize render list, using follow props:

| Property           | Description             | Type                       |
|--------------------|-------------------------|----------------------------|
| direction          | List render direction   | `left \| right`            |
| selectedKeys       | Selected items          | `string[]`                 |
| handleSelectChange | Select a group of items | `(keys: string[]) => void` |

#### grid

| Property              | Descripition                                                                                               | Type                                                                                                       | Default                     | Required |
|-----------------------|------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|-----------------------------|----------|
| columns               | Columns                                                                                                    | `TransferColumnType | [TransferColumnType, TransferColumnType]`                                            |                             | Yes      |
| selection             | The configuration for selection(Currently only supports `getCheckboxProps`)                                | `object { getCheckboxProps: ( data: ITransferData) => { disabled?: boolean; reason?: React.ReactNode }; }` |                             | No       |
| rowKey                | Key for each row                                                                                           | `string`                                                                                                   | Take the value of `keyName` | No       |
| onChange              | Callback fires when columns change, filtering and sorting included                                         | `(conf: any) => any`                                                                                       | `noop`                      | No       |
| scroll                | Can be scrolled in x/y direction, x or y can be a number that indicates the width and height of table body | `{ x?: number, y?: number }`                                                                               |                             | No       |
| sortBy                | The field which rows are sorted accoring to, should be one of keys for columns                             | `string`                                                                                                   | ''                          | No       |
| sortType              | The way to sort                                                                                            | `string`                                                                                                   | ''                          | No       |
| defaultSortType       | The way to sort when first click                                                                           | `string`                                                                                                   | `'desc'`                    | No       |
| emptyLabel            | Text to be displayed when there's no data                                                                  | `string`                                                                                                   | `'No data'`                 | No       |
| bordered              | Whether to display the outer border and column border                                                      | `bool`                                                                                                     | `false`                     | No       |
| onRowClick            | Callback fires when a row is clicked                                                                       | `(data: any, index: number, event: Event) => any`                                                          |                             | No       |
| ellipsis              | Whether ellipsis should be displayed when content overflows (nowrap of columns needs to be set)            | `bool`                                                                                                     | `false`                     | No       |
| components            | Custom table element                                                                                       | `object { row?: ComponentType }`                                                                           |                             | No       |
| rowProps              | Custom row props                                                                                           | `(data: any, index: number) => object`                                                                     |                             | No       |
| autoStick             | Whether to stick the head to the window automatically                                                      | `bool`                                                                                                     | `false`                     | No       |
| autoStickOffsetTop    | Custom offset of sticky head                                                                               | `number`                                                                                                   | `0`                         | No       |
| disableHoverHighlight | Whether to disable mouse hover highlighting                                                                | `bool`                                                                                                     | `false`                     | No       |

#### columns

| Property    | Description                                                                                     | Type                                                                                                                   | Default | Required |
|-------------|-------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------|---------|----------|
| name        | Key for the corresponding data                                                                  | `string`                                                                                                               |         | Yes      |
| title       | Column title                                                                                    | `ReactNode`                                                                                                            | ''      | No       |
| width       | Column width                                                                                    | `string \| number`                                                                                                     |         | No       |
| bodyRender  | Render complex component                                                                        | `((data: any, pos: {row: number, column: number, fixed?: 'left' \| 'right'}, name: string) => ReactNode) \| ReactNode` |         | No       |
| className   | Class name of the column title                                                                  | `string`                                                                                                               |         | No       |
| needSort    | Whether to support sorting                                                                      | `bool`                                                                                                                 |         | No       |
| colSpan     | Span of columns. It won't be rendered if the value is set to 0                                  | `number`                                                                                                               |         | No       |
| fixed       | Whether columns fixed or not. The value can be `left` `right` `true` (`true` is same to `left`) | `bool \| string`                                                                                                       |         | No       |
| onCellClick | Callback fires when a cell is clicked                                                           | `(data: any, event: Event) => any`                                                                                     |         | No       |
| textAlign   | Text alignment                                                                                  | `string`                                                                                                               |         | No       |
| nowrap      | Whether to wrap, true by default                                                                | `bool`                                                                                                                 |         | No       |
| defaultText | Default display text                                                                            | `ReactNode`                                                                                                            |         | No       |
| children    | Render grouping table headers                                                                   | `array`                                                                                                                |         | No       |

### useTransfer
Hook for sending left and right data.

#### Params

| Property           | Description                  | Type         | Default  | Required |
|--------------|---------------------|------------|------|------|---|
| selectedKeys | Default Selected items | `string[]` | `[]` | No    |
| targetKeys   | Default items that are listed on the right column    | `string[]` | `[]` | No    |

#### Result

| Property             | Description                  | Type                                                       |
|----------------|---------------------|----------------------------------------------------------|
| selectedKeys   | A set of keys of selected items | `string[]`                                               |
| targetKeys     | A set of keys of elements that are listed on the right column    | `string[]`                                               |
| onChange       | A callback function that is executed when the transfer between columns is completed     | `(direction: Direction) => void`                         |
| onSelectChange | A callback function which is executed when a check changes       | `(direction: Direction, selectedKeys: string[]) => void` |
