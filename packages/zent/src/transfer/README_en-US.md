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

| Property          | Description                                                                                                                                                                | Type                                                             | Default                | Alternative |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------- | ----------- |
| keyName            | key for each row                                                                                                                                                           | string                                                           |                        |             |
| targetKeys        | A set of keys of elements that are listed on the right column                                                                                                              | string\[\]                                                       | \[\]                   |             |
| dataSource          | Used for setting the source data. The elements that are part of this array will be present the left column. Except the elements whose keys are included in targetKeys prop | ITransferData\[\]                                                |                        |             |
| showSearch        | If included, a search box is shown on each column                                                                                                                          | boolean                                                          | false                  | true        |
| filterOption      | A function to determine whether an item should show in search result list                                                                                                  | \(inputValue: string, option: ITransferData\) => boolean;        |                        |             |
| selectedRowKeys   | A set of keys of selected items                                                                                                                                            | string\[\]                                                       | \[\]                   |             |
| titles            | A set of titles that are sorted from left to right                                                                                                                         | React\.ReactNode\[\]                                             | \['Source', 'Target'\] |             |
| onChange    | A callback function that is executed when the transfer between columns is complete                                                                                         | \(params: ITransferDirectionChangeProps\) => void;               |                        |             |
| columns           | columns                                                                                                                                                                    | TransferColumnType \| \[TransferColumnType, TransferColumnType\] |                        |             |
| prefix            | custom prefix                                                                                                                                                              | string                                                           | zent                   |             |
| searchPlaceholder | search input placeholder                                                                                                                                                   | string                                                           | Please Enter           |             |
| className         | extra custom class name                                                                                                                                                    | string                                                           | ''                     |             |

#### Render Props

Transfer accept children to customize render list, using follow props:

| Property              | Description             | Type                      | Default | Alternative |
| --------------------- | ----------------------- | ------------------------- | ------- | ----------- |
| direction             | List render direction   | left \| right             |         |             |  |
| dataSource              | source data             | ITransferData\[\]         |         |             |
| selectedRowKeys       | Selected items          | string\[\]                |         |             |
| changeSelectedRowKeys | Select a group of items | (keys: string[]) => void; |         |             |
