---
title: Sweetalert
subtitle: 快捷对话框
path: component/sweetalert
group: 反馈
---

## Sweetalert 快捷对话框

快速唤起 Dialog 组件

### 使用指南

-  组件不提供个性化选项，如有需要请使用 Dialog 组件。

### API

#### alert

| 参数 | 说明 | 类型 | 默认值 | 备选值 |
| --- | ---- | --- | --- | --- |
| content     | 弹窗中的内容                              | node   |       |                                               |
| type        | 弹窗的类型, 设置会在title左边显示一个小图标, 不传不会显示图标 | string |    -    | `'info'`, `'success'`, `'error'`, `'warning'` |
| title       | 弹窗的标题                               | node   | `''`     |                                               |
| onConfirm   | 确定操作回调函数                            | func   | `noop`   |                                               |
| confirmText | 确定按钮文案                              | string | `'我知道了'`   |                                               |
| confirmType | 确定按钮的类型  | string | `'primary'` | `'default'`、`'primary'`、`'danger'`、`'success'` |
| closeBtn     | 是否显示右上角关闭按钮                   | bool   | `false`   |
| maskClosable | 点击遮罩是否可以关闭                    | bool   | `false`   |
| parentComponent | 父级组件实例，i18n 需要通过这个传递 context | ReactInstance | | |
| className   | 额外的className                        | string | `''`     |                                               |
| prefix      | 默认className的前缀                      | string | `'zent'`|     |

#### confirm

| 参数          | 说明                                      | 类型     | 默认值      | 备选值                                           |
| ----------- | --------------------------------------- | ------ | -------- | --------------------------------------------- |
| content     | 弹窗中的内容                              | node   |       |                                               |
| type        | 弹窗的类型, 设置会在title左边显示一个小图标, 不传不会显示图标 | string |   -   | `'info'`, `'success'`, `'error'`, `'warning'` |
| title       | 弹窗的标题                               | node   | `''`     |                                               |
| onCancel    | 取消操作回调函数                            | func   | `noop`   |                                               |
| onConfirm   | 确定操作回调函数                            | func   | `noop`   |                                               |
| cancelText  | 取消按钮文案                              | string | `'取消'`   |                                               |
| confirmText | 确定按钮文案                              | string | `'确定'`   |                                               |
| confirmType | 确定按钮的类型  | string | `'primary'` | `'default'`、`'primary'`、`'danger'`、`'success'` |
| closeBtn     | 是否显示右上角关闭按钮                   | bool   | `false`   |
| maskClosable | 点击遮罩是否可以关闭                    | bool   | `false`   |
| className   | 额外的className                        | string | `''`     |                                               |
| prefix      | 默认className的前缀                      | string | `'zent'` |                                               |


- `Sweetalert.alert` 和 `Sweetalert.confirm` 的返回值是可以用来手动关闭对话框的函数。
- 如果 `onConfirm` 的返回值是 `Promise`, 对应的按钮会在 `Promise` pending 时保持在 loading 状态；如果 `Promise` reject，对话框不会关闭，如果 `Promise` resolve 对话框关闭。
- 如果 `onConfirm` 没有参数并且返回值是 `false` 对话框不会关闭。
- 如果 `onConfirm` 有一个参数的话，需要手动调用 `close` 这个参数来关闭对话框。
