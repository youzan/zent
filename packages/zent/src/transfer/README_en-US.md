---
title: Transfer
subtitle: Transfer
path: component/transfer
group: Data Entry
---

## Transfer

Double column transfer choice box.

### Guides

The shuttle box list is implemented using the `Grid` component and supports all properties of the `Grid` component.

### API

| 参数              | 说明                                                                                                                                                                       | 类型                                                             | 默认值                 | 备选值 |
| ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------- | ------ |
| rowKey            | key for each row                                                                                                                                                           | string                                                           |                        |        |
| targetKeys        | A set of keys of elements that are listed on the right column                                                                                                              | string\[\]                                                       | \[\]                   |        |
| datasets          | Used for setting the source data. The elements that are part of this array will be present the left column. Except the elements whose keys are included in targetKeys prop | ITransferData\[\]                                                |                        |        |
| showSearch        | If included, a search box is shown on each column                                                                                                                          | boolean                                                          | false                  | true   |
| filterOption      | A function to determine whether an item should show in search result list                                                                                                  | \(inputValue: string, option: ITransferData\) => boolean;        |                        |        |
| selectedRowKeys   | A set of keys of selected items                                                                                                                                            | string\[\]                                                       | \[\]                   |        |
| titles            | A set of titles that are sorted from left to right                                                                                                                         | React\.ReactNode\[\]                                             | \['Source', 'Target'\] |        |
| transferChange          | A callback function that is executed when the transfer between columns is complete                                                                                         | \(params: ITransferDirectionChangeProps\) => void;               |                        |        |
| columns           | columns                                                                                                                                                                    | TransferColumnType \| \[TransferColumnType, TransferColumnType\] |                        |        |
| prefix            | custom prefix                                                                                                                                                              | string                                                           | zent                   |        |
| searchPlaceholder | search input placeholder                                                                                                                                                   | string                                                           | Please Enter           |        |
| className         | extra custom class name                                                                                                                                                    | string                                                           | ''                     |        |
