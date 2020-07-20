---
title: Transfer
subtitle: 穿梭框
path: component/transfer
group: 数据
---

## Transfer

双栏穿梭选择框。

### 使用指南

穿梭框列表使用`Grid`组件实现，支持`Grid`组件所有属性。

### API

| 参数              | 说明                                                                                                      | 类型                                                             | 默认值                 | 备选值 |
| ----------------- | --------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ---------------------- | ------ |
| rowKey            | 指定数据列的主键                                                                                          | string                                                           |                        |        |
| targetKeys        | 显示在右侧框数据的 key 集合                                                                               | string\[\]                                                       | \[\]                   |        |
| datasets          | 数据源，其中的数据将会被渲染到左边一栏中，targetKeys 中指定的除外。                                       | ITransferData\[\]                                                |                        |        |
| showSearch        | 是否显示搜索框                                                                                            | boolean                                                          | false                  | true   |
| filterOption      | 搜索筛选方法，接收 inputValue、option 两个参数，当 option 符合筛选条件时，应返回 true，反之则返回 false。 | \(inputValue: string, option: ITransferData\) => boolean;        |                        |        |
| selectedRowKeys   | 设置哪些项应该被选中，会和勾选的项合并                                                                    | string\[\]                                                       | \[\]                   |        |
| titles            | 标题集合，顺序从左至右                                                                                    | React\.ReactNode\[\]                                             | \['Source', 'Target'\] |        |
| transferChange          | 选项在两栏之间转移时的回调函数                                                                            | \(params: ITransferDirectionChangeProps\) => void;               |                        |        |
| columns           | 表格列配置                                                                                                | TransferColumnType \| \[TransferColumnType, TransferColumnType\] |                        |        |
| prefix            | 自定义前缀                                                                                                | string                                                           | zent                   |        |
| searchPlaceholder | 搜索框文案                                                                                                | string                                                           | 请输入搜索内容         |        |
| className         | 自定义额外类名                                                                                            | string                                                           | ''                     |        |
